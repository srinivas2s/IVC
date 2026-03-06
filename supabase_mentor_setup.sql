-- Mentors Table
CREATE TABLE IF NOT EXISTS mentors (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    linkedin TEXT,
    quote TEXT,         -- Motivation quote displayed in details
    other_info TEXT,    -- Department or position (e.g., "Dept. of CSE")
    photo_url TEXT,     -- URL from Supabase Storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
 