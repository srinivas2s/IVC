import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft } from 'lucide-react';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const links = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Domains', id: 'domains' },
        { name: 'Projects', id: 'projects' },
        { name: 'Events', id: 'events' },
        { name: 'Achievements', id: 'achievements' },
        { name: 'Team', id: 'team' },
        { name: 'Join IVC', id: 'join' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100; // Offset for navbar

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed left-1/2 -translate-x-1/2 z-50 top-6 w-[95%] max-w-7xl">
            {/* Main Navbar Bar - Hidden on mobile if menu is open */}
            <div className={`
                bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl items-center justify-between px-6 py-3 transition-opacity duration-300
                ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto md:flex' : 'flex'}
            `}>
                <button onClick={() => scrollToSection('home')} className="flex items-center space-x-3 rtl:space-x-reverse bg-transparent border-none cursor-pointer group">
                    <img src="/logo.png" className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" alt="IVC Logo" />
                    <span className="self-center text-2xl font-black tracking-tighter whitespace-nowrap text-gradient">IVC</span>
                </button>
                <div className="flex md:hidden rtl:space-x-reverse">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center p-2 w-12 h-12 justify-center text-ivc-text rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu size={28} />
                    </button>
                </div>

                <div className="hidden md:flex md:w-auto md:order-1">
                    <ul className="flex flex-row space-x-8 bg-transparent">
                        {links.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`block py-2 transition-all uppercase text-[10px] tracking-[0.3em] font-black ${activeSection === link.id
                                        ? 'text-ivc-secondary text-glow'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Sidebar (Right Side) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="fixed top-0 right-0 h-screen w-[300px] z-[60] md:hidden"
                    >
                        <div className="h-full w-full liquid-glass backdrop-blur-3xl p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.3)] relative flex flex-col border-l border-white/10">

                            {/* Close Button */}
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-gradient text-xl font-bold tracking-tighter">IVC MENU</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-colors group"
                                >
                                    <ArrowLeft size={24} className="text-white rotate-180" />
                                </button>
                            </div>

                            {/* Menu content */}
                            <ul className="flex flex-col space-y-6 relative z-10 w-full">
                                {links.map((link, index) => (
                                    <motion.li
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <button
                                            onClick={() => {
                                                scrollToSection(link.id);
                                            }}
                                            className={`block w-full text-right text-lg font-black tracking-widest transition-all uppercase ${activeSection === link.id
                                                ? 'text-ivc-secondary text-glow -translate-x-2'
                                                : 'text-white/60 hover:text-white hover:-translate-x-2'
                                                }`}
                                        >
                                            {link.name}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Bottom Elements */}
                            <div className="mt-auto border-t border-white/10 pt-8 flex flex-col items-center">
                                <img src="/logo.png" className="h-12 w-auto mb-4 opacity-50" alt="" />
                                <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-black text-center">
                                    Ideate . Visualize . Create
                                </p>
                            </div>

                            {/* Reflective Element */}
                            <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[40%] bg-ivc-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
