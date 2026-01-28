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
                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col md:flex-row bg-[#050505] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-ivc-primary hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] group"
                        >
                            <div className="md:w-auto relative min-w-[140px]">
                                <div className="absolute top-4 left-0 bg-ivc-primary text-white px-4 py-1 rounded-r-full font-bold text-sm shadow-lg shadow-ivc-primary/30 z-10">
                                    {event.date}
                                </div>
                                <div className="h-48 md:h-full md:w-full bg-gray-900">
                                    {/* Placeholder for event image if needed, or remove image to match 'list' style more closely if desired. Keeping image for now as per previous code structure but improved. */}
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-ivc-primary transition-colors">{event.title}</h3>
                                    <p className="text-gray-400 text-sm max-w-xl">{event.description}</p>
                                </div>
                                <button className="whitespace-nowrap px-6 py-2.5 bg-transparent border border-ivc-primary text-ivc-primary rounded-lg font-semibold hover:bg-ivc-primary hover:text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]">
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
