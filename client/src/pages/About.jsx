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
        { value: "30+", label: "ACTIVE MEMBERS" },
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
                            About <span className="text-cyan-400 text-glow-cyan">the Institute</span>
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
                                className="text-center w-full"
                            >
                                <div className={`font-display text-4xl md:text-6xl lg:text-7xl font-black ${i === 1 ? 'text-cyan-400 text-glow-cyan' : 'text-white'} mb-2`}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
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
                            className="glow-card rounded-2xl p-8 md:p-12 group cursor-pointer"
                        >
                            {/* Shimmer */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                            <h3 className="font-display text-xl md:text-2xl font-black tracking-wider text-white mb-6 group-hover:text-cyan-400 transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* The Three Pillars - Sticky Sequential Transition Section */}
                <div ref={pillarsRef} className="relative h-[400vh]">
                    <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12 md:mb-16"
                        >
                            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase mb-4">
                                THE <span className="text-cyan-400 text-glow-cyan">PILLARS</span>
                            </h2>
                            <div className="h-[2px] w-16 bg-cyan-400/50 mx-auto" />
                        </motion.div>

                        <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
                            {pillars.map((pillar, i) => {
                                const Icon = pillar.icon;

                                // Define ranges for each card's center 'lock' and 'move'
                                // Phase 1: Card 1 center (0-20), moves left (20-35)
                                // Phase 2: Card 2 center (35-55), moves left (55-70)
                                // Phase 3: Card 3 center (70-90)

                                const startPos = i * 0.33;
                                const endPos = (i + 1) * 0.33;

                                // Precise movement logic to ensure center lock
                                // Card 1 is at 0, Card 2 at 100%, Card 3 at 200% initially relative to the 'stage'
                                // We shift the whole container or individual cards. 
                                // Let's shift individual cards for cleaner 'locking'.

                                const xOffset = useTransform(
                                    scrollYProgress,
                                    [startPos, startPos + 0.1, endPos - 0.1, endPos],
                                    [i === 0 ? "0%" : "150%", "0%", "0%", "-150%"]
                                );

                                const opacity = useTransform(
                                    scrollYProgress,
                                    [startPos, startPos + 0.1, endPos - 0.1, endPos],
                                    [0, 1, 1, 0]
                                );

                                const scale = useTransform(
                                    scrollYProgress,
                                    [startPos, startPos + 0.05, endPos - 0.05, endPos],
                                    [0.8, 1, 1, 0.8]
                                );

                                return (
                                    <motion.div
                                        key={i}
                                        style={{
                                            x: xOffset,
                                            opacity: opacity,
                                            scale: scale,
                                            position: 'absolute'
                                        }}
                                        className="glow-card rounded-3xl p-10 md:p-14 group cursor-pointer overflow-hidden w-[90vw] md:w-[600px] lg:w-[800px] max-w-4xl"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                                            <div className="shrink-0">
                                                <div className="w-20 h-20 rounded-2xl bg-cyan-400/5 border border-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-500">
                                                    <Icon className="text-cyan-400" size={40} />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="font-display text-sm tracking-[0.4em] text-cyan-400/40 uppercase">Pillar {String(i + 1).padStart(2, '0')}</span>
                                                    <div className="h-[1px] flex-1 mx-4 bg-white/5" />
                                                </div>

                                                <h3 className="font-display text-4xl md:text-6xl font-black tracking-wider text-white mb-6 group-hover:text-cyan-400 transition-colors">
                                                    {pillar.title}
                                                </h3>
                                                <p className="text-white/50 text-base md:text-xl leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                                                    {pillar.desc}
                                                </p>

                                                {/* Action link */}
                                                <div className="mt-10 font-display text-[12px] tracking-[0.4em] text-cyan-400/50 uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-3">
                                                    EXPLORE THE DOMAIN <span className="group-hover:translate-x-3 transition-transform text-lg">→</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom interactive glow */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;


