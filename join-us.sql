-- Create table for public join applications
CREATE TABLE IF NOT EXISTS public_applications (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL,
    status TEXT DEFAULT 'unread', 
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Security
ALTER TABLE public_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to apply
DROP POLICY IF EXISTS "Allow public to submit applications" ON public_applications;
CREATE POLICY "Allow public to submit applications"
  ON public_applications FOR INSERT
  WITH CHECK (true);
