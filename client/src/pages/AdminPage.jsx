import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Users, CheckCircle, XCircle, Clock, Eye, Trash2,
    RefreshCw, LogIn, Lock, ArrowLeft, Search, LayoutGrid,
    List, Linkedin, Github, Mail, User, Camera, FileText,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_60%)] rounded-full" />
                <div className="absolute inset-0 dot-matrix opacity-[0.02]" />
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md px-6">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-cyan-400" size={32} />
                    </div>
                    <h1 className="font-display text-3xl font-black tracking-wider uppercase mb-2">ADMIN PANEL</h1>
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
    <div className="glow-card p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${color}-400/5 border border-${color}-400/10`}>
                <Icon size={20} className={`text-${color}-400`} />
            </div>
            <div>
                <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase">{label}</p>
                <p className="text-2xl font-black text-white mt-1">{value}</p>
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════
   REQUEST CARD (MEMBERS)
   ═══════════════════════════════════════ */
const RequestCard = ({ request, onApprove, onReject, onDelete, viewMode }) => {
    const [expanded, setExpanded] = useState(false);
    const s = {
        pending: { bg: 'bg-amber-400/5', border: 'border-amber-400/20', text: 'text-amber-400', icon: Clock },
        approved: { bg: 'bg-emerald-400/5', border: 'border-emerald-400/20', text: 'text-emerald-400', icon: CheckCircle },
        rejected: { bg: 'bg-red-400/5', border: 'border-red-400/20', text: 'text-red-400', icon: XCircle }
    }[request.status] || { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white', icon: Clock };
    const StatusIcon = s.icon;

    if (viewMode === 'list') {
        return (
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] overflow-hidden">
                        {request.photoUrl ? <img src={request.photoUrl} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 opacity-10" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-display text-xs font-bold text-white uppercase">{request.name}</h4>
                        <p className="text-white/30 text-[10px] mt-0.5">{request.email}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full ${s.bg} border ${s.border} text-[8px] ${s.text} uppercase flex items-center gap-1`}>
                        <StatusIcon size={8} /> {request.status}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setExpanded(!expanded)} className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white"><Eye size={14} /></button>
                        {request.status === 'pending' && (
                            <>
                                <button onClick={() => onApprove(request.id)} className="w-8 h-8 rounded-lg border border-emerald-400/20 text-emerald-400 flex items-center justify-center"><CheckCircle size={14} /></button>
                                <button onClick={() => onReject(request.id)} className="w-8 h-8 rounded-lg border border-red-400/20 text-red-400 flex items-center justify-center"><XCircle size={14} /></button>
                            </>
                        )}
                        <button onClick={() => onDelete(request.id)} className="w-8 h-8 rounded-lg border border-white/[0.06] text-white/20 hover:text-red-400 flex items-center justify-center"><Trash2 size={14} /></button>
                    </div>
                </div>
                <AnimatePresence>
                    {expanded && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/[0.04] bg-black/20 p-4 grid grid-cols-2 gap-4">
                            <div><p className="text-[8px] text-white/30 uppercase">Email</p><p className="text-xs text-white/60">{request.email}</p></div>
                            <div><p className="text-[8px] text-white/30 uppercase">Submitted</p><p className="text-xs text-white/60">{new Date(request.submittedAt).toLocaleDateString()}</p></div>
                            <div className="col-span-2 flex gap-3">
                                {request.linkedin && <a href={request.linkedin} className="text-white/20 hover:text-blue-400"><Linkedin size={14} /></a>}
                                {request.github && <a href={request.github} className="text-white/20 hover:text-white"><Github size={14} /></a>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    return (
        <motion.div layout className="glow-card p-6 rounded-2xl border border-white/[0.06] text-center">
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
                    <button onClick={() => onDelete(request.id)} className="flex-1 py-2.5 rounded-lg border border-white/[0.06] text-white/30 text-[10px] uppercase hover:text-red-400 transition-colors">Delete</button>
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

    const handleAdd = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(k => data.append(k, formData[k]));
        if (photo) data.append('photo', photo);

        try {
            const res = await fetch('/api/admin/mentors', {
                method: 'POST',
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
            if (res.ok) fetchMentors();
        } catch (e) { console.error(e); }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="font-display text-[11px] tracking-[0.3em] text-white/40 uppercase">MANAGE MENTORS</h3>
                <button onClick={() => setShowForm(!showForm)} className="px-5 py-2 rounded-xl bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[10px] uppercase font-display tracking-widest hover:bg-cyan-400/10 transition-all">
                    {showForm ? 'CANCEL' : 'ADD NEW MENTOR'}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <form onSubmit={handleAdd} className="glow-card p-6 md:p-8 rounded-2xl border border-white/[0.06] space-y-6">
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
                        <button
                            onClick={() => handleDelete(m.id)}
                            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                            <Trash2 size={14} />
                        </button>

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
   ADMIN DASHBOARD
   ═══════════════════════════════════════ */
const AdminDashboard = ({ token, onLogout }) => {
    const [activeTab, setActiveTab] = useState('requests');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid');
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

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/admin/requests/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) fetchRequests();
        } catch (e) { console.error(e); }
    };

    const filtered = requests
        .filter(r => filter === 'all' || r.status === filter)
        .filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#02040a] text-white">
            <nav className="border-b border-white/[0.06] bg-[#02040a]/80 backdrop-blur-xl sticky top-0 z-50">
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
                <div className="mb-10">
                    <h1 className="font-display text-3xl font-black uppercase mb-2">
                        {activeTab === 'requests' ? 'MEMBER REQUESTS' : 'MENTOR MANAGEMENT'}
                    </h1>
                    <div className="flex gap-6 border-b border-white/5 mt-8">
                        {['requests', 'mentors'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 px-1 text-[10px] tracking-widest uppercase relative transition-all ${activeTab === tab ? 'text-cyan-400' : 'text-white/30 hover:text-white/60'}`}>
                                {tab} {activeTab === tab && <motion.div layoutId="t" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />}
                            </button>
                        ))}
                    </div>
                </div>

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
                                    <RequestCard key={r.id} request={r} viewMode={viewMode} onApprove={id => handleAction(id, 'approve')} onReject={id => handleAction(id, 'reject')} onDelete={handleDelete} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <MentorManager token={token} />
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
