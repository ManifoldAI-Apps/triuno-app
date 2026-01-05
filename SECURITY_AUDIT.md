# Relatório de Auditoria de Segurança - Triuno App

Este relatório identifica vulnerabilidades críticas de segurança na arquitetura atual do aplicativo e propõe melhorias para garantir a integridade dos dados e a privacidade dos usuários.

## 🚨 Vulnerabilidades Críticas Identificadas

### 1. Exposição de Dados Sensíveis (Senhas em Texto Plano)
- **Diagnóstico:** O sistema atual armazena e compara senhas diretamente em texto plano (sem criptografia) no banco de dados (`users` table -> `password` column).
- **Risco:** Crítico. Se o banco de dados for comprometido, todas as senhas dos usuários serão vazadas instantaneamente.
- **Evidência:** Lógica de login em `App.tsx`: `registeredUsers.find(u => u.email === email && u.password === pass)`.

### 2. Vazamento de Dados de Usuários (Falta de RLS - Row Level Security)
- **Diagnóstico:** O aplicativo baixa a lista COMPLETA de usuários (`supabase.from('users').select('*')`) para o navegador de **todos** os visitantes da aplicação para realizar o login localmente.
- **Risco:** Crítico. Qualquer usuário com conhecimento básico de "Inspecionar Elemento" pode ver o nome, e-mail e SENHA de todos os outros usuários cadastrados no sistema.
- **Evidência:** `const { data: dbUsers } = await supabase.from('users').select('*');` em `App.tsx`.

### 3. Armazenamento Inseguro de Sessão (LocalStorage)
- **Diagnóstico:** O objeto completo do usuário (incluindo a senha) é salvo no `localStorage` do navegador (`triuno_user`).
- **Risco:** Alto. Scripts maliciosos (XSS) podem ler facilmente o `localStorage` e roubar a sessão e as credenciais do usuário.
- **Evidência:** `localStorage.setItem('triuno_user', JSON.stringify(user));`.

### 4. Validação de Regras de Negócio no Front-end (Client-Side Logic)
- **Diagnóstico:** Regras como "apenas Admins podem ver X" estão sendo feitas apenas com `if (user.role === 'Admin')` no React.
- **Risco:** Médio/Alto. Um usuário pode modificar manualmente seu `localStorage` ou o código JavaScript no navegador para se tornar 'Admin' e acessar telas restritas, se o banco de dados não bloquear as requisições na fonte.

---

## 🛡️ Plano de Melhorias Proposto (Sem Alterar Layout)

Para corrigir essas falhas sem impactar o design visual, recomenda-se uma refatoração profunda da camada de dados ("Invisible Refactor"):

### Solução 1: Migração para Supabase Auth (Recomendada)
Substituir a lógica de login manual ("Custom Auth") pelo sistema nativo de autenticação do Supabase.
1.  **Eliminar coluna `password`:** Remover a coluna de senha da tabela pública `users`.
2.  **Usar `supabase.auth.signUp()` e `signIn()`:** Delegar a gestão de senhas para o Supabase (que usa hashing seguro Bcrypt/Argon2).
3.  **Segurança de Sessão:** O Supabase gerencia tokens seguros (JWT) automaticamente, eliminando a necessidade de guardar dados sensíveis no `localStorage`.

### Solução 2: Implementar RLS (Row Level Security)
Configurar políticas de segurança diretamente no Banco de Dados (PostgreSQL) para que o Front-end só receba dados que tem permissão para ver.
1.  **Política Pública:** Usuários anônimos não podem ler dados da tabela `users`.
2.  **Política Authenticated:** O usuário só pode ler/editar o **próprio** perfil (`auth.uid() = id`).
3.  **Política Admin:** Apenas usuários com claim de Admin podem ver a lista completa de usuários.

### Solução 3: Proteção de Dados Sensíveis
1.  **Remover Senhas do LocalStorage:** Nunca salvar o objeto `user` contendo a senha no navegador.
2.  **Sanitização:** Se a lógica atual for mantida (não recomendado), alterar o `select('*')` para `select('id, name, email, role, ...')` excluindo explicitamente a coluna `password`, e realizar a validação de senha via RPC (Remote Procedure Call) no banco, nunca no front-end.

## Resumo
A aplicação visualmente está excelente, mas a segurança atual é de nível "protótipo". Para um lançamento real, é **obrigatório** refatorar a autenticação para usar **Supabase Auth** e ativar **Row Level Security (RLS)**.
