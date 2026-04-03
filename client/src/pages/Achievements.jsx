import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Trophy, Users, BookOpen, Layers, Star, CheckCircle } from 'lucide-react';

const iconMap = { Trophy, Users, BookOpen, Layers, Star, CheckCircle };

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
    const fallbackStats = [
        { value: '2', label: 'HACKATHONS WON', icon: 'Trophy', highlight: true },
        { value: '30', label: 'ACTIVE MEMBERS', icon: 'Users' },
        { value: '0', label: 'WORKSHOPS', icon: 'BookOpen' },
        { value: '6', label: 'ACTIVE DOMAINS', icon: 'Layers' },
    ];

    const [stats, setStats] = useState([]);
    
    useEffect(() => {
        fetch('/api/achievements')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) setStats(data);
                else setStats(fallbackStats);
            })
            .catch(() => setStats(fallbackStats));
    }, []);

    return (
        <section className="relative py-32 md:py-48 overflow-hidden">
            {/* Watermark */}
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">STATS</div>

            {/* Heavy glowing background elements */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(99,102,241,0.03)_0%,transparent_70%)] rounded-full pointer-events-none will-change-transform" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div {...fadeUp()} className="text-center mb-20">
                    <h2 className="font-display text-5xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase mb-4">
                        OUR <span className="text-cyan-400 text-glow-cyan">ACHIEVEMENTS</span>
                    </h2>
                    <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                        Numbers that reflect our dedication to innovation
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => {
                        const Icon = iconMap[stat.icon] || iconMap['Trophy'];
                        return (
                            <motion.div
                                key={i}
                                {...fadeUp(0.1 + i * 0.08)}
                                className={`glow-card rounded-2xl p-8 md:p-10 text-center group cursor-pointer relative overflow-hidden ${stat.highlight ? 'border border-cyan-400/30' : ''}`}
                            >
                                {stat.highlight && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/10 blur-[40px] rounded-full pointer-events-none" />
                                )}
                                {/* Icon */}
                                <div className="relative z-10 w-12 h-12 rounded-xl bg-cyan-400/5 border border-cyan-400/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/25 transition-all duration-500">
                                    <Icon className="text-cyan-400/70" size={20} />
                                </div>

                                {/* Number */}
                                <div className={`relative z-10 font-display text-4xl md:text-6xl font-black mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent text-glow-cyan`}>
                                    <Counter target={stat.value} suffix={stat.suffix || ''} />
                                </div>

                                {/* Label */}
                                <div className="font-display text-[8px] md:text-[10px] tracking-[0.3em] text-white/40 uppercase">
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
