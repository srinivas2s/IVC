-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- This fixes the RLS (Row Level Security) policies that are blocking inserts/updates/deletes

-- ═══════ MENTORS TABLE ═══════
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read mentors (public website needs this)
CREATE POLICY "Allow public read on mentors"
  ON mentors FOR SELECT
  USING (true);

-- Allow inserts (server handles auth)
CREATE POLICY "Allow insert on mentors"
  ON mentors FOR INSERT
  WITH CHECK (true);

-- Allow updates
CREATE POLICY "Allow update on mentors"
  ON mentors FOR UPDATE
  USING (true);

-- Allow deletes
CREATE POLICY "Allow delete on mentors"
  ON mentors FOR DELETE
  USING (true);

-- ═══════ MEMBER_REQUESTS TABLE ═══════
ALTER TABLE member_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (for approved members on team page)
CREATE POLICY "Allow public read on member_requests"
  ON member_requests FOR SELECT
  USING (true);

-- Allow inserts (profile form submissions)
CREATE POLICY "Allow insert on member_requests"
  ON member_requests FOR INSERT
  WITH CHECK (true);

-- Allow updates (admin approve/reject)
CREATE POLICY "Allow update on member_requests"
  ON member_requests FOR UPDATE
  USING (true);

-- Allow deletes (admin delete)
CREATE POLICY "Allow delete on member_requests"
  ON member_requests FOR DELETE
  USING (true);
