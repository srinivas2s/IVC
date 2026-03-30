-- 1. ACHIEVEMENTS POLICIES
-- Allow anyone to see achievements
CREATE POLICY "Enable read access for all users" ON public.achievements
    FOR SELECT USING (true);

-- 2. DOMAINS POLICIES
-- Allow anyone to see domains
CREATE POLICY "Enable read access for all users" ON public.domains
    FOR SELECT USING (true);

-- 3. EVENTS POLICIES
-- Allow anyone to see events
CREATE POLICY "Enable read access for all users" ON public.events
    FOR SELECT USING (true);
