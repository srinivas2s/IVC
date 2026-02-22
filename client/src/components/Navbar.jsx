import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import vvceLogo from '../assets/vvce-logo.png';

const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Team', id: 'team' },
    { name: 'Events', id: 'events' },
    { name: 'Domains', id: 'domains' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Join IVC', id: 'join' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

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
            {/* Main Navbar Bar */}
            <div className={`
                bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl items-center justify-between pl-3 pr-1 sm:px-8 py-4 sm:py-3
                ${isOpen ? 'hidden' : 'flex'}
            `}>
                <div className="flex items-center gap-1 sm:gap-4">
                    <div className="flex items-center select-none">
                        {/* Emerges to the left */}
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="text-white font-light text-2xl sm:text-3xl tracking-tighter block mr-5 sm:mr-6"
                            >
                                inunity
                            </motion.span>
                        </div>

                        {/* Center Anchor */}
                        <motion.div
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="w-[2px] h-12 sm:h-14 bg-white origin-center shrink-0"
                        />

                        {/* Emerges to the right */}
                        <div className="flex items-center gap-1 sm:gap-4 overflow-hidden ml-1 sm:ml-6">
                            <motion.img
                                src={vvceLogo}
                                alt="VVCE Logo"
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                className="h-14 sm:h-20 w-auto brightness-110 shrink-0"
                            />
                            <motion.div
                                initial={{ x: '-50%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                className="flex flex-col justify-center select-none ml-1 sm:ml-2"
                            >
                                <span className="text-[6px] sm:text-[11px] text-white leading-none mb-0.5 sm:mb-1 uppercase tracking-[0.15em] font-medium">Vidyavardhaka Sangha ®, Mysore</span>
                                <span className="text-[10px] sm:text-[18px] text-white font-bold leading-none mb-1 sm:mb-1.5 tracking-tight">Vidyavardhaka College of Engineering</span>
                                <span className="text-[7px] sm:text-[12px] text-white leading-none font-medium opacity-100">Autonomous institute affiliated to VTU, Belagavi</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="flex rtl:space-x-reverse">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center p-1 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 justify-center text-ivc-text rounded-xl hover:bg-white/10 transition-colors group"
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="flex flex-col gap-1.5 items-center justify-center">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ width: 4, opacity: 0 }}
                                    animate={{ width: 22, opacity: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.6 + (i * 0.1),
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="h-[1.5px] bg-white rounded-full"
                                />
                            ))}
                        </div>
                    </button>
                </div>
            </div>

            {/* Menu Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[55]"
                    />
                )}
            </AnimatePresence>

            {/* Menu Sidebar (Right Side) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        className="fixed top-6 right-6 w-[280px] z-[60]"
                    >
                        <div className="w-full relative group">
                            {/* Glass Panel */}
                            <div
                                className="w-full bg-white/[0.01] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] relative flex flex-col border border-white/10 rounded-[32px] overflow-hidden transform-gpu"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div
                                    className="absolute inset-0 backdrop-blur-3xl bg-black/10 -z-10"
                                    style={{ willChange: 'backdrop-filter' }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                                {/* Close Button */}
                                <div className="flex justify-end mb-6 relative z-10">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 text-white/50 hover:text-white transition-colors"
                                    >
                                        <ArrowLeft size={24} className="rotate-180" />
                                    </button>
                                </div>


                                <ul className="flex flex-col space-y-4 relative z-10 w-full text-right">
                                    {links.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    scrollToSection(link.id);
                                                }}
                                                className={`block w-full text-right text-[15px] font-black tracking-[0.2em] transition-all uppercase ${activeSection === link.id
                                                    ? 'text-ivc-secondary text-glow -translate-x-1'
                                                    : 'text-white/70 hover:text-white hover:-translate-x-1'
                                                    }`}
                                            >
                                                {link.name}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>


                                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center relative z-10">
                                    <img src={logo} className="h-14 w-auto mb-4 opacity-100 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt="" />
                                    <div className="text-[10px] tracking-[0.2em] text-white/90 uppercase font-black text-center whitespace-nowrap">
                                        Ideate . Visualize . Create
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
