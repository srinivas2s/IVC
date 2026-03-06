-- 1. Create the member_requests table
CREATE TABLE IF NOT EXISTS member_requests (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    year TEXT,
    bio TEXT,
    linkedin TEXT,
    github TEXT,
    photo_url TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the mentors table
CREATE TABLE IF NOT EXISTS mentors (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    linkedin TEXT,
    quote TEXT, -- motivation quote
    other_info TEXT, -- description/department
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. (Optional) Create the storage bucket for photos (if not already created via UI)
-- Note: You should create the bucket named "member-photos" in the Supabase Dashboard 
-- and set it to PUBLIC so images can be viewed on the website.

-- 3. (Optional) Enable RLS if you want to be extra secure, 
-- but for simplicity you can leave it disabled and use the service role or anon key.
-- Since the server handles the requests, it's fairly safe.
