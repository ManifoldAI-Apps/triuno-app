-- 1. Habilitar RLS na tabela de usuários para proteger os dados
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 2. Permitir que qualquer pessoa autenticada leia os perfis (necessário para ver nome/avatar de conexões e rankings)
CREATE POLICY "Public profiles are viewable by everyone" 
ON users FOR SELECT 
USING (true);

-- 3. Permitir que o usuário atualize APENAS o próprio perfil
-- 3. Permitir que o usuário atualize APENAS o próprio perfil
CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE 
USING (auth.uid()::text = id);

-- 4. Permitir que o usuário insira APENAS o próprio perfil (durante o cadastro)
CREATE POLICY "Users can insert own profile" 
ON users FOR INSERT 
WITH CHECK (auth.uid()::text = id);

-- NOTA: A coluna 'password' deixará de ser usada.
-- Se houver erro de tipo, cast auth.uid() para text resolve se sua coluna id for text.
