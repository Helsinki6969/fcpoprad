-- 1. TABUĽKA ČLÁNKY (Articles)
-- Slúži na ukladanie článkov.
CREATE TABLE IF NOT EXISTS public.articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    image TEXT,                               -- Cesta k obrázku (Bucket uploads)
    category TEXT NOT NULL,                   -- Aktuality, Tlačové správy, História
    author TEXT DEFAULT 'FC Poprad - Stráže',
    tags TEXT[] DEFAULT '{}',                 -- Tagy pre lepšiu kategorizáciu
    "readTime" INTEGER DEFAULT 5,             -- Odhadovaný čas čítania
    date DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABUĽKA VIDEÁ (Videos / Klubová TV)
-- Integruje YouTube videá a lokálne MP4 videá.
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    youtubeid TEXT,                          -- YouTube ID (ak ide o YT video)
    youtubeurl TEXT NOT NULL,                -- URL link na video (YT alebo Storage MP4)
    thumbnail TEXT,                          -- Náhľadový obrázok
    category TEXT NOT NULL,                  -- Zápasy, Tréningy, Rozhovory
    tags TEXT[] DEFAULT '{}',                -- Tagy pre videá
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABUĽKA KONTAKTNÉ SPRÁVY (Contact Messages)
-- Archív správ odoslaných cez kontaktný formulár na webe.
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABUĽKA HRÁČI (Players)
-- Obsahuje kompletnú súpisku a štatistiky hráčov.
CREATE TABLE IF NOT EXISTS public.players (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    jersey_number INTEGER,
    position TEXT NOT NULL,                  -- Brankár, Obranca, Stredný záložník, Útočník
    category TEXT NOT NULL,                  -- A tím, U19, U17, U15, U13
    date_of_birth DATE,
    age INTEGER,
    birth_year INTEGER,
    height INTEGER,
    weight INTEGER,
    nationality TEXT DEFAULT 'Slovensko',
    bio TEXT,
    matches_played INTEGER DEFAULT 0,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) - BEZPEČNOSŤ
-- ==========================================

-- Zapnutie RLS pre všetky tabuľky
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Verejnosť môže všetko čítať
CREATE POLICY "Public can view articles" ON public.articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public can view players" ON public.players FOR SELECT USING (is_active = true);

-- Len prihlásení administrátori môžu meniť dáta
-- VIDEÁ
CREATE POLICY "Auth delete videos" ON public.videos FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert videos" ON public.videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update videos" ON public.videos FOR UPDATE TO authenticated USING (true);

-- ČLÁNKY
CREATE POLICY "Auth delete articles" ON public.articles FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert articles" ON public.articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update articles" ON public.articles FOR UPDATE TO authenticated USING (true);

-- HRÁČI
CREATE POLICY "Auth delete players" ON public.players FOR DELETE TO authenticated USING (true);
CREATE POLICY "Auth insert players" ON public.players FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update players" ON public.players FOR UPDATE TO authenticated USING (true);

-- KONTAKTNÉ SPRÁVY
CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can view contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);


-- ==========================================
-- STORAGE SETTINGS (Úložisko súborov)
-- ==========================================

-- Vytvorenie bucketu 'images' pre fotky hráčov a článkov
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Politiky pre Storage (Verejný pohľad, chránený zápis)
CREATE POLICY "Public Images Access" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );
CREATE POLICY "Admin Upload Images" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'images' );
CREATE POLICY "Admin Delete Images" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'images' );

