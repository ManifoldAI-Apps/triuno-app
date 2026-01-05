# Plano de Implementação: Migração para Supabase Auth

Este plano detalha a substituição do sistema de login inseguro atual (baseado em arquivos/texto plano) pelo **Supabase Auth** (nativo, seguro e criptografado), além da preparação para **RLS (Row Level Security)**.

## ⚠️ Atenção: Impacto nos Dados Existentes
A mudança na forma como os IDs de usuário são gerados (de `u-123456` para `UUID` do Supabase) **tornará incompatíveis os usuários antigos**.
- **Ação Necessária:** Será necessário realizar um "reset" lógico. Os usuários precisarão se cadastrar novamente.
- **Benefício:** Segurança de nível profissional e fim do vazamento de senhas.

## 1. Mudanças no Banco de Dados (SQL)
Como não tenho acesso direto ao terminal SQL do seu projeto, você precisará rodar os comandos abaixo no **SQL Editor** do painel do Supabase:

```sql
-- 1. Habilitar RLS na tabela de usuários
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 2. Criar política: Todos podem ler perfis básicos (necessário para buscar nome/avatar de conexões)
-- Idealmente restringiríamos campos, mas para manter compatibilidade agora, permitiremos leitura.
CREATE POLICY "Public profiles are viewable by everyone" 
ON users FOR SELECT 
USING (true);

-- 3. Criar política: Apenas o dono pode atualizar seu perfil
CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE 
USING (auth.uid() = id);

-- 4. Criar política: Apenas o dono pode inserir seu perfil (no registro)
CREATE POLICY "Users can insert own profile" 
ON users FOR INSERT 
WITH CHECK (auth.uid() = id);
```

## 2. Mudanças no Front-end (Código)

### Arquivo: `types.ts`
- Remover o campo `password` da interface `User`.
- A interface `User` passará a representar apenas o **Perfil Público**.

### Arquivo: `App.tsx`
- Remover lógica `handleLogin` e `handleRegister` manuais.
- Implementar `useEffect` ouvindo `supabase.auth.onAuthStateChange`.
- Ao detectar login, buscar os dados do usuário na tabela `users` usando o ID fornecido pelo Supabase Auth.

### Arquivo: `Register.tsx`
- Substituir a verificação de e-mail local por `supabase.auth.signUp()`.
- Após sucesso no Auth, inserir dados complementares (Nome, Avatar, XP) na tabela `users` usando o ID retornado.

### Arquivo: `Login.tsx`
- Substituir comparação de array por `supabase.auth.signInWithPassword()`.
- Tratar erros nativos (senha errada, e-mail não confirmado).

### Arquivo: `Dashboard.tsx` & Outros
- Nenhuma mudança visual. Apenas a origem dos dados `user` mudará.

## 3. Passo a Passo da Execução

1.  **Atualizar Types:** Remover dependência de senha em texto.
2.  **Refatorar Registro:** Implementar criação de conta real.
3.  **Refatorar Login:** Implementar autenticação real.
4.  **Refatorar Sessão (App.tsx):** Conectar tudo e garantir que o estado global `user` seja preenchido corretamente após o login.
5.  **Testes:** Verificar se novas contas conseguem logar e persistir dados.

## 🛑 Confirmação
Você precisará rodar o SQL acima no painel do Supabase, ou a aplicação poderá dar erro de permissão (403) ao tentar salvar os dados do novo usuário seguro.
**Podemos prosseguir com as alterações no código?**
