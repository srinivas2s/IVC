import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

/* ─── Mentor Card (large glassmorphism style inspired by reference) ─── */
const MentorCard = ({ member }) => (
    <div className="relative w-[300px] md:w-[380px] flex-shrink-0">
        {/* Outer glow border */}
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent" />
        <div className="relative rounded-2xl bg-[#0a0e1a]/80 backdrop-blur-xl border border-white/[0.06] p-8 md:p-10 flex flex-col items-center text-center overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            {/* Subtle top-left ambient glow */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[radial-gradient(circle,rgba(34,211,238,0.04)_0%,transparent_70%)] pointer-events-none" />

            {/* Avatar circle */}
            <div className="relative mb-8 w-28 h-28 md:w-32 md:h-32">
                <div className="w-full h-full rounded-full bg-white/[0.02] border border-white/[0.08] flex items-center justify-center">
                    {/* Person silhouette icon */}
                    <svg className="w-16 h-16 md:w-20 md:h-20 text-white/[0.12]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M5.5 20.5c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* Name */}
            <h3 className="font-display text-base md:text-lg font-black tracking-wider text-white uppercase mb-2">
                {member.name}
            </h3>

            {/* Role badge */}
            <div className="inline-block px-5 py-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 mb-6">
                <span className="font-display text-[9px] md:text-[10px] tracking-[0.25em] text-cyan-400/50 uppercase">
                    {member.role}
                </span>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-blue-500 hover:border-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-500">
                    <Linkedin size={14} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500">
                    <Github size={14} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-red-500 hover:border-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-500">
                    <Mail size={14} />
                </a>
            </div>
        </div>
    </div>
);

const Team = () => {
    const mentors = [
        { name: 'Dr. John Doe', role: 'MENTOR', initials: 'JD' },
        { name: 'Prof. Jane Smith', role: 'MENTOR', initials: 'JS' }
    ];

    const teamMembers = [
        { name: 'Alice Cooper', role: 'PRESIDENT', initials: 'AC' },
        { name: 'Bob Singer', role: 'VICE PRESIDENT', initials: 'BS' },
        { name: 'Charlie Day', role: 'TECH LEAD', initials: 'CD' },
        { name: 'Diana Prince', role: 'DESIGN LEAD', initials: 'DP' }
    ];

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    /* ─── Sticky scroll ref & transforms ─── */
    const stickyRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: stickyRef,
        offset: ["start start", "end end"]
    });

    // Title fades in during 0-15%
    const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.12], [60, 0]);

    // Card 1: appears centered (12-22%), then slides left (30-55%)
    const card1Opacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);
    const card1Scale = useTransform(scrollYProgress, [0.12, 0.22], [0.85, 1]);
    const slideOffset = isMobile ? 170 : 210;
    const card1X = useTransform(scrollYProgress, [0.30, 0.55], [0, -slideOffset]);

    // Card 2: slides in from right (35-55%)
    const card2Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const card2Scale = useTransform(scrollYProgress, [0.35, 0.55], [0.85, 1]);
    const card2X = useTransform(scrollYProgress, [0.35, 0.55], [300, 0]);

    const renderGrid = (people) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {people.map((member, i) => (
                <motion.div
                    key={i}
                    {...fadeUp(0.1 + i * 0.08)}
                    className="glow-card rounded-2xl p-8 text-center group cursor-pointer relative overflow-hidden"
                >
                    {/* Avatar */}
                    <div className="relative mx-auto mb-6 w-24 h-24">
                        <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/30 transition-all duration-500">
                            <span className="font-display text-2xl font-black text-white/30 group-hover:text-cyan-400/40 transition-colors duration-500">
                                {member.initials}
                            </span>
                        </div>
                        <div className="absolute inset-[-4px] rounded-full border border-cyan-400/0 group-hover:border-cyan-400/20 transition-all duration-500" />
                    </div>

                    <h3 className="font-display text-sm md:text-base font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase mb-2">
                        {member.name}
                    </h3>

                    <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/10 bg-cyan-400/5 mt-2">
                        <span className="font-display text-[9px] tracking-[0.2em] text-cyan-400/60 uppercase whitespace-nowrap">
                            {member.role}
                        </span>
                    </div>

                    <div className="flex justify-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <a href="#" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-blue-500 hover:border-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-500">
                            <Linkedin size={14} />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500">
                            <Github size={14} />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-red-500 hover:border-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-500">
                            <Mail size={14} />
                        </a>
                    </div>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
        </div>
    );

    return (
        <>
            {/* ═══════════ MENTORS – Sticky Scroll-Locked Section ═══════════ */}
            <div ref={stickyRef} className="relative" style={{ height: '300vh' }}>
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    {/* Background – transparent to blend seamlessly with body */}

                    {/* Ambient glows */}
                    <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(34,211,238,0.025)_0%,transparent_70%)] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.025)_0%,transparent_70%)] rounded-full pointer-events-none" />

                    {/* Watermark */}
                    <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.015 }}>MENTORS</div>

                    {/* Title */}
                    <motion.div
                        style={{ opacity: titleOpacity, y: titleY }}
                        className="absolute top-[10vh] md:top-[12vh] left-0 right-0 text-center z-10 px-4"
                    >
                        <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black tracking-wider uppercase mb-4">
                            MEET OUR <span className="text-cyan-400 text-glow-cyan">MENTORS</span>
                        </h2>
                        <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                            The visionaries guiding IVC
                        </p>
                    </motion.div>

                    {/* Cards Container – centered horizontally */}
                    <div className="relative z-10 flex items-center justify-center gap-6 md:gap-10 mt-12">
                        {/* Card 1 */}
                        <motion.div
                            style={{
                                opacity: card1Opacity,
                                scale: card1Scale,
                                x: card1X,
                            }}
                        >
                            <MentorCard member={mentors[0]} />
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            className="absolute"
                            style={{
                                opacity: card2Opacity,
                                scale: card2Scale,
                                x: card2X,
                                left: isMobile ? '10px' : '200px',
                            }}
                        >
                            <MentorCard member={mentors[1]} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ═══════════ TEAM MEMBERS – Normal Scroll Section ═══════════ */}
            <section className="relative py-32 md:py-48 overflow-hidden">
                {/* Ambient background glows */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* TEAM SECTION */}
                    <div className="relative">
                        {/* Watermark for Team Section */}
                        <div className="watermark top-0 left-1/2 -translate-x-1/2 -translate-y-1/20">TEAM</div>

                        <motion.div {...fadeUp()} className="relative z-10 text-center mb-16">
                            <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-black tracking-wider uppercase mb-4">
                                MEET OUR <span className="text-cyan-400 text-glow-cyan">TEAM</span>
                            </h2>
                            <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                                The passionate innovators driving IVC forward
                            </p>
                        </motion.div>

                        {renderGrid(teamMembers)}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Team;
