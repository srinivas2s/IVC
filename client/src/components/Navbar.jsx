import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import logo from '../assets/logo.png';

const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Team', id: 'team' },
    { name: 'Events', id: 'events' },
    { name: 'Domains', id: 'domains' },
    { name: 'Projects', id: 'projects' },
    { name: 'Stats', id: 'achievements' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [visible, setVisible] = useState(true);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); setActiveSection(id); }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 150;
            for (const link of links) {
                const section = document.getElementById(link.id);
                if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Always-visible centered pill navbar */}
            <AnimatePresence>
                {visible && (
                    <motion.nav
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
                    >
                        <div className="flex items-center gap-0.5 bg-[#080d1c]/80 backdrop-blur-2xl border border-white/[0.06] rounded-full px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="relative px-3 md:px-4 py-2 rounded-full transition-all duration-300"
                                >
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-bg"
                                            className="absolute inset-x-0.5 inset-y-1 bg-white/5 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="pill-indicator"
                                            className="absolute -top-1.5 left-1/3 -translate-x-1/2 w-7 h-[4px] bg-white rounded-b-xl shadow-[0_0_10px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.6)] z-20"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 font-display text-[20px] md:text-[15px] font-bold tracking-wide transition-colors duration-300 ${activeSection === link.id ? 'text-white' : 'text-white/40 hover:text-white/70'
                                        }`}>
                                        {link.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            
        </>
    );
};

export default Navbar;
