import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Triangle, Calendar, Clock, MapPin, Sparkles, X, ChevronRight } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';

const events = [
    {
        id: 1,
        title: "GitHub & Vercel",
        fullTitle: "GitHub & Vercel Workshop",
        date: "TBA",
        time: "TBA",
        location: "IVC Innovation Lab",
        description: "Master version control with GitHub and learn to deploy web applications using Vercel. A hands-on session for all skill levels.",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
        type: "Workshop",
        gradient: "from-cyan-500/20 to-purple-500/20",
    },
    {
        id: 2,
        title: "OpenCV",
        fullTitle: "OpenCV Vision Workshop",
        date: "TBA",
        time: "TBA",
        location: "IVC Innovation Lab",
        description: "Dive into Computer Vision with OpenCV. Learn image processing, object detection, and the fundamentals of AI-driven vision.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
        type: "Workshop",
        gradient: "from-blue-500/20 to-emerald-500/20",
    }
];

const Events = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Header Section Section - Centered */}
            <div className="flex flex-col items-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-black text-center text-gradient tracking-normal uppercase italic py-2 overflow-visible"
                >
                    EVENTS
                </motion.h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Horizontal Workshop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        layoutId={`card-${event.id}`}
                        onClick={() => setSelectedId(event.id)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative h-64 glass-card border-white/5 rounded-[32px] overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-500"
                    >
                        <motion.img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <span className="text-[9px] font-black text-ivc-primary uppercase tracking-[0.4em] mb-2 opacity-80 italic">
                                {event.type}
                            </span>
                            <h3 className="text-xl font-black text-white group-hover:text-ivc-secondary transition-colors uppercase italic tracking-tighter">
                                {event.title}
                            </h3>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                                Coming Soon
                            </div>
                        </div>

                        {/* Hover Glow */}
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${event.gradient} blur-[50px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700`}></div>
                    </motion.div>
                ))}
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
                            className="absolute inset-0 bg-[#020408]/90 backdrop-blur-xl"
                        />

                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className="relative w-full max-w-2xl bg-[#080a0f] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-1/2 h-64 md:h-auto">
                                    <img
                                        src={events.find(e => e.id === selectedId).image}
                                        alt="Event"
                                        className="w-full h-full object-cover brightness-75"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#020408] via-transparent to-transparent hidden md:block" />
                                </div>

                                <div className="p-8 md:p-12 md:w-1/2 flex flex-col">
                                    <span className="text-[10px] font-black text-ivc-primary uppercase tracking-[0.5em] mb-4 italic">
                                        {events.find(e => e.id === selectedId).type}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">
                                        {events.find(e => e.id === selectedId).fullTitle}
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-4 text-white/50">
                                            <Calendar className="w-4 h-4 text-ivc-primary" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{events.find(e => e.id === selectedId).date}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/50">
                                            <Clock className="w-4 h-4 text-ivc-primary" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{events.find(e => e.id === selectedId).time}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/50">
                                            <MapPin className="w-4 h-4 text-ivc-primary" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{events.find(e => e.id === selectedId).location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-auto opacity-80 font-medium">
                                        {events.find(e => e.id === selectedId).description}
                                    </p>

                                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                        <motion.button
                                            whileHover={{ x: 10, color: '#fff' }}
                                            className="text-[11px] font-black text-ivc-primary uppercase tracking-[0.4em] italic flex items-center gap-3 transition-colors group"
                                        >
                                            REGISTER NOW
                                        </motion.button>

                                        <div className="flex gap-3">
                                            {events.find(e => e.id === selectedId).title.includes("GitHub") && (
                                                <>
                                                    <Github className="text-white/40 w-5 h-5" />
                                                    <Triangle className="text-white/40 w-5 h-5 fill-white/40" />
                                                </>
                                            )}
                                            <Sparkles className="w-5 h-5 text-ivc-primary opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Events;
