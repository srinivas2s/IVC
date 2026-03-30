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
        <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Soft Branded Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] rounded-full blur-3xl" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 3 }} className="relative z-10 w-full max-w-md px-6">
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-48 h-48 flex items-center justify-center mx-auto mb-6 select-none"
                    >
                        <img src={logo} alt="IVC Logo" className="w-full h-full object-contain filter drop-shadow-2xl" />
                    </motion.div>
                    <h1 className="font-display text-4xl font-black tracking-tighter uppercase mb-2 bg-slate-900 bg-clip-text text-transparent italic">ADMIN PORTAL</h1>
                    <p className="font-display text-[11px] tracking-[0.5em] text-slate-400 uppercase font-black">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-slate-50 p-1.5 rounded-3xl border border-slate-100 shadow-inner">
                        <div className="relative">
                            <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-none rounded-2xl py-6 pl-16 pr-6 text-slate-900 placeholder-slate-300 focus:outline-none transition-all font-bold text-lg" placeholder="Enter Access Key" required />
                        </div>
                    </div>
                    {error && <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black text-center uppercase tracking-widest">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full py-5 rounded-[2rem] bg-slate-900 text-white font-black text-[12px] tracking-[0.6em] uppercase hover:bg-black transition-all shadow-2xl shadow-slate-200">
                        {loading ? 'AUTHENTICATING...' : 'ENTER CONSOLE'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 flex items-center justify-between gap-6 shadow-2xl shadow-slate-200/50 group hover:shadow-slate-300/60 transition-all duration-500">
        <div className="space-y-1">
            <p className="text-[10px] tracking-[0.4em] text-slate-400 uppercase font-black">{label}</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter italic">{value}</p>
        </div>
        <div className={`p-5 rounded-[2rem] bg-slate-50 border border-slate-100 transition-colors group-hover:bg-slate-900 group-hover:text-white`}>
            <Icon size={32} className="transition-all" />
        </div>
    </div>
);

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
            <motion.div layout className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-slate-200/50 transition-all shadow-sm relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-50 shrink-0 bg-slate-50 flex items-center justify-center p-0.5">
                    {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover rounded-xl" /> : <User className="w-full h-full p-3 text-slate-200" />}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-display text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1">{request.name}</h4>
                    <p className="text-slate-400 text-[10px] font-medium truncate tracking-tight">{request.email}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl ${s.bg} border ${s.border} text-[9px] font-black ${s.text} uppercase hidden md:flex items-center gap-2 tracking-widest`}>
                    <StatusIcon size={12} /> {request.status}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setExpanded(!expanded)} className={`p-3 rounded-xl transition-all ${expanded ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-300 hover:text-slate-900 hover:bg-slate-50'}`}><Eye size={18} /></button>
                    <button onClick={() => onEdit(request)} className="p-3 text-slate-300 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                    <button onClick={() => onDelete(request.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>

                <AnimatePresence>
                    {expanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="absolute top-[110%] left-0 right-0 z-30 overflow-hidden">
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-300/40 mt-2 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div>
                                            <span className="text-slate-400 uppercase block mb-2 text-[10px] font-black tracking-[0.2em]">Professional Identity</span>
                                            <p className="text-slate-900 font-bold text-sm">{request.role} <span className="text-slate-200 mx-3">/</span> {request.department || 'General'}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 uppercase block mb-2 text-[10px] font-black tracking-[0.2em]">Academic Context</span>
                                            <p className="text-slate-900 font-bold text-sm">{request.year ? `Year ${request.year}` : 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 uppercase block mb-2 text-[10px] font-black tracking-[0.2em]">Bio & Vision</span>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-slate-600 leading-relaxed text-xs font-medium">
                                            "{request.bio || 'No personal statement provided.'}"
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-slate-50">
                                    {request.linkedin && <a href={request.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all text-[10px] font-black uppercase tracking-widest"><Linkedin size={16} /> LinkedIn Profile</a>}
                                    {request.github && <a href={request.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all text-[10px] font-black uppercase tracking-widest"><Github size={16} /> GitHub Repo</a>}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div layout className="bg-white p-10 rounded-[3rem] border border-slate-100 text-center relative group shadow-2xl shadow-slate-200/50 hover:shadow-slate-300/60 transition-all duration-500">
            <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(request)} className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-amber-500 shadow-sm transition-all"><Edit3 size={16} /></button>
                <button onClick={() => onDelete(request.id)} className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-red-500 shadow-sm transition-all"><Trash2 size={16} /></button>
            </div>

            <div className="w-24 h-24 rounded-[2rem] bg-slate-50 mx-auto mb-6 overflow-hidden border border-slate-100 p-1 shadow-inner">
                {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover" /> : <User className="w-full h-full p-6 text-slate-200" />}
            </div>
            
            <h4 className="font-display text-lg font-black text-slate-900 uppercase tracking-tighter">{request.name}</h4>
            
            <div className={`mt-4 mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full ${s.bg} border ${s.border} text-[10px] font-black ${s.text} uppercase tracking-widest`}>
                <StatusIcon size={12} /> {request.status}
            </div>
            
            <p className="text-slate-400 text-[10px] font-medium px-4 mb-10 truncate">{request.email}</p>
            
            <div className="flex gap-3">
                {request.status === 'pending' ? (
                    <>
                        <button onClick={() => onApprove(request.id)} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-black transition-all">Approve</button>
                        <button onClick={() => onReject(request.id)} className="flex-1 py-4 rounded-2xl border border-slate-100 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Reject</button>
                    </>
                ) : (
                    <button onClick={() => setExpanded(!expanded)} className="flex-1 py-4 rounded-2xl bg-white border border-slate-900 text-slate-900 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">View Profile</button>
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
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <h3 className="font-display text-[10px] tracking-[0.4em] text-slate-400 uppercase font-black">MANAGE MENTORS</h3>
                <button onClick={() => { setShowForm(!showForm); if (showForm) setFormData({ name: '', email: '', linkedin: '', quote: '', otherInfo: '' }); }} className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-900 text-white text-[10px] uppercase font-black tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200">
                    {showForm ? 'DISCARD' : 'ADD MENTOR'}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <form onSubmit={handleAction} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 mb-10">
                            <h4 className="text-center font-display text-[10px] tracking-[0.4em] uppercase text-slate-400 font-black">{formData.id ? 'EDITING MENTOR PROFILE' : 'NEW MENTOR PROFILE'}</h4>
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="flex flex-col items-center gap-5">
                                    <div className="w-40 h-40 rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative group">
                                        {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Camera size={40} className="text-slate-200" />}
                                        <label className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                                            <Camera size={24} className="text-slate-900" />
                                            <input type="file" className="hidden" onChange={e => {
                                                const file = e.target.files[0];
                                                if (file) { setPhoto(file); setPreview(URL.createObjectURL(file)); }
                                            }} accept="image/*" />
                                        </label>
                                    </div>
                                    <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Profile Visual</p>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none w-full font-bold text-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                                        <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none w-full font-bold text-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">LinkedIn Profile</label>
                                        <input type="url" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none w-full font-bold text-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Position / Dept</label>
                                        <input type="text" value={formData.otherInfo} onChange={e => setFormData({ ...formData, otherInfo: e.target.value })} className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none w-full font-bold text-slate-900 transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Motivation Quote</label>
                                        <textarea rows={3} value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none w-full resize-none font-medium text-slate-600 transition-all leading-relaxed" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-display text-[11px] tracking-[0.5em] uppercase font-black hover:bg-black transition-all shadow-xl shadow-slate-200">Commit Profile</button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-10 py-5 border border-slate-100 text-slate-400 font-black tracking-widest text-[11px] uppercase hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mentors.map(m => (
                    <div key={m.id} className="relative h-[250px] rounded-[2rem] overflow-hidden group border border-slate-100 bg-white hover:border-slate-300 transition-all duration-500 shadow-xl shadow-slate-200/50">
                        {/* Background Image with Light Overlay */}
                        <div className="absolute inset-0 z-0">
                            {m.photo_url ? (
                                <img
                                    src={m.photo_url}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                    <User size={32} className="text-slate-200" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                        </div>

                        {/* Actions */}
                        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(m)} className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-amber-500 shadow-sm transition-all"><Edit3 size={16} /></button>
                            <button onClick={() => handleDelete(m.id)} className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 shadow-sm transition-all"><Trash2 size={16} /></button>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-6 text-center">
                            <h4 className="font-display text-sm font-black uppercase text-slate-900 tracking-wider truncate">{m.name}</h4>
                            <p className="text-slate-400 text-[9px] uppercase tracking-[0.2em] font-black mt-1 truncate">{m.other_info}</p>
                            <p className="text-slate-500 text-[10px] mt-3 line-clamp-2 italic px-2 font-medium">"{m.quote}"</p>
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
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 mb-8">
                <h3 className="font-display text-[10px] tracking-[0.4em] text-slate-400 uppercase font-black">EXCEL RECORDS ({apps.length})</h3>
                <a href="https://docs.google.com/spreadsheets/d/1Jt5RM71qsScLztmq1l6TJuDyoCGnOXGZU0saHRERpP4/edit" target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-xl bg-emerald-500 border border-emerald-500 text-white text-[10px] uppercase font-black tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100">
                    <ExternalLink size={12} /> SYNC WITH SHEETS
                </a>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden overflow-x-auto shadow-2xl shadow-slate-200/50">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {['Member Identity', 'Contact Details', 'Branch / Year', 'Applied On'].map(h => (
                                <th key={h} className="px-8 py-5 text-[9px] font-black tracking-widest text-slate-400 uppercase">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {apps.map((a, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5"><p className="text-xs font-black text-slate-900 uppercase tracking-tight">{a.name}</p></td>
                                <td className="px-8 py-5 text-xs text-slate-500 font-medium">{a.email}</td>
                                <td className="px-8 py-5 text-[10px] text-slate-600 font-bold uppercase tracking-wide">{a.department} <span className="text-slate-200 mx-2">|</span> {a.year}</td>
                                <td className="px-8 py-5 text-[10px] text-slate-400 uppercase font-black tracking-tighter">{new Date(a.applied_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {apps.length === 0 && !loading && <div className="py-24 text-center text-slate-200 text-[10px] uppercase font-black tracking-[0.3em]">No applications recorded</div>}
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
        <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
            {/* Logo Watermark Background (Branded Airy Feel) */}
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
                    className="w-[90%] h-[90%] flex items-center justify-center opacity-[0.05] grayscale select-none"
                >
                    <img src={logo} alt="Watermark" className="max-w-full max-h-full object-contain scale-125" />
                </motion.div>
            </div>

            <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <Link to="/" className="text-slate-300 hover:text-slate-900 transition-colors"><ArrowLeft size={18} /></Link>
                        <div className="flex items-center gap-3 border-l border-slate-100 pl-5">
                            <Shield className="text-slate-900" size={18} />
                            <span className="font-display text-[10px] tracking-[0.4em] uppercase font-black">ADMINISTRATOR</span>
                        </div>
                    </div>
                    <button onClick={onLogout} className="text-[10px] tracking-[0.4em] text-slate-400 hover:text-red-600 font-black uppercase transition-colors">LOGOUT</button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <p className="font-display text-[10px] tracking-[0.5em] text-slate-400 uppercase font-black mb-2">CONTROL PANEL</p>
                        <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-slate-900">
                            {activeTab === 'requests' ? 'MEMBER PORTAL' : activeTab === 'mentors' ? 'MENTOR CENTER' : 'APPLICATION LOGS'}
                        </h1>
                    </div>
                    
                    <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
                        {['requests', 'mentors', 'applications'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)} 
                                className={`px-6 py-3 rounded-xl text-[10px] tracking-widest uppercase transition-all relative font-black ${activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {activeTab === tab && (
                                    <motion.div 
                                        layoutId="floating-bg" 
                                        className="absolute inset-0 bg-slate-900 rounded-xl shadow-lg shadow-slate-200" 
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
                            <form onSubmit={handleUpdate} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-display text-sm tracking-[0.4em] text-slate-900 uppercase font-black italic">EDITOR: {editingRequest.name}</h2>
                                    <button type="button" onClick={() => setEditingRequest(null)} className="text-slate-300 hover:text-red-500 transition-colors"><XCircle size={24} /></button>
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex flex-col items-center gap-4 shrink-0">
                                        <div className="w-40 h-40 rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative group">
                                            {editPreview ? <img src={editPreview} className="w-full h-full object-cover" /> : <Camera size={40} className="text-slate-200" />}
                                            <label className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                                                <Camera size={24} className="text-slate-900" />
                                                <input type="file" className="hidden" onChange={e => {
                                                    const file = e.target.files[0];
                                                    if (file) { setEditPhoto(file); setEditPreview(URL.createObjectURL(file)); }
                                                }} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] tracking-widest text-slate-400 uppercase font-black">Full Name</label>
                                            <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none transition-all font-bold text-slate-900" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] tracking-widest text-slate-400 uppercase font-black">Email</label>
                                            <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none transition-all font-bold text-slate-900" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] tracking-widest text-slate-400 uppercase font-black">Role / Position</label>
                                            <input type="text" value={editFormData.role} onChange={e => setEditFormData({...editFormData, role: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none transition-all font-bold text-slate-900" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] tracking-widest text-slate-400 uppercase font-black">Dept</label>
                                                <input type="text" value={editFormData.department} onChange={e => setEditFormData({...editFormData, department: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none transition-all font-bold text-slate-900" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] tracking-widest text-slate-400 uppercase font-black">Year</label>
                                                <input type="text" value={editFormData.year} onChange={e => setEditFormData({...editFormData, year: e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none transition-all font-bold text-slate-900" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-[10px] tracking-widest text-slate-400 uppercase font-black">Bio</label>
                                            <textarea value={editFormData.bio} onChange={e => setEditFormData({...editFormData, bio: e.target.value})} rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:border-slate-900 outline-none transition-all resize-none text-slate-600 font-medium" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-slate-50">
                                    <button type="submit" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-display text-[11px] tracking-[0.4em] uppercase font-black hover:bg-black transition-all shadow-xl shadow-slate-200">COMMIT UPDATES</button>
                                    <button type="button" onClick={() => setEditingRequest(null)} className="px-10 py-5 border border-slate-100 text-slate-400 font-black tracking-widest text-[11px] uppercase hover:bg-slate-50 rounded-2xl transition-all">DISCARD</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {activeTab === 'requests' ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <StatCard icon={Users} label="Total Members" value={requests.length} />
                            <StatCard icon={Clock} label="Pending" value={requests.filter(r => r.status === 'pending').length} />
                            <StatCard icon={CheckCircle} label="Approved" value={requests.filter(r => r.status === 'approved').length} />
                            <StatCard icon={XCircle} label="Rejected" value={requests.filter(r => r.status === 'rejected').length} />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5 mb-10 justify-between items-center relative z-10">
                            <div className="flex gap-2">
                                {['all', 'pending', 'approved', 'rejected'].map(f => (
                                    <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-xl text-[9px] tracking-widest uppercase font-black transition-all border ${filter === f ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-600'}`}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:w-80">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input type="text" placeholder="Search entries..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-xs outline-none focus:border-slate-400/30 transition-all font-medium text-slate-900 shadow-xl shadow-slate-200/50" />
                                </div>
                                <div className="flex bg-white border border-slate-100 rounded-2xl overflow-hidden p-1 shadow-xl shadow-slate-200/50">
                                    <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-300'}`}><LayoutGrid size={18} /></button>
                                    <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-300'}`}><List size={18} /></button>
                                </div>
                            </div>
                        </div>

                        {loading ? <div className="py-32 text-center text-slate-200"><RefreshCw size={40} className="animate-spin mx-auto mb-4" /><p className="text-[10px] tracking-widest uppercase font-black">Syncing...</p></div> : (
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

    if (checking) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-300"><RefreshCw className="animate-spin" /></div>;
    if (!verified) return <LoginScreen onLogin={t => { setToken(t); setVerified(true); }} />;
    return <AdminDashboard token={token} onLogout={() => { sessionStorage.removeItem('ivc_admin_token'); setVerified(false); }} />;
};

export default AdminPage;
