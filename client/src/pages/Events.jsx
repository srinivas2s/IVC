import { motion } from 'framer-motion';
import { Github, Triangle, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';

const events = [
    {
        id: 1,
        title: "GitHub & Vercel Workshop",
        date: "TBA",
        time: "TBA",
        location: "IVC Innovation Lab",
        description: "Master the art of version control with GitHub and learn how to deploy lightning-fast web applications using Vercel. A hands-on session for all skill levels.",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
        type: "Workshop",
        gradient: "from-cyan-500/20 to-purple-500/20",
        isComingSoon: false
    }
];

const Events = () => {
    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col items-center mb-16 space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-ivc-primary"
                >
                    Stay Ahead
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-black text-center text-white tracking-tighter"
                >
                    UPCOMING <span className="text-gradient">EVENTS</span>
                </motion.h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex flex-col glass-card border-white/5 rounded-[48px] overflow-hidden hover:border-white/10 transition-all duration-700 h-[600px]"
                        >
                            {/* Image Section */}
                            <div className="h-[300px] relative overflow-hidden">
                                <motion.img
                                    src={event.image}
                                    alt={event.title}
                                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${event.isComingSoon ? 'grayscale brightness-50' : 'brightness-75'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-90"></div>

                                {/* Tags */}
                                <div className="absolute top-8 left-8 flex gap-3">
                                    <span className="px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/10 text-white text-[10px] font-black tracking-widest uppercase">
                                        {event.type}
                                    </span>
                                </div>

                                {/* Floating Icons */}
                                {event.title.includes("GitHub") && (
                                    <div className="absolute right-8 top-8 flex items-center gap-4">
                                        <div className="bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                                            <Github className="text-white w-6 h-6" />
                                        </div>
                                        <div className="bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform delay-75">
                                            <Triangle className="text-white w-6 h-6 fill-white" />
                                        </div>
                                    </div>
                                )}

                                {event.isComingSoon && (
                                    <div className="absolute right-8 top-8">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="bg-ivc-primary/20 backdrop-blur-xl p-4 rounded-full border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                                        >
                                            <Sparkles className="text-ivc-primary w-6 h-6" />
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-10 flex flex-col flex-grow relative bg-[#020408]/40 backdrop-blur-3xl">
                                {/* Glow Decoration */}
                                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${event.gradient} blur-[100px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700`}></div>

                                <span className="text-[10px] font-black text-ivc-primary uppercase tracking-[0.5em] mb-4 opacity-80 italic">
                                    {event.isComingSoon ? "The Next Horizon" : "Hands-on Workshop"}
                                </span>

                                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-ivc-secondary transition-colors duration-500 tracking-tight leading-tight uppercase italic flex items-center gap-3">
                                    {event.title}
                                </h3>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <Calendar className="w-4 h-4 text-white/60" />
                                        <span className="text-[11px] font-black uppercase tracking-widest">{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40">
                                        <Clock className="w-4 h-4 text-white/60" />
                                        <span className="text-[11px] font-black uppercase tracking-widest">{event.time}</span>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed mb-auto opacity-70 font-medium line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                    {!event.isComingSoon ? (
                                        <LiquidButton variant="primary" className="!px-8">
                                            Join Program
                                        </LiquidButton>
                                    ) : (
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic mb-1">Registration Opens Soon</span>
                                            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    animate={{ x: ["-100%", "100%"] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-1/2 h-full bg-ivc-primary/40"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <motion.div
                                        className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Sparkles className="w-5 h-5 text-white/40" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-16 text-center text-white/10 text-[10px] font-black uppercase tracking-[0.6em] italic"
            >
                Designed for the next generation of creators
            </motion.p>
        </div>
    );
};

export default Events;
