const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
const { z } = require('zod');

const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Passwords — MUST be set via environment variables (.env file or Vercel settings)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const PROFILE_PASSWORD = process.env.PROFILE_PASSWORD;
const ADMIN_SECRET = process.env.ADMIN_SECRET || crypto.randomBytes(32).toString('hex');

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET || 'member-photos';

let supabase = null;
if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your_supabase_') && !supabaseKey.includes('your_supabase_')) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (err) {
        console.error('Failed to initialize Supabase client:', err.message);
    }
} else {
    console.error('\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: Supabase URL or Key missing or set to placeholder in .env!');
    console.error('\x1b[33m%s\x1b[0m', 'Please replace the placeholders in your .env file with your actual Supabase credentials.');
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
        ? ['https://ivc-vvce.vercel.app']
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
    max: 10,
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
// Member Profile Submissions with Img Upload
// ═══════════════════════════════════════

const memberRequestSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    linkedin: z.string().optional().or(z.literal('')),
    github: z.string().optional().or(z.literal('')),
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
            const fileExt = req.file.originalname.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error: uploadError } = await supabase.storage
                .from(supabaseBucket)
                .upload(filePath, req.file.buffer, {
                    contentType: req.file.mimetype,
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

    // Map DB fields to current frontend CamelCase if needed
    const requests = data.map(r => ({
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

    res.json({ requests });
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

    // 1. Get request to find photo filename to delete from storage optionally
    // (Skipping photo deletion for now but it's a good practice)

    const { error } = await supabase
        .from('member_requests')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Request deleted' });
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
            const fileExt = req.file.originalname.split('.').pop();
            const fileName = `mentor-${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from(supabaseBucket).upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
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

app.delete('/api/admin/mentors/:id', requireAdmin, async (req, res) => {
    if (!supabase) return res.status(503).json({ error: 'Database not configured.' });
    const { id } = req.params;
    const { error } = await supabase.from('mentors').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Mentor deleted' });
});

app.get('/api/mentors', async (req, res) => {
    if (!supabase) return res.json({ mentors: [] });
    const { data, error } = await supabase.from('mentors').select('*').order('name', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    const mentors = data.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        linkedin: m.linkedin,
        quote: m.quote,
        otherInfo: m.other_info,
        photoUrl: m.photo_url
    }));
    res.json({ mentors });
});


module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
