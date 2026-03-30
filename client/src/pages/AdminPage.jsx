import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Users, CheckCircle, XCircle, Clock, Eye, Trash2,
    RefreshCw, LogIn, Lock, ArrowLeft, Search, LayoutGrid,
    List, Linkedin, Github, Mail, User, Camera, FileText,
    ExternalLink, Edit3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

/* ═══════════════════════════════════════
   LOGIN SCREEN
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
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                sessionStorage.setItem('ivc_admin_token', data.token);
                onLogin(data.token);
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Animations (Persistent like Landing) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] rounded-full blur-[80px]" />
                <div className="absolute inset-0 dot-matrix opacity-[0.05]" />
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md px-6">
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ rotate: -5 }}
                        animate={{ rotate: 0 }}
                        className="w-48 h-48 flex items-center justify-center mx-auto mb-6 select-none"
                    >
                        <img src={logo} alt="IVC Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]" />
                    </motion.div>
                    <h1 className="font-display text-4xl font-black tracking-tighter uppercase mb-2 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic">ADMIN CONSOLE</h1>
                    <p className="font-display text-[11px] tracking-[0.5em] text-cyan-400/60 uppercase font-black">Secure Authentication Required</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="glow-card p-1 rounded-2xl border border-white/5 group-focus-within:border-cyan-400/50 transition-all">
                        <div className="relative bg-[#02040a]/80 rounded-xl">
                            <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-none rounded-xl py-6 pl-16 pr-6 text-white placeholder-white/10 focus:outline-none transition-all font-bold text-lg" placeholder="ACCESS KEY" required />
                        </div>
                    </div>
                    {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-black text-center uppercase tracking-widest">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full py-5 rounded-2xl bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        {loading ? 'VERIFYING...' : 'INITIALIZE'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color = 'cyan' }) => {
    const colors = {
        cyan: 'text-cyan-400 bg-cyan-400/5 border-cyan-400/20',
        amber: 'text-amber-400 bg-amber-400/5 border-amber-400/20',
        emerald: 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20',
        red: 'text-red-400 bg-red-400/5 border-red-400/20'
    };

    return (
        <div className="glow-card p-8 rounded-2xl border border-white/5 flex items-center justify-between gap-4 group">
            <div>
                <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase font-display mb-1">{label}</p>
                <p className="text-3xl font-black text-white tracking-tighter italic">{value}</p>
            </div>
            <div className={`p-4 rounded-xl ${colors[color]} transition-all group-hover:scale-110`}>
                <Icon size={24} />
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════
   REQUEST CARD (MEMBERS)
   ═══════════════════════════════════════ */
const RequestCard = ({ request, onApprove, onReject, onDelete, onEdit, viewMode }) => {
    const [expanded, setExpanded] = useState(false);
    const s = {
        pending: { bg: 'bg-amber-400/10', border: 'border-amber-400/20', text: 'text-amber-500', icon: Clock },
        approved: { bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', text: 'text-emerald-500', icon: CheckCircle },
        rejected: { bg: 'bg-red-400/10', border: 'border-red-400/20', text: 'text-red-500', icon: XCircle }
    }[request.status] || { bg: 'bg-slate-400/10', border: 'border-slate-400/20', text: 'text-slate-500', icon: Clock };

    const StatusIcon = s.icon;

    if (viewMode === 'list') {
        return (
            <motion.div layout className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-6 group hover:bg-white/[0.08] transition-all">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
                    {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 opacity-20" />}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-display text-[11px] font-black text-white uppercase tracking-widest">{request.name}</h4>
                    <p className="text-white/30 text-[9px] truncate">{request.email}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full ${s.bg} border ${s.border} text-[8px] font-black ${s.text} uppercase hidden md:flex items-center gap-2`}>
                    <StatusIcon size={12} /> {request.status}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setExpanded(!expanded)} className="p-2 text-white/20 hover:text-white transition-colors"><Eye size={16} /></button>
                    <button onClick={() => onEdit(request)} className="p-2 text-white/20 hover:text-amber-400 transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => onDelete(request.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>

                <AnimatePresence>
                    {expanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="absolute top-full left-0 right-0 mt-2 z-30 bg-[#0a0c12] p-8 rounded-xl border border-white/10 shadow-2xl">
                             <div className="grid grid-cols-2 gap-6 text-[11px]">
                                <div><span className="text-white/30 uppercase block mb-1">Role</span><p className="text-white font-medium">{request.role}</p></div>
                                <div><span className="text-white/30 uppercase block mb-1">Department</span><p className="text-white font-medium">{request.department || 'N/A'}</p></div>
                                <div className="col-span-2 mt-2"><span className="text-white/30 uppercase block mb-1">Bio</span><p className="italic text-white/60">"{request.bio || 'No bio provided'}"</p></div>
                                <div className="flex gap-4 mt-2">
                                    {request.linkedin && <a href={request.linkedin} target="_blank" rel="noreferrer" className="text-white/30 hover:text-cyan-400"><Linkedin size={18} /></a>}
                                    {request.github && <a href={request.github} target="_blank" rel="noreferrer" className="text-white/30 hover:text-white"><Github size={18} /></a>}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div layout className="glow-card p-6 rounded-2xl border border-white/5 text-center relative group min-h-[380px] flex flex-col items-center justify-center">
            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90">
                <button onClick={() => onEdit(request)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-amber-400 hover:bg-amber-400/10"><Edit3 size={14} /></button>
                <button onClick={() => onDelete(request.id)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10"><Trash2 size={14} /></button>
            </div>

            <div className="w-20 h-20 rounded-2xl bg-white/[0.02] mx-auto mb-6 overflow-hidden border border-white/10 p-1 flex items-center justify-center">
                {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover rounded-xl" /> : <User className="w-full h-full p-4 text-white/10" />}
            </div>
            
            <h4 className="font-display text-base font-black text-white uppercase tracking-wider">{request.name}</h4>
            
            <div className={`mt-4 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${s.bg} border ${s.border} text-[9px] font-black ${s.text} uppercase`}>
                <StatusIcon size={12} /> {request.status}
            </div>
            
            <p className="text-white/30 text-[10px] px-4 mb-8 truncate w-full">{request.email}</p>
            
            <div className="flex gap-3 w-full mt-auto">
                {request.status === 'pending' ? (
                    <>
                        <button onClick={() => onApprove(request.id)} className="flex-1 py-3 rounded-xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400/20 transition-all">Approve</button>
                        <button onClick={() => onReject(request.id)} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/30 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Reject</button>
                    </>
                ) : (
                    <button onClick={() => setExpanded(!expanded)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <Eye size={14} /> VIEW DETAILS
                    </button>
                )}
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-50 bg-[#02040a] p-8 rounded-2xl border border-cyan-400/30 flex flex-col justify-center">
                        <button onClick={() => setExpanded(false)} className="absolute top-4 right-4 text-white/20 hover:text-white"><XCircle size={20} /></button>
                        <div className="text-left space-y-4">
                            <div><span className="text-white/20 text-[9px] uppercase block mb-1">Identity</span><p className="text-white font-bold text-xs uppercase">{request.role} | {request.department}</p></div>
                            <div><span className="text-white/20 text-[9px] uppercase block mb-1">Year</span><p className="text-white font-bold text-xs uppercase">{request.year || 'N/A'}</p></div>
                            <div><span className="text-white/20 text-[9px] uppercase block mb-1">Motivation</span><p className="italic text-white/60 text-xs line-clamp-4">"{request.bio}"</p></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ═══════════════════════════════════════
   MENTOR MANAGER
   ═══════════════════════════════════════ */
const MentorManager = ({ token }) => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', quote: '', otherInfo: '' });
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchMentors = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/mentors', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) setMentors(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    }, [token]);

    useEffect(() => { fetchMentors(); }, [fetchMentors]);

    const handleEdit = (mentor) => {
        setFormData({
            id: mentor.id,
            name: mentor.name,
            email: mentor.email,
            linkedin: mentor.linkedin || '',
            quote: mentor.quote || '',
            otherInfo: mentor.other_info || ''
        });
        setPreview(mentor.photo_url);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAction = async (e) => {
        e.preventDefault();
        const isEdit = !!formData.id;
        const data = new FormData();
        Object.keys(formData).forEach(k => {
            if (k !== 'id') data.append(k, formData[k]);
        });
        if (photo) data.append('photo', photo);

        try {
            const url = isEdit ? `/api/admin/mentors/${formData.id}` : '/api/admin/mentors';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });
            if (res.ok) {
                setShowForm(false); fetchMentors();
                setFormData({ name: '', email: '', linkedin: '', quote: '', otherInfo: '' });
                setPreview(null); setPhoto(null);
            }
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete mentor?')) return;
        try {
            const res = await fetch(`/api/admin/mentors/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                fetchMentors();
            } else {
                const data = await res.json();
                alert(`Delete failed: ${data.error || 'Server error'}`);
            }
        } catch (e) {
            console.error(e);
            alert('Network error. Is the server running?');
        }
    };

    return (
        <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] backdrop-blur-xl mb-6">
                <h3 className="font-display text-[11px] tracking-[0.3em] text-white/40 uppercase">MANAGE MENTORS</h3>
                <button onClick={() => { setShowForm(!showForm); if (showForm) setFormData({ name: '', email: '', linkedin: '', quote: '', otherInfo: '' }); }} className="px-5 py-2 rounded-xl bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase font-display tracking-widest hover:bg-cyan-400/10 transition-all">
                    {showForm ? 'CANCEL' : 'ADD NEW MENTOR'}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <form onSubmit={handleAction} className="glow-card p-6 md:p-8 rounded-2xl border border-white/[0.06] space-y-6 mb-8">
                            <h4 className="text-center font-display text-xs tracking-widest uppercase opacity-40">{formData.id ? 'EDITING MENTOR' : 'NEW MENTOR PROFILE'}</h4>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex items-center justify-center relative group">
                                        {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Camera size={32} className="text-white/10" />}
                                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                            <Camera size={20} className="text-white" />
                                            <input type="file" className="hidden" onChange={e => {
                                                const file = e.target.files[0];
                                                if (file) { setPhoto(file); setPreview(URL.createObjectURL(file)); }
                                            }} accept="image/*" />
                                        </label>
                                    </div>
                                    <p className="text-[9px] text-cyan-400/40 font-display uppercase tracking-widest">AVATAR</p>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                                    <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <input type="url" placeholder="LinkedIn URL" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <input type="text" placeholder="Position / Dept" value={formData.otherInfo} onChange={e => setFormData({ ...formData, otherInfo: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <textarea placeholder="Motivation Quote" rows={2} value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full resize-none font-medium text-white/60" />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 py-4 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-xl font-display text-[11px] tracking-widest uppercase hover:bg-cyan-400/20 transition-all">SAVE MENTOR</button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-4 bg-white/5 border border-white/10 text-white/30 rounded-xl font-display text-[11px] tracking-widest uppercase hover:bg-white/10 transition-all">CANCEL</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mentors.map(m => (
                    <div key={m.id} className="relative h-[250px] rounded-2xl overflow-hidden group border border-white/5 hover:border-cyan-400/30 transition-all duration-500 shadow-xl">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            {m.photo_url ? (
                                <img
                                    src={m.photo_url}
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                                    <User size={32} className="text-white/10" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/60 to-transparent" />
                        </div>

                        {/* Actions */}
                        <div className="absolute top-3 right-3 z-20 flex gap-2">
                            <button onClick={() => handleEdit(m)} className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white/20 hover:text-amber-400 hover:bg-amber-500/10 transition-all"><Edit3 size={14} /></button>
                            <button onClick={() => handleDelete(m.id)} className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={14} /></button>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-5 text-center">
                            <h4 className="font-display text-sm font-black uppercase text-white tracking-wider truncate">{m.name}</h4>
                            <p className="text-cyan-400/60 text-[8px] uppercase tracking-[0.2em] mt-1 truncate">{m.other_info}</p>
                            <p className="text-white/40 text-[10px] mt-3 line-clamp-2 italic px-2 font-medium">"{m.quote}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════
   APPLICATIONS MANAGER (Public Join Form)
   ═══════════════════════════════════════ */
const ApplicationManager = ({ token }) => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApps = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/applications', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) setApps(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    }, [token]);

    useEffect(() => { fetchApps(); }, [fetchApps]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/[0.05] backdrop-blur-xl mb-6">
                <h3 className="font-display text-[11px] tracking-[0.3em] text-white/40 uppercase">EXCEL RECORDS ({apps.length})</h3>
                <a href="https://docs.google.com/spreadsheets/d/1Jt5RM71qsScLztmq1l6TJuDyoCGnOXGZU0saHRERpP4/edit" target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl bg-emerald-400/5 border border-emerald-400/20 text-emerald-400 text-[10px] uppercase font-display tracking-widest hover:bg-emerald-400/10 transition-all flex items-center gap-2">
                    <ExternalLink size={12} /> OPEN IN GOOGLE SHEETS
                </a>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.06] rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                            {['NAME', 'EMAIL', 'BRANCH / YEAR', 'APPLIED ON'].map(h => (
                                <th key={h} className="px-6 py-4 text-[9px] font-display tracking-widest text-white/30 uppercase">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {apps.map((a, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4"><p className="text-xs font-bold text-white uppercase">{a.name}</p></td>
                                <td className="px-6 py-4 text-xs text-white/60">{a.email}</td>
                                <td className="px-6 py-4 text-[10px] text-white/60 uppercase">{a.department} <span className="text-cyan-400/40 mx-2">|</span> {a.year}</td>
                                <td className="px-6 py-4 text-[10px] text-white/30 uppercase font-display">{new Date(a.applied_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {apps.length === 0 && !loading && <div className="py-20 text-center text-white/10 text-xs uppercase tracking-widest font-black">No application records found</div>}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════
   ADMIN DASHBOARD
   ═══════════════════════════════════════ */
const AdminDashboard = ({ token, onLogout }) => {
    const [activeTab, setActiveTab] = useState('requests');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [editingRequest, setEditingRequest] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [editPhoto, setEditPhoto] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/requests', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.status === 401) return onLogout();
            const data = await res.json();
            setRequests(data.requests || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    }, [token, onLogout]);

    useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const handleAction = async (id, action) => {
        try {
            const res = await fetch(`/api/admin/requests/${id}/${action}`, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) fetchRequests();
        } catch (e) { console.error(e); }
    };

    const handleEdit = (request) => {
        setEditingRequest(request);
        setEditFormData({
            name: request.name,
            email: request.email,
            role: request.role,
            department: request.department || '',
            year: request.year || '',
            bio: request.bio || '',
            linkedin: request.linkedin || '',
            github: request.github || ''
        });
        setEditPreview(request.photoUrl);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(editFormData).forEach(k => data.append(k, editFormData[k]));
        if (editPhoto) data.append('photo', editPhoto);

        try {
            const res = await fetch(`/api/admin/requests/${editingRequest.id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });
            if (res.ok) {
                setEditingRequest(null);
                fetchRequests();
            }
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this request?')) return;
        try {
            const res = await fetch(`/api/admin/requests/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                fetchRequests();
            } else {
                const data = await res.json();
                alert(`Delete failed: ${data.error || 'Server error'}`);
            }
        } catch (e) {
            console.error(e);
            alert('Network error. Is the server running?');
        }
    };

    const filtered = requests
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#02040a] text-white overflow-hidden relative">
            {/* Logo Watermark Background (Persistent like ProfilePage) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
                <motion.div 
                    animate={{ 
                        y: [-25, 25, -25],
                        rotate: [-2, 2, -2]
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-[90%] h-[90%] flex items-center justify-center opacity-[0.03] grayscale select-none"
                >
                    <img src={logo} alt="Watermark" className="max-w-full max-h-full object-contain scale-125" />
                </motion.div>
            </div>

            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_70%)] rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] rounded-full blur-[80px]" />
                <div className="absolute inset-0 dot-matrix opacity-[0.04]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <Link to="/" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all">
                                <ArrowLeft size={18} />
                            </Link>
                            <div>
                                <p className="font-display text-[10px] tracking-[0.5em] text-cyan-400/40 uppercase font-black italic">CONTROL PANEL V2</p>
                                <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-white">
                                    {activeTab === 'requests' ? 'MEMBER PORTAL' : activeTab === 'mentors' ? 'MENTOR CENTER' : 'APPLICATION LOGS'}
                                </h1>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="inline-flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
                            {['requests', 'mentors', 'applications'].map(tab => (
                                <button 
                                    key={tab} 
                                    onClick={() => setActiveTab(tab)} 
                                    className={`px-6 py-3 rounded-xl text-[10px] tracking-widest uppercase transition-all relative font-black ${activeTab === tab ? 'text-[#02040a]' : 'text-white/30 hover:text-white/60'}`}
                                >
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="floating-bg" 
                                            className="absolute inset-0 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                                        />
                                    )}
                                    <span className="relative z-10">{tab}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={onLogout} className="px-6 py-3 rounded-xl border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 text-[10px] tracking-[0.3em] font-black uppercase transition-all">LOGOUT</button>
                    </div>
                </div>

                <AnimatePresence>
                    {editingRequest && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-12 overflow-hidden relative z-20">
                            <form onSubmit={handleUpdate} className="glow-card p-10 rounded-2xl border border-white/10 space-y-8 bg-[#0a0c10]/80 backdrop-blur-3xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-display text-sm tracking-[0.4em] text-white uppercase font-black italic opacity-60">EDITOR // {editingRequest.name}</h2>
                                    <button type="button" onClick={() => setEditingRequest(null)} className="text-white/20 hover:text-red-500 transition-colors"><XCircle size={24} /></button>
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex flex-col items-center gap-4 shrink-0">
                                        <div className="w-40 h-40 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative group">
                                            {editPreview ? <img src={editPreview} className="w-full h-full object-cover" /> : <Camera size={40} className="text-white/10" />}
                                            <label className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                                                <Camera size={24} className="text-white" />
                                                <input type="file" className="hidden" onChange={e => {
                                                    const file = e.target.files[0];
                                                    if (file) { setEditPhoto(file); setEditPreview(URL.createObjectURL(file)); }
                                                }} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                                        <div className="space-y-1">
                                            <label className="text-[10px] tracking-widest text-white/20 uppercase font-black">Full Name</label>
                                            <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400 outline-none transition-all font-bold" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] tracking-widest text-white/20 uppercase font-black">Email</label>
                                            <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400 outline-none transition-all font-bold" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] tracking-widest text-white/20 uppercase font-black">Role / Position</label>
                                            <input type="text" value={editFormData.role} onChange={e => setEditFormData({...editFormData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400 outline-none transition-all font-bold text-white/60" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] tracking-widest text-white/20 uppercase font-black">Dept</label>
                                                <input type="text" value={editFormData.department} onChange={e => setEditFormData({...editFormData, department: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400 outline-none transition-all font-bold" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] tracking-widest text-white/20 uppercase font-black">Year</label>
                                                <input type="text" value={editFormData.year} onChange={e => setEditFormData({...editFormData, year: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400 outline-none transition-all font-bold" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-[10px] tracking-widest text-white/20 uppercase font-black">Bio</label>
                                            <textarea value={editFormData.bio} onChange={e => setEditFormData({...editFormData, bio: e.target.value})} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400 outline-none transition-all resize-none text-white/50" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-white/5">
                                    <button type="submit" className="flex-1 py-5 bg-white text-[#02040a] rounded-xl font-display text-[11px] tracking-[0.4em] uppercase font-black hover:bg-cyan-400 transition-all shadow-2xl">UPDATE DATABASE</button>
                                    <button type="button" onClick={() => setEditingRequest(null)} className="px-10 py-5 border border-white/10 text-white/40 font-black tracking-widest text-[11px] uppercase hover:bg-white/5 rounded-xl transition-all">DISCARD</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {activeTab === 'requests' ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <StatCard icon={Users} label="Total Members" value={requests.length} color="cyan" />
                            <StatCard icon={Clock} label="Pending" value={requests.filter(r => r.status === 'pending').length} color="amber" />
                            <StatCard icon={CheckCircle} label="Approved" value={requests.filter(r => r.status === 'approved').length} color="emerald" />
                            <StatCard icon={XCircle} label="Rejected" value={requests.filter(r => r.status === 'rejected').length} color="red" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5 mb-10 justify-between items-center relative z-10">
                            <div className="flex gap-2">
                                {['all', 'pending', 'approved', 'rejected'].map(f => (
                                    <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-xl text-[9px] tracking-widest uppercase font-black transition-all border ${filter === f ? 'bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-white/5 border-white/5 text-white/20 hover:text-white/40'}`}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:w-80">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                    <input type="text" placeholder="QUERY RECORDS..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-xs outline-none focus:border-cyan-400/30 transition-all font-medium text-white shadow-2xl" />
                                </div>
                                <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden p-0.5">
                                    <button onClick={() => setViewMode('grid')} className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/20'}`}><LayoutGrid size={18} /></button>
                                    <button onClick={() => setViewMode('list')} className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/20'}`}><List size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {loading ? <div className="py-32 text-center text-white/10"><RefreshCw size={40} className="animate-spin mx-auto mb-4 opacity-20" /><p className="text-[10px] tracking-[0.5em] uppercase font-black">Accessing Data...</p></div> : (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'space-y-4'}>
                                {filtered.map(r => (
                                    <RequestCard key={r.id} request={r} viewMode={viewMode} onEdit={handleEdit} onApprove={id => handleAction(id, 'approve')} onReject={id => handleAction(id, 'reject')} onDelete={handleDelete} />
                                ))}
                            </div>
                        )}
                    </>
                ) : activeTab === 'mentors' ? (
                    <MentorManager token={token} />
                ) : (
                    <ApplicationManager token={token} />
                )}
            </div>
        </div>
    );
};

const AdminPage = () => {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const t = sessionStorage.getItem('ivc_admin_token');
        if (t) {
            fetch('/api/admin/verify', { headers: { 'Authorization': `Bearer ${t}` } })
                .then(res => {
                    if (res.ok) { setToken(t); setVerified(true); }
                    else sessionStorage.removeItem('ivc_admin_token');
                    setChecking(false);
                }).catch(() => setChecking(false));
        } else setChecking(false);
    }, []);

    if (checking) return <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-white/20"><RefreshCw className="animate-spin" /></div>;
    if (!verified) return <LoginScreen onLogin={t => { setToken(t); setVerified(true); }} />;
    return <AdminDashboard token={token} onLogout={() => { sessionStorage.removeItem('ivc_admin_token'); setVerified(false); }} />;
};

export default AdminPage;
