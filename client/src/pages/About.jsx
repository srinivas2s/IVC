import { motion } from 'framer-motion';
import { Lightbulb, Zap, Rocket } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const About = () => {
    const pillars = [
        { icon: Lightbulb, title: "IDEATE", desc: "Capturing the wildest ideas and refining them into feasible solutions for technical and social challenges.", color: "cyan" },
        { icon: Zap, title: "VISUALIZE", desc: "Prototyping and designing user experiences that bring concepts to life through digital and physical mediums.", color: "indigo" },
        { icon: Rocket, title: "CREATE", desc: "Shipping real products, hosting events, and executing projects that leave a lasting impact.", color: "purple" },
    ];

    const stats = [
        { value: "50+", label: "ACTIVE MEMBERS" },
        { value: "6", label: "DOMAINS" },
        { value: "2", label: "HACKATHONS WON" },
    ];

    return (
        <section className="relative py-32 md:py-48 overflow-hidden bg-blueprint">
            {/* Watermark */}
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">ABOUT</div>

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-cyan-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Two column about - TechSolstice style */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-32">
                    {/* Left - About the Institute */}
                    <motion.div {...fadeUp(0.1)}>
                        <h2 className="font-display text-2xl md:text-4xl font-black tracking-wider uppercase text-white mb-8">
                            About <span className="text-cyan-400">the Institute</span>
                        </h2>
                        <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium">
                            Vidyavardhaka College of Engineering, Mysuru — an autonomous institute affiliated to VTU, Belagavi.
                            We foster innovation, leadership, and teamwork, empowering students to become future-ready engineering professionals.
                        </p>
                    </motion.div>

                    {/* Right - About IVC */}
                    <motion.div {...fadeUp(0.2)}>
                        <h2 className="font-display text-2xl md:text-4xl font-black tracking-wider uppercase text-white mb-8">
                            About <span className="text-cyan-400">IVC</span>
                        </h2>
                        <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium">
                            The Innovation & Value Creation Club is a community dedicated to fostering innovation, creativity, and technical
                            excellence among students. We bridge the gap between academic theory and real-world impact through hands-on projects,
                            workshops, and hackathons.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Row - TechSolstice style with large numbers */}
                <div className="grid grid-cols-3 gap-8 mb-32 border-y border-white/5 py-12 md:py-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp(0.1 + i * 0.1)}
                            className="text-center"
                        >
                            <div className={`font-display text-4xl md:text-7xl font-black ${i === 1 ? 'text-cyan-400 text-glow-cyan' : 'text-white'} mb-2`}>
                                {stat.value}
                            </div>
                            <div className="font-display text-[9px] md:text-[11px] tracking-[0.3em] text-white/30 uppercase">
                                {stat.label}
                            </div>
                        </motion.div>
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
                            <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* The Three Pillars - massive header */}
                <motion.div {...fadeUp()} className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase mb-4">
                        THE <span className="text-cyan-400 text-glow-cyan">PILLARS</span>
                    </h2>
                    <div className="h-[2px] w-16 bg-cyan-400/50 mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={i}
                                {...fadeUp(0.1 + i * 0.1)}
                                className="glow-card rounded-2xl p-8 md:p-10 group cursor-pointer relative overflow-hidden"
                            >
                                {/* Number badge */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-lg border border-white/5 flex items-center justify-center">
                                    <span className="font-display text-xs text-white/20">{String(i + 1).padStart(2, '0')}</span>
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-cyan-400/5 border border-cyan-400/10 flex items-center justify-center mb-6 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-500">
                                    <Icon className="text-cyan-400" size={22} />
                                </div>

                                <h3 className="font-display text-xl md:text-2xl font-black tracking-wider text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    {pillar.title}
                                </h3>
                                <p className="text-white/30 text-sm leading-relaxed font-medium group-hover:text-white/50 transition-colors">
                                    {pillar.desc}
                                </p>

                                {/* Explore link */}
                                <div className="mt-8 font-display text-[10px] tracking-[0.3em] text-cyan-400/50 uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                    EXPLORE <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>

                                {/* Bottom glow */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
