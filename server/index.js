const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
const { z } = require('zod');
let sharp;
try {
    sharp = require('sharp');
} catch (err) {
    console.error('Sharp failed to load on this architecture:', err.message);
}
const path = require('path');
const { v4: uuidv4 } = require('uuid');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// Passwords — MUST be set via environment variables (.env file or Vercel settings)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const PROFILE_PASSWORD = process.env.PROFILE_PASSWORD;
const ADMIN_SECRET = process.env.ADMIN_SECRET || crypto.randomBytes(32).toString('hex');

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY;
const supabaseKey = serviceKey || anonKey;
const supabaseBucket = process.env.SUPABASE_BUCKET || 'member-photos';

let supabase = null;
if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your_supabase_') && !supabaseKey.includes('your_supabase_')) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey, {
            auth: { autoRefreshToken: false, persistSession: false }
        });
        const keyType = serviceKey ? 'SERVICE_ROLE (Safe)' : 'ANON (Will fail deletes)';
        console.log(`Supabase initialized with ${keyType} key.`);
    } catch (err) {
        console.error('Failed to initialize Supabase client:', err.message);
    }
} else {
    console.error('CRITICAL ERROR: Supabase configuration missing!');
}

// Multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Simple token generation & verification
function generateToken(role = 'admin') {
    const payload = {
        role,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(data).digest('hex');
    return `${data}.${signature}`;
}

function verifyToken(token) {
    try {
        const [data, signature] = token.split('.');
        const expectedSig = crypto.createHmac('sha256', ADMIN_SECRET).update(data).digest('hex');
        if (signature !== expectedSig) return null;
        const payload = JSON.parse(Buffer.from(data, 'base64').toString());
        if (payload.exp < Date.now()) return null;
        return payload;
    } catch {
        return null;
    }
}

// Helper to delete photo from storage
async function deletePhotoFromUrl(url) {
    if (!url || !supabase) return;
    try {
        // Extract filename from the Supabase public URL
        // Format: .../storage/v1/object/public/[bucket]/[filename]
        const pathParts = url.split('/');
        const fileName = pathParts[pathParts.length - 1];
        if (fileName) {
            await supabase.storage.from(supabaseBucket).remove([fileName]);
        }
    } catch (err) {
        console.error('Failed to delete storage file:', err.message);
    }
}

// Helper to compress image
async function compressImage(buffer) {
    if (!buffer) return null;
    try {
        return await sharp(buffer)
            .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();
    } catch (err) {
        console.error('Sharp compression error:', err.message);
        return buffer; // Fallback to original
    }
}

// Auth middleware
function requireAdmin(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = auth.slice(7);
    const payload = verifyToken(token);
    if (!payload || payload.role !== 'admin') {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.admin = payload;
    next();
}

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://ivc-vvce.vercel.app', 'https://www.ivc-vvce.ac.in', 'https://ivc-vvce.ac.in']
        : true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global Rate Limiting
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', globalLimiter);
app.use(express.json({ limit: '10kb' }));

// ═══════════════════════════════════════
// Admin Authentication
// ═══════════════════════════════════════
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Increased from 10 to 100 to prevent frequent warnings
    message: { error: 'Too many login attempts, please try again later.' }
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
    const { password } = req.body;
    if (!ADMIN_PASSWORD) {
        return res.status(500).json({ error: 'Admin password not configured on server' });
    }
    if (password === ADMIN_PASSWORD) {
        const token = generateToken('admin');
        res.json({ token, message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.get('/api/admin/verify', requireAdmin, (req, res) => {
    res.json({ valid: true, message: 'Token is valid' });
});

// ═══════════════════════════════════════
// Profile Access — Login with profile key
// ═══════════════════════════════════════
app.post('/api/profile/login', loginLimiter, (req, res) => {
    const { password } = req.body;
    if (!PROFILE_PASSWORD) {
        return res.status(500).json({ error: 'Profile access key not configured on server' });
    }
    if (password === PROFILE_PASSWORD) {
        const token = generateToken('member');
        res.json({ token, message: 'Access granted' });
    } else {
        res.status(401).json({ error: 'Invalid access key' });
    }
});

app.get('/api/profile/verify', (req, res) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = auth.slice(7);
    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'member' && payload.role !== 'admin')) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.json({ valid: true, message: 'Token is valid' });
});

// ═══════════════════════════════════════
// Public Join Applications (No Token Required)
// ═══════════════════════════════════════
const joinLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 attempts per IP per hour
    message: { error: 'Too many applications from this IP. Please try again later.' }
});

const publicJoinSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    department: z.string().min(2).max(100),
    year: z.string().min(1).max(50),
});

app.post('/api/public/join', joinLimiter, async (req, res) => {
    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    if (!sheetUrl) return res.status(503).json({ error: 'Google Sheets not configured on server.' });

    try {
        const validatedData = publicJoinSchema.parse(req.body);
        
        // Forward data to Google Apps Script
        const response = await fetch(sheetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedData)
        });

        if (response.ok) {
            res.status(201).json({ message: 'Application sent to Google Sheets!' });
        } else {
            throw new Error('Failed to reach Google Sheets');
        }
    } catch (error) {
        console.error('Sheet Error:', error);
        res.status(500).json({ error: 'Failed to record application.' });
    }
});

// ═══════════════════════════════════════
// Member Profile Submissions with Img Upload
// ═══════════════════════════════════════

const memberRequestSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    linkedin: z.string().optional().or(z.literal('')),
    github: z.string().optional().or(z.literal('')),
    role: z.string().min(2).max(50).default('Member'),
    department: z.string().optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
    bio: z.string().optional().or(z.literal('')),
});

app.post('/api/member-request', upload.single('photo'), async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Database not configured. Please check server logs and .env file.' });
    }
    try {
        // 1. Verify Member Token (Sent via Auth Header)
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Profile access key required' });
        }
        const tokenToken = auth.slice(7);
        const payload = verifyToken(tokenToken);
        if (!payload || (payload.role !== 'member' && payload.role !== 'admin')) {
            return res.status(401).json({ error: 'Invalid access key session' });
        }

        // 2. Validate Text Data
        const validatedData = memberRequestSchema.parse(req.body);
        let photoUrl = '';

        // 3. Upload Photo to Supabase if file exists
        if (req.file) {
            const fileExt = 'webp'; // Force webp after compression
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            // Compress before upload
            const compressedBuffer = await compressImage(req.file.buffer);

            const { data, error: uploadError } = await supabase.storage
                .from(supabaseBucket)
                .upload(filePath, compressedBuffer, {
                    contentType: 'image/webp',
                    upsert: false
                });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                return res.status(500).json({ error: 'Failed to upload photo to storage.' });
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(supabaseBucket)
                .getPublicUrl(filePath);

            photoUrl = publicUrl;
        }

        // 4. Save to Supabase DB
        const { error: dbError } = await supabase
            .from('member_requests')
            .insert([{
                ...validatedData,
                photo_url: photoUrl,
                status: 'pending',
                submitted_at: new Date().toISOString()
            }]);

        if (dbError) {
            console.error('DB error:', dbError);
            return res.status(500).json({ error: 'Failed to save request to database.' });
        }

        res.status(201).json({ message: 'Profile request submitted successfully!' });

    } catch (error) {
        console.error('Submission error:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation failed', details: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ═══════════════════════════════════════
// Admin Management (Public Join Form)
// ═══════════════════════════════════════
app.get('/api/admin/applications', requireAdmin, async (req, res) => {
    const sheetUrl = process.env.GOOGLE_SHEET_URL;
    if (!sheetUrl) return res.status(503).json({ error: 'Google Sheets URL not configured.' });
    
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();
        // Return as if they were DB records
        res.json(data.map((r, idx) => ({ 
            id: idx, 
            name: r.name, 
            email: r.email, 
            department: r.department, 
            year: r.year, 
            status: r.status || 'unread',
            applied_at: r.date || new Date().toISOString()
        })));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from Google Sheets' });
    }
});

// ═══════════════════════════════════════
// Admin Interface
// ═══════════════════════════════════════

app.get('/api/admin/requests', requireAdmin, async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Database not configured.' });
    }
    const { data, error } = await supabase
        .from('member_requests')
        .select('*')
        .order('submitted_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    // Map DB fields to current frontend CamelCase
    const members = data.filter(r => r.status === 'approved').map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        role: r.role,
        department: r.department,
        year: r.year,
        bio: r.bio,
        linkedin: r.linkedin,
        github: r.github,
        photoUrl: r.photo_url || '',
        status: r.status,
        submittedAt: r.submitted_at
    }));

    res.json({ requests: members });
});

app.get('/api/approved-members', async (req, res) => {
    if (!supabase) return res.json({ members: [] });
    const { data, error } = await supabase.from('member_requests').select('*').eq('status', 'approved');
    if (error) return res.status(500).json({ error: error.message });
    const members = data.map(r => ({
        ...r,
        photoUrl: r.photo_url || ''
    }));
    res.json({ members });
});

app.get('/api/mentors', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('mentors').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data.map(m => ({
        ...m,
        photoUrl: m.photo_url || ''
    })));
});

app.patch('/api/admin/requests/:id/:action', requireAdmin, async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Database not configured.' });
    }
    const { id, action } = req.params;
    const status = action === 'approve' ? 'approved' : 'rejected';

    const { data, error } = await supabase
        .from('member_requests')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: `Request ${status}`, request: data[0] });
});

app.delete('/api/admin/requests/:id', requireAdmin, async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Database not configured.' });
    }
    const { id } = req.params;

    if (!serviceKey) {
        return res.status(500).json({ error: 'CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing from your environment variables. Deletion is blocked for security.' });
    }

    try {
        const cleanId = id.toString().trim();
        console.log(`Attempting deletion for Request ID: [${cleanId}]`);

        // 1. Get the request to find the photo URL
        const { data: request, error: fetchError } = await supabase
            .from('member_requests')
            .select('id, photo_url')
            .eq('id', cleanId)
            .maybeSingle();

        if (fetchError) {
            console.error('Fetch error:', fetchError);
            return res.status(500).json({ error: `Fetch failed: ${fetchError.message}` });
        }

        if (!request) {
            return res.status(404).json({ error: `Request ID ${cleanId} not found in database. Please refresh the page.` });
        }

        if (request?.photo_url) {
            await deletePhotoFromUrl(request.photo_url);
        }

        // 2. Delete the DB entry using the ID we JUST confirmed exists
        const { data: deletedData, error: deleteError } = await supabase
            .from('member_requests')
            .delete()
            .eq('id', request.id) // Using the ID directly from the fetched object
            .select();

        if (deleteError) {
            console.error('Delete error:', deleteError);
            const hint = !serviceKey ? " (HINT: SUPABASE_SERVICE_ROLE_KEY missing)" : "";
            return res.status(500).json({ error: `Delete failed: ${deleteError.message}${hint}` });
        }
        
        if (!deletedData || deletedData.length === 0) {
            return res.status(404).json({ error: `Database reports no record with ID ${cleanId} was deleted, even though it was found a millisecond ago.` });
        }

        res.json({ message: 'Request and associated photo deleted' });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: `Server exception: ${err.message}` });
    }
});

// Fetch approved members for Team page
app.get('/api/approved-members', async (req, res) => {
    if (!supabase) {
        return res.json({ members: [] });
    }
    const { data, error } = await supabase
        .from('member_requests')
        .select('*')
        .eq('status', 'approved');

    if (error) return res.status(500).json({ error: error.message });

    const members = data.map(r => ({
        id: r.id,
        name: r.name,
        role: r.role,
        department: r.department,
        year: r.year,
        bio: r.bio,
        linkedin: r.linkedin,
        github: r.github,
        photoUrl: r.photo_url || ''
    }));

    res.json({ members });
});

// ═══════════════════════════════════════
// Mentor Management
// ═══════════════════════════════════════

const mentorSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    linkedin: z.string().optional().or(z.literal('')),
    quote: z.string().optional().or(z.literal('')),
    otherInfo: z.string().optional().or(z.literal('')),
});

app.get('/api/admin/mentors', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { data, error } = await supabase.from('mentors').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/admin/mentors', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = mentorSchema.parse(req.body);
        let photoUrl = '';

        if (req.file) {
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `mentor-${Date.now()}.webp`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            photoUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('mentors').insert([{
            name: validatedData.name,
            email: validatedData.email,
            linkedin: validatedData.linkedin,
            quote: validatedData.quote,
            other_info: validatedData.otherInfo,
            photo_url: photoUrl
        }]);

        if (dbError) throw dbError;
        res.status(201).json({ message: 'Mentor added successfully' });
    } catch (error) {
        console.error('Mentor add error:', error);
        res.status(error instanceof z.ZodError ? 400 : 500).json({ error: error.message || 'Server error' });
    }
});

// Update Mentor
app.put('/api/admin/mentors/:id', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    try {
        const validatedData = mentorSchema.parse(req.body);
        
        // Get existing mentor to check for old photo
        const { data: existing } = await supabase.from('mentors').select('photo_url').eq('id', id).single();
        let photoUrl = existing?.photo_url || '';

        if (req.file) {
            // Delete old photo if it exists
            if (existing?.photo_url) await deletePhotoFromUrl(existing.photo_url);
            
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `mentor-${Date.now()}.webp`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            photoUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('mentors').update({
            name: validatedData.name,
            email: validatedData.email,
            linkedin: validatedData.linkedin,
            quote: validatedData.quote,
            other_info: validatedData.otherInfo,
            photo_url: photoUrl
        }).eq('id', id);

        if (dbError) throw dbError;
        res.json({ message: 'Mentor updated successfully' });
    } catch (error) {
        res.status(error instanceof z.ZodError ? 400 : 500).json({ error: error.message || 'Server error' });
    }
});

// Update Member Request (Admin editing approved profiles or pending ones)
app.put('/api/admin/requests/:id', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    try {
        const validatedData = memberRequestSchema.parse(req.body);
        const { data: existing } = await supabase.from('member_requests').select('photo_url').eq('id', id).single();
        let photoUrl = existing?.photo_url || '';

        if (req.file) {
            if (existing?.photo_url) await deletePhotoFromUrl(existing.photo_url);
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `profile-${Date.now()}.webp`;
            await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            photoUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('member_requests').update({
            ...validatedData,
            photo_url: photoUrl
        }).eq('id', id);

        if (dbError) throw dbError;
        res.json({ message: 'Member updated successfully' });
    } catch (error) {
        res.status(error instanceof z.ZodError ? 400 : 500).json({ error: error.message || 'Server error' });
    }
});

app.delete('/api/admin/mentors/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;

    if (!serviceKey) {
        return res.status(500).json({ error: 'CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing. Add it to Vercel/local .env to enable deletions.' });
    }

    try {
        const cleanId = id.toString().trim();
        console.log(`Attempting deletion for Mentor ID: [${cleanId}]`);

        // 1. Get the mentor to find the photo URL
        const { data: mentor, error: fetchError } = await supabase
            .from('mentors')
            .select('id, photo_url')
            .eq('id', cleanId)
            .maybeSingle();

        if (fetchError) {
            console.error('Fetch error:', fetchError);
            return res.status(500).json({ error: `Fetch failed: ${fetchError.message}` });
        }

        if (!mentor) {
            return res.status(404).json({ error: `Mentor ID ${cleanId} not found in database.` });
        }

        if (mentor?.photo_url) {
            await deletePhotoFromUrl(mentor.photo_url);
        }

        // 2. Delete the DB entry (converting string ID to Number)
        const { data: deletedData, error: deleteError } = await supabase
            .from('mentors')
            .delete()
            .eq('id', Number(id))
            .select();

        if (deleteError) {
            console.error('Delete error:', deleteError);
            const hint = !serviceKey ? " (HINT: SUPABASE_SERVICE_ROLE_KEY missing)" : "";
            return res.status(500).json({ error: `Delete failed: ${deleteError.message}${hint}` });
        }

        if (!deletedData || deletedData.length === 0) {
            return res.status(404).json({ error: `Mentor ID ${id} not found or already deleted.` });
        }

        res.json({ message: 'Mentor and associated photo deleted' });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: `Server exception: ${err.message}` });
    }
});

app.get('/api/mentors', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('mentors').select('*').order('name', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });

    // Map to the structure Team.jsx expects
    const mentors = data.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        linkedin: m.linkedin,
        quote: m.quote,
        bio: m.quote, // Team.jsx InfoCard uses .bio or .description
        other_info: m.other_info,
        role: 'MENTOR',
        photoUrl: m.photo_url
    }));

    res.json(mentors);
});

// ═══════════════════════════════════════
// Domains Management
// ═══════════════════════════════════════
const domainSchema = z.object({
    title: z.string().min(2),
    desc: z.string().min(5),
    icon: z.string().min(1),
});

app.get('/api/domains', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('domains').select('*').order('created_at', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/admin/domains', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = domainSchema.parse(req.body);
        const { error: dbError } = await supabase.from('domains').insert([validatedData]);
        if (dbError) throw dbError;
        res.status(201).json({ message: 'Domain added' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/admin/domains/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = domainSchema.parse(req.body);
        const { error: dbError } = await supabase.from('domains').update(validatedData).eq('id', req.params.id);
        if (dbError) throw dbError;
        res.json({ message: 'Domain updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/admin/domains/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { error } = await supabase.from('domains').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Domain deleted' });
});

// ═══════════════════════════════════════
// Achievements Management
// ═══════════════════════════════════════
const achievementSchema = z.object({
    value: z.string().min(1),
    label: z.string().min(1),
    icon: z.string().min(1),
    suffix: z.string().optional().or(z.literal('')),
    highlight: z.boolean().default(false),
});

app.get('/api/achievements', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('achievements').select('*').order('created_at', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/admin/achievements', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = achievementSchema.parse(req.body);
        const { error: dbError } = await supabase.from('achievements').insert([validatedData]);
        if (dbError) throw dbError;
        res.status(201).json({ message: 'Achievement added' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/admin/achievements/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = achievementSchema.parse(req.body);
        const { error: dbError } = await supabase.from('achievements').update(validatedData).eq('id', req.params.id);
        if (dbError) throw dbError;
        res.json({ message: 'Achievement updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/admin/achievements/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { error } = await supabase.from('achievements').delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Achievement deleted' });
});

// ═══════════════════════════════════════
// Events Management
// ═══════════════════════════════════════
const eventSchema = z.object({
    title: z.string().min(2),
    fullTitle: z.string().min(2),
    date: z.string().min(1),
    time: z.string().min(1),
    location: z.string().min(1),
    description: z.string().min(5),
    type: z.string().min(1),
});

app.get('/api/events', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/admin/events', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = eventSchema.parse(req.body);
        let imageUrl = '';

        if (req.file) {
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `event-${Date.now()}.webp`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            imageUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('events').insert([{
            ...validatedData,
            image_url: imageUrl
        }]);

        if (dbError) throw dbError;
        res.status(201).json({ message: 'Event added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/admin/events/:id', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    try {
        const validatedData = eventSchema.parse(req.body);
        const { data: existing } = await supabase.from('events').select('image_url').eq('id', id).single();
        let imageUrl = existing?.image_url || '';

        if (req.file) {
            if (existing?.image_url) await deletePhotoFromUrl(existing.image_url);
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `event-${Date.now()}.webp`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            imageUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('events').update({
            ...validatedData,
            image_url: imageUrl
        }).eq('id', id);

        if (dbError) throw dbError;
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/admin/events/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    try {
        const { data: existing } = await supabase.from('events').select('image_url').eq('id', id).single();
        if (existing?.image_url) await deletePhotoFromUrl(existing.image_url);
        
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ═══════════════════════════════════════
// Projects Management
// ═══════════════════════════════════════
const projectSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(5),
    domain: z.string().min(2),
});

app.get('/api/projects', async (req, res) => {
    if (!supabase) return res.json([]);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/api/admin/projects', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/api/admin/projects', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    try {
        const validatedData = projectSchema.parse(req.body);
        let imageUrl = '';

        if (req.file) {
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `project-${Date.now()}.webp`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            imageUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('projects').insert([{
            ...validatedData,
            image_url: imageUrl
        }]);

        if (dbError) throw dbError;
        res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/admin/projects/:id', requireAdmin, upload.single('photo'), async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    try {
        const validatedData = projectSchema.parse(req.body);
        const { data: existing } = await supabase.from('projects').select('image_url').eq('id', id).single();
        let imageUrl = existing?.image_url || '';

        if (req.file) {
            if (existing?.image_url) await deletePhotoFromUrl(existing.image_url);
            const compressedBuffer = await compressImage(req.file.buffer);
            const fileName = `project-${Date.now()}.webp`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, compressedBuffer, { contentType: 'image/webp' });
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName);
            imageUrl = publicUrl;
        }

        const { error: dbError } = await supabase.from('projects').update({
            ...validatedData,
            image_url: imageUrl
        }).eq('id', id);

        if (dbError) throw dbError;
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/admin/projects/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    try {
        const { data: existing } = await supabase.from('projects').select('image_url').eq('id', id).single();
        if (existing?.image_url) await deletePhotoFromUrl(existing.image_url);
        
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Final Error Handler
app.use((err, req, res, next) => {
    console.error('[FINAL ERROR]', err);
    res.status(500).json({ error: 'An unexpected server error occurred.' });
});


module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
