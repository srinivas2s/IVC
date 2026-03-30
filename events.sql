CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    fullTitle TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
