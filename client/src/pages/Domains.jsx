import { motion } from 'framer-motion';
import { Globe, Brain, Cpu, Briefcase, Palette, Bot } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const Domains = () => {
    const domains = [
        { title: 'Web Development', desc: 'Crafting high-performance, pixel-perfect digital experiences with modern web technologies.', icon: Globe },
        { title: 'AI & ML', desc: 'Building intelligent systems and exploring neural networks and data science.', icon: Brain },
        { title: 'IoT & Hardware', desc: 'Connecting the physical and digital worlds through smart electronics and systems.', icon: Cpu },
        { title: 'Entrepreneurship', desc: 'Nurturing the next generation of founders through business strategy and innovation.', icon: Briefcase },
        { title: 'UI/UX Design', desc: 'Designing intuitive, stunning interfaces that prioritize user experience.', icon: Palette },
        { title: 'Robotics', desc: 'Designing and building autonomous machines and robotic systems for future impact.', icon: Bot },
    ];

    return (
        <section className="relative py-32 md:py-48 overflow-hidden ">
            {/* Watermark */}
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">DOMAINS</div>

            {/* Ambient background glows */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />
            <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div {...fadeUp()} className="mb-20">
                    <h2 className="font-display text-5xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase mb-4">
                        OUR <span className="text-cyan-400 text-glow-cyan">DOMAINS</span>
                    </h2>
                    <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase max-w-xl">
                        Six specialized verticals where innovation meets execution
                    </p>
                </motion.div>

                {/* Domain Grid - TechSolstice staggered layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domains.map((domain, i) => {
                        const Icon = domain.icon;
                        return (
                            <motion.div
                                key={i}
                                {...fadeUp(0.05 + i * 0.06)}
                                className="glow-card rounded-2xl p-8 md:p-10 group cursor-pointer relative overflow-hidden"
                            >
                                {/* Number */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-lg border border-white/5 flex items-center justify-center">
                                    <span className="font-display text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                                </div>

                                {/* Shimmer on hover */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-cyan-400/5 border border-cyan-400/10 flex items-center justify-center mb-6 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/25 transition-all duration-500">
                                    <Icon className="text-cyan-400/70 group-hover:text-cyan-400 transition-colors" size={22} />
                                </div>

                                <h3 className="font-display text-lg md:text-xl font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase mb-4">
                                    {domain.title}
                                </h3>
                                <p className="text-white/25 text-sm leading-relaxed font-medium group-hover:text-white/45 transition-colors">
                                    {domain.desc}
                                </p>

                                <div className="mt-8 font-display text-[10px] tracking-[0.3em] text-cyan-400/40 uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                    EXPLORE <span className="group-hover:translate-x-1 transition-transform"></span>
                                </div>

                                {/* Bottom glow line */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Domains;


