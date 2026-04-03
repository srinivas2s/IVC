
// ═══════════════════════════════════════
// Settings Management
// ═══════════════════════════════════════
let joinUsEnabled = true;

app.get('/api/settings/join-status', async (req, res) => {
    if (supabase) {
        try {
            const { data, error } = await supabase.from('app_settings').select('value').eq('key', 'join_us_enabled').maybeSingle();
            if (!error && data) joinUsEnabled = (data.value === 'true' || data.value === true);
        } catch (e) { console.error('Settings fetch error:', e.message); }
    }
    res.json({ enabled: joinUsEnabled });
});

app.post('/api/admin/settings/join-status', requireAdmin, async (req, res) => {
    const { enabled } = req.body;
    joinUsEnabled = !!enabled;
    if (supabase) {
        try {
            await supabase.from('app_settings').upsert({ key: 'join_us_enabled', value: joinUsEnabled.toString(), updated_at: new Date().toISOString() });
        } catch (e) { console.error('Settings save error:', e.message); }
    }
    res.json({ message: `Join Applications ${joinUsEnabled ? 'ENABLED' : 'DISABLED'}`, enabled: joinUsEnabled });
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
