import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Linkedin, Github, CheckCircle, Send, ArrowLeft, Shield, Lock, LogIn, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════
   ACCESS KEY LOGIN SCREEN
   ═══════════════════════════════════════ */
const LoginScreen = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/profile/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                // Use sessionStorage instead of localStorage to logout on tab close
                sessionStorage.setItem('ivc_member_token', data.token);
                onLogin(data.token);
            } else {
                setError(data.error || 'Invalid access key');
            }
        } catch (err) {
            setError('Network error: Is the server running?');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative px-6">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-6"
                    >
                        <Lock className="text-cyan-400" size={32} />
                    </motion.div>
                    <h1 className="font-display text-3xl font-black tracking-wider uppercase mb-2">
                        MEMBER <span className="text-cyan-400 text-glow-cyan">ACCESS</span>
                    </h1>
                    <p className="font-display text-[9px] tracking-[0.3em] text-white/30 uppercase leading-relaxed">
                        Enter the club access key to <br />submit your profile info
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-display text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2 ml-1">
                            CLUB ACCESS KEY
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter access key"
                            className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 px-4 text-white text-sm font-medium placeholder-white/10 focus:outline-none focus:border-cyan-400/30 focus:bg-white/[0.03] transition-all duration-300"
                            required
                        />
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-center">
                            <p className="text-red-400 text-xs font-medium">{error}</p>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl font-display text-[11px] tracking-[0.4em] uppercase border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-500 flex items-center justify-center gap-3"
                    >
                        <LogIn size={14} />
                        {loading ? 'VERIFYING...' : 'ACCESS FORM'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════
   SIMPLIFIED PROFILE FORM
   ═══════════════════════════════════════ */
const ProfileForm = ({ token }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', linkedin: '', github: ''
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [status, setStatus] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (photo) data.append('photo', photo);

        try {
            const res = await fetch('/api/member-request', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data,
            });
            const result = await res.json();

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMsg(result.error || 'Something went wrong.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Network error: Is the server running?');
        }
    };

    if (status === 'success') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glow-card rounded-2xl p-12 md:p-16 text-center max-w-xl mx-auto">
                <div className="w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="text-cyan-400" size={48} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-black tracking-wider text-white uppercase mb-3">Submission Success!</h3>
                <p className="text-white/40 text-sm mb-10">Admin will review your profile and it will appear on the site if approved.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => { setStatus(''); setFormData({ name: '', email: '', linkedin: '', github: '' }); setPhoto(null); setPhotoPreview(null); }} className="font-display text-[10px] tracking-[0.3em] text-cyan-400/60 uppercase hover:text-cyan-400 transition-colors border border-cyan-400/10 px-6 py-3 rounded-lg">SUBMIT ANOTHER</button>
                    <Link to="/" className="font-display text-[10px] tracking-[0.3em] text-white/40 uppercase hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-lg">BACK TO SITE</Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl mx-auto">
            {errorMsg && <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center text-red-400 text-sm">{errorMsg}</div>}

            {/* Photo Upload Section */}
            <div className="flex flex-col items-center gap-4 mb-4">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white/[0.02] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                        {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <Camera size={32} className="text-white/20" />
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center cursor-pointer shadow-lg hover:bg-cyan-300 transition-colors">
                        <Camera size={18} className="text-[#02040a]" />
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    </label>
                </div>
                <p className="font-display text-[9px] tracking-[0.3em] text-white/30 uppercase">Upload Professional Photo (Required)</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block font-display text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2 ml-1">FULL NAME</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><User size={16} /></div>
                        <input
                            type="text" name="name" placeholder="Enter your full name"
                            value={formData.name} onChange={handleChange} required
                            className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400/30 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-display text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2 ml-1">COLLEGE EMAIL</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><Mail size={16} /></div>
                        <input
                            type="email" name="email" placeholder="yourname@vvce.ac.in"
                            value={formData.email} onChange={handleChange} required
                            className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400/30 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block font-display text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2 ml-1">LINKEDIN URL </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><Linkedin size={16} /></div>
                            <input
                                type="url" name="linkedin" placeholder="linkedin.com/in/..."
                                value={formData.linkedin} onChange={handleChange}
                                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400/30 transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-display text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2 ml-1">GITHUB URL (OPTIONAL)</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><Github size={16} /></div>
                            <input
                                type="url" name="github" placeholder="github.com/..."
                                value={formData.github} onChange={handleChange}
                                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-cyan-400/30 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" disabled={status === 'submitting'} className="w-full py-5 rounded-xl font-display text-[11px] tracking-[0.4em] uppercase border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 transition-all flex items-center justify-center gap-3">
                <Send size={14} /> {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT PROFILE REQUEST'}
            </button>
        </motion.form>
    );
};

/* ═══════════════════════════════════════
   ACCESS LOGIC WRAPPER
   ═══════════════════════════════════════ */
const ProfilePage = () => {
    // No longer persisting token to state on reload
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (token) {
            fetch('/api/profile/verify', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => {
                    if (res.ok) setVerified(true);
                    else { sessionStorage.removeItem('ivc_member_token'); setToken(''); }
                    setChecking(false);
                })
                .catch(() => setChecking(false));
        } else setChecking(false);
    }, [token]);

    return (
        <div className="min-h-screen bg-[#02040a] text-white relative overflow-hidden">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_60%)] rounded-full" />
                <div className="absolute inset-0 dot-matrix opacity-[0.03]" />
            </div>

            <nav className="relative z-50 border-b border-white/[0.06] bg-[#02040a]/80 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <ArrowLeft size={16} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                        <span className="font-display text-[10px] tracking-[0.3em] text-white/40 uppercase group-hover:text-cyan-400 transition-colors">BACK TO SITE</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Shield size={14} className="text-cyan-400/50" />
                        <span className="font-display text-[10px] tracking-[0.3em] text-white/30 uppercase">IVC MEMBER PORTAL</span>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                {verified ? <ProfileForm token={token} /> : (checking ? <div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-400/20 border-t-cyan-400 animate-spin rounded-full" /></div> : <LoginScreen onLogin={(t) => { setToken(t); setVerified(true); }} />)}
            </div>
        </div>
    );
};

export default ProfilePage;
