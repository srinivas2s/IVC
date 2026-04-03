import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Triangle, Calendar, Clock, MapPin, X } from 'lucide-react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const fallbackEvents = [
    {
        id: 1,
        title: "GitHub & Vercel",
        fullTitle: "GitHub & Vercel Workshop",
        date: "Soon",
        time: "--",
        location: "Vidya Vardhaka College Of Engineering",
        description: "Master version control with GitHub and learn to deploy web applications using Vercel. A hands-on session for all skill levels.",
        image_url: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
        type: "Workshop"
    },
    {
        id: 2,
        title: "OpenCV",
        fullTitle: "OpenCV Vision Workshop",
        date: "Soon",
        time: "--",
        location: "Vidya Vardhaka College Of Engineering",
        description: "Dive into Computer Vision with OpenCV. Learn image processing, object detection, and the fundamentals of AI-driven vision.",
        image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
        type: "Workshop"
    }
];

const Events = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) setEvents(data);
                else setEvents(fallbackEvents);
            })
            .catch(() => setEvents(fallbackEvents));
    }, []);

    return (
        <section className="relative py-32 md:py-48 overflow-hidden ">
            {/* Watermark */}
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">EVENTS</div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header - TechSolstice massive style */}
                <motion.div {...fadeUp()} className="text-center mb-20">
                    <h2 className="font-display text-5xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase mb-4">
                        THE <span className="text-cyan-400 text-glow-cyan">EVENTS</span>
                    </h2>
                    <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                        Workshops, hackathons, and experiences that transform ideas into reality
                    </p>
                </motion.div>

                {/* Event Cards - Grid layout */}
                <div className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            layoutId={`card-${event.id}`}
                            {...fadeUp(0.1 + index * 0.1)}
                            onClick={() => setSelectedId(event.id)}
                            className={`glow-card rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/2 h-24 md:h-80 relative overflow-hidden">
                                <img
                                    src={event.image_url}
                                    alt={event.title}
                                    className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#060b18]/60 md:from-[#060b18] via-transparent to-transparent" />

                            </div>

                            {/* Content */}
                            <div className="w-full md:w-1/2 p-2 md:p-12 flex flex-col justify-center bg-white/[0.02] border-t md:border-t-0 border-white/5">
                                <span className="font-display text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.4em] text-cyan-400/60 uppercase mb-1 md:mb-4">
                                    {event.type}
                                </span>
                                <h3 className="font-display text-[8px] md:text-2xl lg:text-4xl font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase mb-1 md:mb-4 truncate">
                                    {event.title}
                                </h3>
                                <p className="hidden md:block text-white/50 text-sm leading-relaxed font-medium mb-6 max-w-md">
                                    {event.description}
                                </p>
                                <div className="flex items-center gap-1 md:gap-4 text-white/40">
                                    <Calendar size={8} className="md:w-[14px] md:h-[14px]" />
                                    <span className="font-display text-[6px] md:text-[10px] tracking-[0.1em] md:tracking-[0.3em] uppercase">Soon</span>
                                </div>
                                <div className="mt-2 md:mt-6 font-display text-[6px] md:text-[10px] tracking-[0.1em] md:tracking-[0.3em] text-cyan-400/50 uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                                    EXPLORE
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal for Details */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-[#060b18]/90 backdrop-blur-xl"
                        />
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className="relative w-full max-w-2xl bg-[#0a1020] border border-cyan-400/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-cyan-400/30 transition-all"
                            >
                                <X size={18} />
                            </button>
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 h-56 md:h-auto relative">
                                    <img src={events.find(e => e.id === selectedId).image_url} alt="Event" className="w-full h-full object-cover brightness-[0.5]" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1020] via-transparent to-transparent hidden md:block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020] to-transparent md:hidden" />
                                </div>
                                <div className="p-8 md:p-10 md:w-1/2 flex flex-col">
                                    <span className="font-display text-[9px] tracking-[0.4em] text-cyan-400/60 uppercase mb-4">
                                        {events.find(e => e.id === selectedId).type}
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-black tracking-wider text-white mb-6 uppercase">
                                        {events.find(e => e.id === selectedId).fullTitle}
                                    </h3>
                                    <div className="space-y-3 mb-8">
                                        {[
                                            { icon: Calendar, text: events.find(e => e.id === selectedId).date },
                                            { icon: Clock, text: events.find(e => e.id === selectedId).time },
                                            { icon: MapPin, text: events.find(e => e.id === selectedId).location },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-white/50">
                                                <item.icon size={14} className="text-cyan-400/50" />
                                                <span className="font-display text-[10px] tracking-[0.2em] uppercase">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed font-medium mb-auto">
                                        {events.find(e => e.id === selectedId).description}
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <button className="font-display text-[10px] tracking-[0.3em] text-cyan-400 uppercase hover:text-white transition-colors">
                                            REGISTER NOW
                                        </button>
                                        <div className="flex gap-2">
                                            {events.find(e => e.id === selectedId).title.includes("GitHub") && (
                                                <>
                                                    <Github className="text-white/40 w-4 h-4" />
                                                    <Triangle className="text-white/40 w-4 h-4 fill-white/20" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Events;


