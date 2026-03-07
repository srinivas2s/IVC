import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Mail, X, Info } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const formatRole = (role) => {
    if (!role) return 'MENTOR';
    const r = role.toUpperCase().trim();
    if (r === 'MEMBER' || r === 'ASSOCIATE' || r === 'ASSOSIATE') return 'ASSOCIATES';
    return r;
};

/* ─── Details Modal ─── */
const MentorModal = ({ member, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#0c0f18] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            onClick={e => e.stopPropagation()}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-cyan-400/20 p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white/[0.03] flex items-center justify-center overflow-hidden">
                        {member.photoUrl ? (
                            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-16 h-16 text-white/[0.1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="8" r="3.5" />
                                <path d="M5.5 20.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" strokeLinecap="round" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-[10px] font-black tracking-widest uppercase">
                            MENTOR
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tight mb-4">{member.name}</h2>
                    <p className="text-white/60 leading-relaxed mb-6 italic">"{member.quote || member.description}"</p>
                    <p className="text-white/40 text-sm mb-8">{member.other_info || member.department}</p>

                    <div className="flex gap-4">
                        {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"><Linkedin size={18} /></a>}
                        {member.email && <a href={`mailto:${member.email}`} className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-red-500 transition-all"><Mail size={18} /></a>}
                    </div>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

/* ─── Photo Card ─── */
const PhotoCard = ({ member, isFinal = false }) => (
    <div className={`relative w-[320px] md:w-[380px] h-[300px] md:h-[450px] flex-shrink-0 group overflow-visible`}>
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent group-hover:from-cyan-400/30 transition-all duration-700" />
        <div className="relative w-full h-full rounded-xl bg-[#0c0f18] border border-white/[0.05] flex flex-col items-center justify-end overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {member.photoUrl ? (
                    <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-80"
                    />
                ) : (
                    <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                        <svg className="w-24 h-24 text-white/[0.05]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M5.5 20.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" strokeLinecap="round" />
                        </svg>
                    </div>
                )}
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f18] via-[#0c0f18]/40 to-transparent" />
            </div>

            <div className="relative z-10 text-center px-6 pb-10 w-full">
                <span className="font-display text-[9px] md:text-[11px] tracking-[0.4em] text-cyan-400 text-glow-cyan uppercase">
                    {formatRole(member.role)}
                </span>
                {isFinal && (
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-white font-black italic text-xl md:text-2xl tracking-wider uppercase opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                        {member.name}
                    </motion.h3>
                )}

                {isFinal && (
                    <div className="mt-4 flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 transition-all"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <Mail size={18} />
                                </a>
                            )}
                        </div>

                        {/* Details Hint */}
                        <span className="flex items-center gap-2 text-[10px] text-cyan-400/80 font-black tracking-widest uppercase bg-cyan-400/10 px-3 py-1.5 rounded-full border border-cyan-400/20">
                            <Info size={12} /> Click for details
                        </span>
                    </div>
                )}
            </div>
        </div>
    </div>
);

/* ─── Info Card (Used during reveal) ─── */
const InfoCard = ({ member, position = "right" }) => (
    <div className="relative w-[320px] md:w-[420px] h-[300px] md:h-[380px] flex-shrink-0">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent" />
        <div className="relative w-full h-full rounded-xl bg-[#0c0f18]/90 backdrop-blur-xl border border-white/[0.05] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className={`absolute top-0 ${position === 'right' ? 'right-0' : 'left-0'} w-40 h-40 bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_70%)] pointer-events-none`} />
            <div>
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    <span className="font-display text-[9px] md:text-[10px] tracking-[0.3em] text-cyan-400/50 uppercase">
                        IVC · {formatRole(member.role)}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-5 leading-tight italic">
                    {member.name}
                </h3>
                <p className="text-white/40 text-[13px] md:text-sm leading-relaxed mb-3 line-clamp-4">
                    {member.bio || member.description}
                </p>
                {(member.department || member.other_info || member.year) && (
                    <p className="text-white/25 text-xs leading-relaxed">
                        {member.department || member.other_info} {member.year && `· ${member.year}`}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                <div className="flex gap-3">
                    {member.linkedin && <Linkedin size={15} className="text-white/20" />}
                    {member.github && <Github size={15} className="text-white/20" />}
                    {member.email && <Mail size={15} className="text-white/20" />}
                </div>
            </div>
        </div>
    </div>
);

const Team = () => {
    const [dynamicMembers, setDynamicMembers] = useState([]);
    const [fetchedMentors, setFetchedMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMentor, setSelectedMentor] = useState(null);

    const fallbackMentors = [
        {
            name: 'Dr. John Doe',
            role: 'MENTOR',
            quote: 'A visionary mentor shaping the future of technology and innovation at IVC.',
            other_info: 'Dept. of CSE, VVCE',
            linkedin: '#', email: 'johndoe@vvce.ac.in'
        },
        {
            name: 'Prof. Jane Smith',
            role: 'MENTOR',
            quote: 'Guiding students to bridge the gap between academic theory and real-world impact.',
            other_info: 'Dept. of ISE, VVCE',
            linkedin: '#', email: 'janesmith@vvce.ac.in'
        }
    ];

    const staticTeam = [
        { name: 'Alice Cooper', role: 'PRESIDENT', initials: 'AC' },
        { name: 'Bob Singer', role: 'VICE PRESIDENT', initials: 'BS' },
        { name: 'Charlie Day', role: 'TECH LEAD', initials: 'CD' },
        { name: 'Diana Prince', role: 'DESIGN LEAD', initials: 'DP' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [memRes, mentRes] = await Promise.all([
                    fetch('/api/approved-members'),
                    fetch('/api/mentors')
                ]);
                const memData = await memRes.json();
                const mentData = await mentRes.json();

                if (memData.members) setDynamicMembers(memData.members);
                if (Array.isArray(mentData)) setFetchedMentors(mentData);
            } catch (e) {
                console.error('Fetch error:', e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const ROLE_HIERARCHY = {
        'PRESIDENT': 1,
        'VICE PRESIDENT': 2,
        'SECRETARY': 3,
        'SECERETARY': 3,
        'TREASURER': 4,
        'TREASURERE': 4,
        'OPERATION LEAD': 5,
        'OPERATIONS LEAD': 5,
        'PROJECT LEAD': 6,
        'TECH LEAD': 6,
        'DESIGN LEAD': 7,
        'DOCUMENTATION LEAD': 8,
        'MARKETING LEAD': 9,
        'SOCIAL MEDIA HEAD': 10,
        'SOCIAL MEDIA LEAD': 10,
        'SOCIAL MIDEA LEAD': 10,
        'COMMUNICATION AND OUTREACH LEAD': 11,
        'COMMUNICATION AND OUTREACH': 11,
        'OUTREACH LEAD': 11,
        'ASSOCIATE': 12,
        'ASSOCIATES': 12,
        'ASSOSIATE': 12, // Handle typo in DB
        'MEMBER': 12 // Map to Associates rank
    };

    const mentors = fetchedMentors.length > 0 ? fetchedMentors : fallbackMentors;

    // Sort members based on hierarchy
    const allTeamMembers = [...(dynamicMembers.length > 0 ? dynamicMembers : staticTeam)].sort((a, b) => {
        const roleA = a.role?.toUpperCase().trim() || '';
        const roleB = b.role?.toUpperCase().trim() || '';

        const rankA = ROLE_HIERARCHY[roleA] || 99;
        const rankB = ROLE_HIERARCHY[roleB] || 99;

        if (rankA !== rankB) return rankA - rankB;
        return a.name.localeCompare(b.name); // Alphabetical if same rank
    });


    const renderGrid = (people) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {people.map((member, i) => (
                <motion.div
                    key={member.id || i}
                    {...fadeUp(0.1 + i * 0.08)}
                    className="relative h-[380px] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-cyan-400/30 transition-all duration-500 shadow-2xl"
                >
                    {/* Background Image / Full Card Style */}
                    <div className="absolute inset-0 z-0">
                        {member.photoUrl ? (
                            <img
                                src={member.photoUrl}
                                alt={member.name}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#0c0f18] flex items-center justify-center">
                                <span className="font-display text-4xl font-black text-white/5 group-hover:text-cyan-400/10 transition-colors">
                                    {member.initials || member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-center">
                        <div className="mb-4">
                            <span className="font-display text-[9px] tracking-[0.3em] text-cyan-400 text-glow-cyan uppercase">
                                {member.role}
                            </span>
                            <h3 className="font-display text-base md:text-lg font-black tracking-wider text-white uppercase italic mt-1 group-hover:text-glow-white transition-all">
                                {member.name}
                            </h3>
                        </div>

                        {/* Social Links on Hover */}
                        <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                                    <Linkedin size={16} />
                                </a>
                            )}
                            {member.github && (
                                <a href={member.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                                    <Github size={16} />
                                </a>
                            )}
                            {member.email && (
                                <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-500 transition-all">
                                    <Mail size={16} />
                                </a>
                            )}
                        </div>

                        {/* Bottom line accent */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <>
            <AnimatePresence>
                {selectedMentor && (
                    <MentorModal
                        member={selectedMentor}
                        onClose={() => setSelectedMentor(null)}
                    />
                )}
            </AnimatePresence>

            {/* ═══════ MENTORS ═══════ */}
            <section className="relative py-32 md:py-48 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.03)_0%,transparent_50%)]">
                <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.015 }}>MENTORS</div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black tracking-wider uppercase mb-4">
                            MEET OUR <span className="text-cyan-400 text-glow-cyan">MENTORS</span>
                        </h2>
                        <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                            The visionaries guiding IVC
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                        {mentors.map((m, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.1)}
                                whileHover={{ y: -15 }}
                                className="cursor-pointer"
                                onClick={() => setSelectedMentor(m)}
                            >
                                <PhotoCard member={m} isFinal={true} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ TEAM MEMBERS — Normal scroll ═══════ */}
            <section className="relative py-32 md:py-48 overflow-hidden">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="relative">
                        <div className="watermark top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">TEAM</div>
                        <motion.div {...fadeUp()} className="relative z-10 text-center mb-16">
                            <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black tracking-wider uppercase mb-4">
                                MEET OUR <span className="text-cyan-400 text-glow-cyan">TEAM</span>
                            </h2>
                            <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                                {loading ? 'FETCHING INNOVATORS...' : 'The passionate innovators driving IVC forward'}
                            </p>
                        </motion.div>
                        {renderGrid(allTeamMembers)}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Team;
