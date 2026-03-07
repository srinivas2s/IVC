import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Zap, Rocket } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const About = () => {
    const pillarsRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: pillarsRef,
        offset: ["start end", "end start"]
    });

    // Sequential animations for pillars based on scroll
    const pillar1Scale = useTransform(scrollYProgress, [0.1, 0.25], [0.8, 1]);
    const pillar1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

    const pillar2Scale = useTransform(scrollYProgress, [0.4, 0.55], [0.8, 1]);
    const pillar2Opacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

    const pillar3Scale = useTransform(scrollYProgress, [0.7, 0.85], [0.8, 1]);
    const pillar3Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

    const scales = [pillar1Scale, pillar2Scale, pillar3Scale];
    const opacities = [pillar1Opacity, pillar2Opacity, pillar3Opacity];

    // Horizontal movement for the sticky section
    const horizontalX = useTransform(scrollYProgress, [0.3, 0.9], ["0%", "-100%"]);

    const pillars = [
        { icon: Lightbulb, title: "IDEATE", desc: "Capturing the wildest ideas and refining them into feasible solutions for technical and social challenges.", color: "cyan" },
        { icon: Zap, title: "VISUALIZE", desc: "Prototyping and designing user experiences that bring concepts to life through digital and physical mediums.", color: "indigo" },
        { icon: Rocket, title: "CREATE", desc: "Shipping real products, hosting events, and executing projects that leave a lasting impact.", color: "purple" },
    ];

    const stats = [
        { value: "30", label: "ACTIVE MEMBERS" },
        { value: "6", label: "DOMAINS" },
        { value: "2", label: "HACKATHONS WON" },
    ];

    return (
        <section className="relative py-32 md:py-48 overflow-hidden">
            {/* Removed grid and watermark for 'full dark' effect */}

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Three column about - Unified technical vision */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mb-32">
                    {/* Left - About the Institute */}
                    <motion.div {...fadeUp(0.1)}>
                        <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider uppercase text-white mb-6">
                            About <span className="text-cyan-400 text-glow-cyan">Institute</span>
                        </h2>
                        <p className="text-white/60 text-[13px] md:text-sm leading-relaxed font-medium">
                            Vidyavardhaka College of Engineering, Mysuru — an autonomous institute affiliated to VTU, Belagavi.
                            We foster innovation, leadership, and teamwork, empowering students to become future-ready engineering professionals.
                        </p>
                    </motion.div>

                    {/* Middle - About IVC */}
                    <motion.div {...fadeUp(0.2)}>
                        <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider uppercase text-white mb-6">
                            About <span className="text-cyan-400 text-glow-cyan">IVC</span>
                        </h2>
                        <p className="text-white/60 text-[13px] md:text-sm leading-relaxed font-medium">
                            The Innovators & Visionaries Club is a community dedicated to fostering innovation, creativity, and technical
                            excellence among students. We bridge the gap between academic theory and real-world impact through hands-on projects.
                        </p>
                    </motion.div>

                    {/* Right - About Unity */}
                    <motion.div {...fadeUp(0.3)}>
                        <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider uppercase text-white mb-6">
                            About <span className="text-cyan-400 text-glow-cyan">InUnity</span>
                        </h2>
                        <p className="text-white/60 text-[13px] md:text-sm leading-relaxed font-medium">
                            InUnity is a platform that bridges the gap between academics and skills where talents—engineers, designers, and visionaries—to build
                            seamless integrated ecosystems. We believe that true value is created when individual brilliance converges into a unified force.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Row - TechSolstice style with vertical separators */}
                <div className="flex flex-row justify-between items-center mb-32 border-y border-white/5 py-12 md:py-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex-1 flex items-center">
                            <motion.div
                                {...fadeUp(0.1 + i * 0.1)}
                                className="text-center w-full relative"
                            >
                                {i === 1 && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/10 blur-[40px] rounded-full pointer-events-none" />
                                )}
                                <div className={`relative font-display text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent text-glow-cyan mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="font-display text-[9px] md:text-[11px] tracking-[0.3em] text-white/50 uppercase">
                                    {stat.label}
                                </div>
                            </motion.div>
                            {i < stats.length - 1 && (
                                <div className="h-16 w-[1px] bg-white/[0.08]" />
                            )}
                        </div>
                    ))}
                </div>
                {/* Mission & Vision */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-32">
                    {[
                        {
                            title: "OUR MISSION",
                            text: "To promote hands-on innovation, multidisciplinary collaboration, industry connection, and community-driven impact while building future-ready leaders."
                        },
                        {
                            title: "OUR VISION",
                            text: "To nurture a generation of creators who apply science, technology, and design thinking to build solutions that positively impact people, planet, and prosperity."
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp(0.1 + i * 0.1)}
                            whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: 2 }}
                            whileTap={{ scale: 0.98 }}
                            className="glow-card rounded-xl md:rounded-2xl p-4 md:p-12 group cursor-pointer perspective-1000"
                        >
                            {/* Shimmer */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                            <h3 className="font-display text-xs md:text-2xl font-black tracking-wider text-white mb-2 md:mb-6 group-hover:text-cyan-400 transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-white/80 text-[10px] md:text-base leading-relaxed font-medium group-hover:text-white transition-colors line-clamp-4 md:line-clamp-none">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* The Three Pillars Grid */}
                <motion.div {...fadeUp()} className="text-center mb-16 mt-24">
                    <h2 className="font-display text-5xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase mb-4">
                        THE <span className="text-cyan-400 text-glow-cyan">PILLARS</span>
                    </h2>

                </motion.div>

                {/* Mobile One-Line Header for Pillars */}
                <div className="flex md:hidden items-center justify-center gap-4 mb-8 font-display text-[10px] tracking-[0.2em] text-cyan-400/60 uppercase">
                    <span>IDEATE</span>
                    <span className="w-1 h-1 rounded-full bg-cyan-400/20" />
                    <span>VISUALIZE</span>
                    <span className="w-1 h-1 rounded-full bg-cyan-400/20" />
                    <span>CREATE</span>
                </div>

                <div ref={pillarsRef} className="flex flex-row md:grid md:grid-cols-3 gap-6 md:gap-8 pb-32 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 md:px-0">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={i}
                                {...fadeUp(0.1 + i * 0.1)}
                                whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: 2 }}
                                whileTap={{ scale: 0.98 }}
                                className="glow-card rounded-2xl p-8 md:p-10 group cursor-pointer relative overflow-hidden perspective-1000 min-w-[85vw] md:min-w-0 snap-center"
                            >
                                {/* Shimmer */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>



                                <div className="w-16 h-16 rounded-2xl bg-cyan-400/5 border border-cyan-400/10 flex items-center justify-center mb-8 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-500 relative z-10">
                                    <Icon className="text-cyan-400" size={32} />
                                </div>

                                <h3 className="font-display text-2xl md:text-3xl font-black tracking-wider text-white mb-4 group-hover:text-cyan-400 transition-colors relative z-10">
                                    {pillar.title}
                                </h3>
                                <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium group-hover:text-white transition-colors relative z-10">
                                    {pillar.desc}
                                </p>

                                {/* Explore link */}
                                <div className="mt-8 font-display text-[10px] tracking-[0.3em] text-cyan-400/50 uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-2 relative z-10">
                                    EXPLORE <span className="group-hover:translate-x-2 transition-transform text-lg"></span>
                                </div>

                                {/* Bottom glow */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;


