import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Trophy, Users, BookOpen, Layers } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

// Animated counter
const Counter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started) {
                setStarted(true);
                const end = parseInt(target);
                if (end === 0) { setCount(0); return; }
                let current = 0;
                const step = Math.max(1, Math.floor(end / 60));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= end) { setCount(end); clearInterval(timer); }
                    else setCount(current);
                }, 25);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, started]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const Achievements = () => {
    const stats = [
        { value: '2', label: 'HACKATHONS WON', icon: Trophy, highlight: true },
        { value: '50', suffix: '+', label: 'ACTIVE MEMBERS', icon: Users },
        { value: '10', suffix: '+', label: 'WORKSHOPS', icon: BookOpen },
        { value: '6', label: 'ACTIVE DOMAINS', icon: Layers },
    ];

    return (
        <section className="relative py-32 md:py-48 overflow-hidden ">
            {/* Watermark */}
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">STATS</div>

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-cyan-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div {...fadeUp()} className="text-center mb-20">
                    <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase mb-4">
                        OUR <span className="text-cyan-400 text-glow-cyan">ACHIEVEMENTS</span>
                    </h2>
                    <div className="h-[2px] w-16 bg-cyan-400/50 mx-auto mb-6" />
                    <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                        Numbers that reflect our dedication to innovation
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                {...fadeUp(0.1 + i * 0.08)}
                                className="glow-card rounded-2xl p-8 md:p-10 text-center group cursor-pointer relative overflow-hidden"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-cyan-400/5 border border-cyan-400/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/25 transition-all duration-500">
                                    <Icon className="text-cyan-400/70" size={20} />
                                </div>

                                {/* Number */}
                                <div className={`font-display text-4xl md:text-6xl font-black mb-3 ${stat.highlight ? 'text-cyan-400 text-glow-cyan' : 'text-white'}`}>
                                    <Counter target={stat.value} suffix={stat.suffix || ''} />
                                </div>

                                {/* Label */}
                                <div className="font-display text-[8px] md:text-[10px] tracking-[0.3em] text-white/25 uppercase">
                                    {stat.label}
                                </div>

                                {/* Bottom glow */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;


