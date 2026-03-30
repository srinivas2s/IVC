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
                setError(data.error || 'Invalid password');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-white flex items-center justify-center relative overflow-hidden">
            {/* Logo Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1)_0%,transparent_50%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_60%)] rounded-full" />
                <div className="absolute inset-0 dot-matrix opacity-[0.03]" />
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md px-6">
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        className="w-24 h-24 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                    >
                        <img src={logo} alt="IVC Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                    </motion.div>
                    <h1 className="font-display text-3xl font-black tracking-wider uppercase mb-2 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">ADMIN PANEL</h1>
                    <p className="font-display text-[9px] tracking-[0.3em] text-white/30 uppercase">IVC Website Management Console</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2 ml-1">ADMIN PASSWORD</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/10 focus:outline-none focus:border-cyan-400/30 transition-all" placeholder="Enter admin password" required />
                        </div>
                    </div>
                    {error && <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-display text-[11px] tracking-[0.4em] uppercase border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 transition-all flex items-center justify-center gap-3">
                        <LogIn size={14} /> {loading ? 'AUTHENTICATING...' : 'ACCESS PANEL'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="glow-card p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 blur-[50px] -mr-16 -mt-16 group-hover:opacity-100 opacity-50 transition-opacity" />
        <div className="flex items-center gap-4 relative z-10">
            <div className={`p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 border border-white/10`}>
                <Icon size={20} className="text-cyan-400" />
            </div>
            <div>
                <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-white mt-1">{value}</p>
                    <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full opacity-50" />
                </div>
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════
   REQUEST CARD (MEMBERS)
   ═══════════════════════════════════════ */
const RequestCard = ({ request, onApprove, onReject, onDelete, onEdit, viewMode }) => {
    const [expanded, setExpanded] = useState(false);
    const s = {
        pending: { bg: 'bg-amber-400/5', border: 'border-amber-400/20', text: 'text-amber-400', icon: Clock },
        approved: { bg: 'bg-emerald-400/5', border: 'border-emerald-400/20', text: 'text-emerald-400', icon: CheckCircle },
        rejected: { bg: 'bg-red-400/5', border: 'border-red-400/20', text: 'text-red-400', icon: XCircle }
    }[request.status] || { bg: 'bg-slate-400/5', border: 'border-slate-400/20', text: 'text-slate-400', icon: Clock };

    const StatusIcon = s.icon;

    if (viewMode === 'list') {
        return (
            <motion.div layout className="glow-card p-4 rounded-xl border border-white/[0.06] flex items-center gap-6 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] overflow-hidden border border-white/[0.05] shrink-0">
                    {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 opacity-10" />}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-display text-[10px] font-bold text-white uppercase tracking-wider">{request.name}</h4>
                    <p className="text-white/30 text-[9px] truncate">{request.email}</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${s.bg} border ${s.border} text-[8px] ${s.text} uppercase hidden md:flex items-center gap-1.5`}>
                    <StatusIcon size={10} /> {request.status}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setExpanded(!expanded)} className="p-2 text-white/20 hover:text-cyan-400 transition-colors"><Eye size={14} /></button>
                    <button onClick={() => onEdit(request)} className="p-2 text-white/20 hover:text-amber-400 transition-colors"><Edit3 size={14} /></button>
                    <button onClick={() => onDelete(request.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
                
                <AnimatePresence>
                    {expanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="absolute top-full left-0 right-0 mt-2 z-20 glow-card p-6 rounded-xl border border-white/[0.1] bg-black shadow-2xl">
                             <div className="grid grid-cols-2 gap-4 text-[10px]">
                                <div><span className="opacity-30 uppercase block mb-1">Role / Position</span><p className="text-cyan-400">{request.role}</p></div>
                                <div><span className="opacity-30 uppercase block mb-1">Department</span><p>{request.department || 'N/A'}</p></div>
                                <div className="col-span-2 mt-2"><span className="opacity-30 uppercase block mb-1">Bio</span><p className="italic">"{request.bio || 'No bio provided'}"</p></div>
                                <div className="flex gap-4 mt-2">
                                    {request.linkedin && <a href={request.linkedin} target="_blank" rel="noreferrer" className="text-white/20 hover:text-blue-400"><Linkedin size={14} /></a>}
                                    {request.github && <a href={request.github} target="_blank" rel="noreferrer" className="text-white/20 hover:text-white"><Github size={14} /></a>}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div layout className="glow-card p-6 rounded-2xl border border-white/[0.06] text-center relative group">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(request)} className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/20 hover:text-amber-400 transition-all"><Edit3 size={12} /></button>
                <button onClick={() => onDelete(request.id)} className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/20 hover:text-red-400 transition-all"><Trash2 size={12} /></button>
            </div>

            <div className="w-16 h-16 rounded-full bg-white/[0.03] mx-auto mb-4 overflow-hidden border border-white/[0.05]">
                {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4 opacity-10" />}
            </div>
            <h4 className="font-display text-sm font-bold text-white uppercase">{request.name}</h4>
            <div className={`mt-2 mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${s.bg} border ${s.border} text-[8px] ${s.text} uppercase`}>
                <StatusIcon size={10} /> {request.status}
            </div>
            <p className="text-white/30 text-[10px] truncate mb-6">{request.email}</p>
            <div className="flex gap-2">
                {request.status === 'pending' ? (
                    <>
                        <button onClick={() => onApprove(request.id)} className="flex-1 py-2.5 rounded-lg border border-emerald-400/20 bg-emerald-400/5 text-emerald-400 text-[10px] uppercase">Approve</button>
                        <button onClick={() => onReject(request.id)} className="flex-1 py-2.5 rounded-lg border border-red-400/20 bg-red-400/5 text-red-400 text-[10px] uppercase">Reject</button>
                    </>
                ) : (
                    <button onClick={() => setExpanded(!expanded)} className="flex-1 py-2.5 rounded-lg border border-white/[0.06] text-white/30 text-[10px] uppercase hover:text-cyan-400 transition-colors">View Details</button>
                )}
            </div>
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
            <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-2xl border border-white/[0.05] backdrop-blur-xl">
                <h3 className="font-display text-[11px] tracking-[0.3em] text-white/40 uppercase">MANAGE MENTORS</h3>
                <button onClick={() => { setShowForm(!showForm); if(showForm) setFormData({ name: '', email: '', linkedin: '', quote: '', otherInfo: '' }); }} className="px-5 py-2 rounded-xl bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase font-display tracking-widest hover:bg-cyan-400/10 transition-all">
                    {showForm ? 'CANCEL' : 'ADD NEW MENTOR'}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <form onSubmit={handleAction} className="glow-card p-6 md:p-8 rounded-2xl border border-white/[0.06] space-y-6">
                            <h4 className="text-center font-display text-xs tracking-widest uppercase opacity-40">{formData.id ? 'EDITING MENTOR' : 'NEW MENTOR PROFILE'}</h4>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex items-center justify-center">
                                        {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Camera size={32} className="text-white/10" />}
                                    </div>
                                    <label className="text-[9px] text-cyan-400/60 font-display uppercase tracking-[0.2em] cursor-pointer hover:text-cyan-400">
                                        CHOOSE PHOTO <input type="file" className="hidden" onChange={e => {
                                            const file = e.target.files[0];
                                            if (file) { setPhoto(file); setPreview(URL.createObjectURL(file)); }
                                        }} accept="image/*" />
                                    </label>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <input type="url" placeholder="LinkedIn URL" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <input type="text" placeholder="Dept / Position" value={formData.otherInfo} onChange={e => setFormData({ ...formData, otherInfo: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full" />
                                    <textarea placeholder="Motivation Quote" rows={2} value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/30 outline-none w-full resize-none" />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-xl font-display text-[11px] tracking-widest uppercase hover:bg-cyan-400/20 transition-all">SAVE MENTOR</button>
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
                            <button
                                onClick={() => handleEdit(m)}
                                className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white/20 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                            >
                                <Edit3 size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(m.id)}
                                className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-5 text-center">
                            <h4 className="font-display text-sm font-black uppercase text-white tracking-wider truncate">{m.name}</h4>
                            <p className="text-cyan-400/60 text-[8px] uppercase tracking-[0.2em] mt-1 truncate">{m.other_info}</p>
                            <p className="text-white/40 text-[10px] mt-3 line-clamp-2 italic px-2">"{m.quote}"</p>
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
            <div className="flex justify-between items-center">
                <h3 className="font-display text-[11px] tracking-[0.3em] text-white/40 uppercase">EXCEL RECORDS ({apps.length})</h3>
                <a href="https://docs.google.com/spreadsheets/d/1Jt5RM71qsScLztmq1l6TJuDyoCGnOXGZU0saHRERpP4/edit" target="_blank" rel="noreferrer" className="px-5 py-2 rounded-xl bg-emerald-400/5 border border-emerald-400/20 text-emerald-400 text-[10px] uppercase font-display tracking-widest hover:bg-emerald-400/10 transition-all flex items-center gap-2">
                    <ExternalLink size={12} /> OPEN IN GOOGLE SHEETS
                </a>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.06] rounded-2xl overflow-hidden overflow-x-auto">
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
                {apps.length === 0 && !loading && <div className="py-20 text-center text-white/10 text-xs uppercase tracking-widest">No applications found in sheet</div>}
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

            {/* Existing Dashboard Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_70%)] rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] rounded-full blur-[80px]" />
                <div className="absolute inset-0 dot-matrix opacity-[0.04]" />
            </div>

            <nav className="border-b border-white/[0.06] bg-[#02040a]/40 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-white/20 hover:text-white"><ArrowLeft size={16} /></Link>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                            <Shield className="text-cyan-400" size={16} />
                            <span className="font-display text-[10px] tracking-[0.3em] uppercase opacity-60">ADMIN</span>
                        </div>
                    </div>
                    <button onClick={onLogout} className="text-[9px] tracking-[0.3em] text-white/30 hover:text-red-400 uppercase">LOGOUT</button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-10 relative z-10">
                    <h1 className="font-display text-3xl font-black uppercase mb-4 tracking-tighter">
                        {activeTab === 'requests' ? 'MEMBER PORTAL' : activeTab === 'mentors' ? 'MENTOR CENTER' : 'APPLICATION LOGS'}
                    </h1>
                    
                    {/* Floating Tab Navigation */}
                    <div className="inline-flex p-1.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-3xl shadow-2xl">
                        {['requests', 'mentors', 'applications'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)} 
                                className={`px-8 py-3 rounded-xl text-[9px] tracking-[0.3em] uppercase transition-all relative font-black ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                            >
                                {activeTab === tab && (
                                    <motion.div 
                                        layoutId="floating-bg" 
                                        className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 border border-cyan-400/30 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {editingRequest && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-12 overflow-hidden relative z-20">
                            <form onSubmit={handleUpdate} className="glow-card p-6 md:p-10 rounded-3xl border border-cyan-400/20 bg-black/40 backdrop-blur-3xl space-y-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-display text-sm tracking-[0.4em] text-cyan-400 uppercase font-black">EDITING PROFILE: {editingRequest.name}</h2>
                                    <button type="button" onClick={() => setEditingRequest(null)} className="text-white/20 hover:text-white transition-colors"><XCircle size={20} /></button>
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex flex-col items-center gap-4 shrink-0">
                                        <div className="w-40 h-40 rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex items-center justify-center relative group">
                                            {editPreview ? <img src={editPreview} className="w-full h-full object-cover" /> : <Camera size={40} className="text-white/10" />}
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                                <Camera size={24} className="text-white" />
                                                <input type="file" className="hidden" onChange={e => {
                                                    const file = e.target.files[0];
                                                    if (file) { setEditPhoto(file); setEditPreview(URL.createObjectURL(file)); }
                                                }} accept="image/*" />
                                            </label>
                                        </div>
                                        <p className="text-[8px] tracking-widest text-white/30 uppercase">Change Profile Photo</p>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">FULL NAME</label>
                                            <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">EMAIL</label>
                                            <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">POSITION / POST</label>
                                            <input type="text" value={editFormData.role} onChange={e => setEditFormData({...editFormData, role: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">DEPT</label>
                                                <input type="text" value={editFormData.department} onChange={e => setEditFormData({...editFormData, department: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">YEAR</label>
                                                <input type="text" value={editFormData.year} onChange={e => setEditFormData({...editFormData, year: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">BIO / INFO</label>
                                            <textarea value={editFormData.bio} onChange={e => setEditFormData({...editFormData, bio: e.target.value})} rows={3} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all resize-none" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">LINKEDIN</label>
                                            <input type="text" value={editFormData.linkedin} onChange={e => setEditFormData({...editFormData, linkedin: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] tracking-widest text-white/30 uppercase ml-1">GITHUB</label>
                                            <input type="text" value={editFormData.github} onChange={e => setEditFormData({...editFormData, github: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-cyan-400/30 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 py-5 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 rounded-2xl font-display text-[11px] tracking-[0.4em] uppercase font-black hover:from-cyan-500/30 hover:to-indigo-500/30 transition-all shadow-xl shadow-cyan-500/5">SAVE UPDATED PROFILE</button>
                                    <button type="button" onClick={() => setEditingRequest(null)} className="px-10 py-5 border border-white/10 rounded-2xl font-display text-[11px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-all">CANCEL</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {activeTab === 'requests' ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <StatCard icon={Users} label="Total" value={requests.length} color="cyan" />
                            <StatCard icon={Clock} label="Pending" value={requests.filter(r => r.status === 'pending').length} color="amber" />
                            <StatCard icon={CheckCircle} label="Approved" value={requests.filter(r => r.status === 'approved').length} color="emerald" />
                            <StatCard icon={XCircle} label="Rejected" value={requests.filter(r => r.status === 'rejected').length} color="red" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
                            <div className="flex gap-2">
                                {['all', 'pending', 'approved', 'rejected'].map(f => (
                                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg border text-[8px] tracking-widest uppercase transition-all ${filter === f ? 'border-cyan-400/30 bg-cyan-400/5 text-cyan-400' : 'border-white/5 text-white/30'}`}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs outline-none w-64" />
                                <div className="flex border border-white/10 rounded-lg overflow-hidden">
                                    <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-cyan-400/10 text-cyan-400' : 'opacity-20'}`}><LayoutGrid size={14} /></button>
                                    <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-cyan-400/10 text-cyan-400' : 'opacity-20'}`}><List size={14} /></button>
                                </div>
                            </div>
                        </div>

                        {loading ? <div className="py-24 text-center opacity-20"><RefreshCw className="animate-spin mx-auto" /></div> : (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
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

    if (checking) return <div className="min-h-screen bg-[#02040a] flex items-center justify-center opacity-20"><RefreshCw className="animate-spin" /></div>;
    if (!verified) return <LoginScreen onLogin={t => { setToken(t); setVerified(true); }} />;
    return <AdminDashboard token={token} onLogout={() => { sessionStorage.removeItem('ivc_admin_token'); setVerified(false); }} />;
};

export default AdminPage;
