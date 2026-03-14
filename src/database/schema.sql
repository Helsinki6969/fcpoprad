-- --------------------------------------------------------------------------------
-- 1. TABUĽKA ČLÁNKY (Articles)
-- --------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    image TEXT,                               -- URL k náhľadovému obrázku (Bucket uploads)
    category TEXT NOT NULL,                   -- Aktuality, Tlačové správy, História
    author TEXT DEFAULT 'FC Poprad - Stráže',
    tags TEXT[] DEFAULT '{}',                 -- Tagy (pole textov)
    "readTime" INTEGER DEFAULT 5,             -- Odhadovaný čas čítania v minútach
    date DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------------------------------
-- 2. TABUĽKA VIDEÁ (Videos / Klubová TV)
-- --------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    youtubeid TEXT,                          -- ID videa z YouTube (pre vkladanie)
    youtubeurl TEXT NOT NULL,                 -- URL link na video (YouTube alebo Storage MP4)
    thumbnail TEXT,                          -- URL k náhľadovému obrázku
    category TEXT NOT NULL,                   -- Zápasy, Tréningy, Rozhovory
    tags TEXT[] DEFAULT '{}',                 -- Tagy pre filtrovanie
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------------------------------
-- 3. TABUĽKA KONTAKTNÉ SPRÁVY (Contact Messages)
-- --------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------------------------------
-- BEZPEČNOSŤ: ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------------------------------

-- Aktivácia RLS pre všetky tabuľky
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Čítanie údajov (Verejný prístup)
CREATE POLICY "Public can view articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view videos" ON public.videos FOR SELECT USING (true);

-- 2. Kontaktný formulár (Užívateľ môže len vkladať)
CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can view contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);

-- 3. Administrácia (Len prihlásení používatelia)
-- Články
CREATE POLICY "Auth delete articles" ON public.articles FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update articles" ON public.articles FOR UPDATE TO authenticated USING (true);

-- Videá
CREATE POLICY "Auth delete videos" ON public.videos FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert videos" ON public.videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update videos" ON public.videos FOR UPDATE TO authenticated USING (true);

-- --------------------------------------------------------------------------------
-- KONFIGURÁCIA ÚLOŽISKA (Storage)
-- --------------------------------------------------------------------------------
-- Súbory sa ukladajú v buckete 'uploads'.
-- Verejnosť: Len čítanie
-- Admin: Plný prístup (Insert, Update, Delete)