import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const Team = () => {
    const members = [
        { name: 'Member Name', role: 'President', initials: 'MN' },
        { name: 'Member Name', role: 'Vice President', initials: 'MN' },
        { name: 'Member Name', role: 'Technical Lead', initials: 'MN' },
        { name: 'Member Name', role: 'Design Lead', initials: 'MN' },
    ];

    return (
        <section className="relative py-32 md:py-48 overflow-hidden ">
            {/* Watermark */}
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">TEAM</div>

            {/* Ambient glow */}
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header - massive TechSolstice style */}
                <motion.div {...fadeUp()} className="text-center mb-20">
                    <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase mb-4">
                        THE <span className="text-cyan-400 text-glow-cyan">TEAM</span>
                    </h2>
                    <div className="h-[2px] w-16 bg-cyan-400/50 mx-auto mb-6" />
                    <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                        The passionate innovators driving IVC forward
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp(0.1 + i * 0.08)}
                            className="glow-card rounded-2xl p-8 text-center group cursor-pointer relative overflow-hidden"
                        >
                            {/* Number */}
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center">
                                <span className="font-display text-[10px] text-white/30">{String(i + 1).padStart(2, '0')}</span>
                            </div>

                            {/* Avatar */}
                            <div className="relative mx-auto mb-6 w-24 h-24">
                                <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/30 transition-all duration-500">
                                    <span className="font-display text-2xl font-black text-white/30 group-hover:text-cyan-400/40 transition-colors duration-500">
                                        {member.initials}
                                    </span>
                                </div>
                                {/* Glow ring on hover */}
                                <div className="absolute inset-[-4px] rounded-full border border-cyan-400/0 group-hover:border-cyan-400/20 transition-all duration-500" />
                            </div>

                            <h3 className="font-display text-sm md:text-base font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase mb-2">
                                {member.name}
                            </h3>

                            {/* Role badge */}
                            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/10 bg-cyan-400/5 mt-2">
                                <span className="font-display text-[9px] tracking-[0.2em] text-cyan-400/60 uppercase">
                                    {member.role}
                                </span>
                            </div>

                            {/* Social links on hover */}
                            <div className="flex justify-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/20 transition-all">
                                    <Linkedin size={13} />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/20 transition-all">
                                    <Github size={13} />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-400/20 transition-all">
                                    <Mail size={13} />
                                </a>
                            </div>

                            {/* Bottom line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;


