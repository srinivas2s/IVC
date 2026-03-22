-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- This fixes the RLS (Row Level Security) policies to be actually SECURE.

-- ═══════ MENTORS TABLE ═══════
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- 1. Allow anyone to VIEW mentors (needed for the website)
DROP POLICY IF EXISTS "Allow public read on mentors" ON mentors;
CREATE POLICY "Allow public read on mentors"
  ON mentors FOR SELECT
  USING (true);

-- 2. Prevent ANY public modifications. 
-- Mutations (Insert/Update/Delete) will be handled by the server 
-- using the SERVICE_ROLE_KEY which bypasses RLS.
DROP POLICY IF EXISTS "Allow insert on mentors" ON mentors;
DROP POLICY IF EXISTS "Allow update on mentors" ON mentors;
DROP POLICY IF EXISTS "Allow delete on mentors" ON mentors;

-- ═══════ MEMBER_REQUESTS TABLE ═══════
ALTER TABLE member_requests ENABLE ROW LEVEL SECURITY;

-- 1. Allow anyone to VIEW ONLY APPROVED members (for the team page)
DROP POLICY IF EXISTS "Allow public read on member_requests" ON member_requests;
CREATE POLICY "Allow public read on member_requests"
  ON member_requests FOR SELECT
  USING (status = 'approved');

-- 2. Prevent public from seeing pending or rejected requests directly
-- 3. Prevent ANY public modifications.
DROP POLICY IF EXISTS "Allow insert on member_requests" ON member_requests;
DROP POLICY IF EXISTS "Allow update on member_requests" ON member_requests;
DROP POLICY IF EXISTS "Allow delete on member_requests" ON member_requests;

