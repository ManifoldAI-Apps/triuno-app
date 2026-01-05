
-- CLEAN SLATE SCHEMA SCRIPT
-- DROPS EVERYTHING AND RECREATES WITH PROPER SECURITY STANDARDS.
-- CAUTION: THIS WILL DELETE ALL DATA IN THESE TABLES.

-- 1. Drop existing tables to clear conflicts
DROP TABLE IF EXISTS public.post_likes CASCADE;
DROP TABLE IF EXISTS public.attended_events CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.gratitude_posts CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;

-- 2. Tasks Table
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, -- Linked to Auth User directly
  title TEXT NOT NULL,
  category TEXT CHECK (category IN ('Corpo', 'Alma', 'Espírito')),
  xp INTEGER DEFAULT 10,
  completed BOOLEAN DEFAULT FALSE,
  icon TEXT DEFAULT 'spa',
  scheduled_date DATE DEFAULT CURRENT_DATE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own tasks" ON public.tasks
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Gratitude Posts Table
CREATE TABLE public.gratitude_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Linked to Auth User
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  comments JSONB DEFAULT '[]'::jsonb,
  icon TEXT DEFAULT 'auto_awesome',
  image_url TEXT,
  type TEXT CHECK (type IN ('LUZ', 'AMÉM')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.gratitude_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "everyone can view gratitude posts" ON public.gratitude_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can create gratitude posts" ON public.gratitude_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id OR author_id IS NULL);

CREATE POLICY "Users can update gratitude posts (likes/comments)" ON public.gratitude_posts
  FOR UPDATE USING (true);

-- 4. Post Likes Table
CREATE TABLE public.post_likes (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.gratitude_posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (user_id, post_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own likes" ON public.post_likes
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Messages Table
-- Keeping IDs as TEXT to support legacy/system IDs like 'u-admin' without breaking frontend.
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id TEXT NOT NULL, 
  receiver_id TEXT NOT NULL,
  text TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages" ON public.messages
  USING (auth.uid()::text = sender_id OR auth.uid()::text = receiver_id);

CREATE POLICY "Users can insert messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid()::text = sender_id);

-- 6. Notifications Table
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  icon TEXT,
  type TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  from_user_id UUID -- Optional link to sender
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  USING (auth.uid() = user_id);

-- 7. Events Table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  link TEXT,
  image_url TEXT,
  type TEXT,
  xp_reward INTEGER
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view events" ON public.events
  FOR SELECT USING (true);

-- 8. Attended Events Table
CREATE TABLE public.attended_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.attended_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert attended events" ON public.attended_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their attended events" ON public.attended_events
  FOR SELECT USING (auth.uid() = user_id);

