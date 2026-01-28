import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch events", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-ivc-text underline underline-offset-8 decoration-ivc-primary/30">Upcoming Events</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ivc-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group flex flex-col"
                        >
                            <div className="h-56 bg-gray-900 relative overflow-hidden">
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono border border-gray-700 text-gray-300 z-10">
                                    {event.date}
                                </div>
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold mb-3 text-ivc-dark-text group-hover:text-ivc-primary transition-colors">{event.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">{event.description}</p>
                                <button className="w-full py-2.5 bg-transparent border border-ivc-primary text-ivc-primary rounded-lg font-semibold hover:bg-ivc-primary hover:text-ivc-dark-text transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]">
                                    Register Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Events;
