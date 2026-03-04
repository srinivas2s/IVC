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
];

const Navbar = ({ isPastHome }) => {
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
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {/* Morphing Navbar Container */}
            <div className={`absolute top-6 transition-all duration-700 ease-[0.16,1,0.3,1] ${isPastHome ? 'right-6 left-auto w-auto' : 'left-1/2 -translate-x-1/2 w-[95%] max-w-7xl'}`}>
                <div
                    className={`
                        flex items-center transition-all duration-700 pointer-events-auto
                        ${isPastHome
                            ? 'bg-[#020408]/60 backdrop-blur-[24px] border border-white/10 rounded-[28px] md:rounded-[36px] p-4 sm:p-5 md:p-7 shadow-[0_20px_400px_rgba(0,0,0,0.4)]'
                            : 'bg-[#020408]/40 backdrop-blur-[20px] border border-white/10 rounded-[24px] px-4 sm:px-10 py-3 sm:py-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] justify-between w-full'
                        }
                    `}
                >
                    <AnimatePresence>
                        {!isPastHome && (
                            <motion.div
                                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -20, filter: 'blur(10px)', transition: { duration: 0.3 } }}
                                className="flex items-center gap-2 sm:gap-6 flex-1 min-w-0"
                            >
                                <div className="flex items-center select-none min-w-0">
                                    <div className="overflow-hidden shrink-0">
                                        <span className="text-white font-light text-xl sm:text-3xl tracking-tighter block mr-2 sm:mr-6">inunity</span>
                                    </div>
                                    <div className="w-[1px] h-8 sm:h-14 bg-white/20 shrink-0" />
                                    <div className="flex items-center gap-2 sm:gap-5 ml-2 sm:ml-6 min-w-0 overflow-hidden">
                                        <img src={vvceLogo} alt="VVCE Logo" className="h-10 sm:h-20 w-auto brightness-110 shrink-0" />
                                        <div className="flex flex-col justify-center select-none min-w-0 overflow-hidden">
                                            <span className="text-[6px] sm:text-[11px] text-white/70 leading-tight uppercase tracking-[0.12em] font-medium truncate mb-0.5">Vidyavardhaka Sangha ®, Mysore</span>
                                            <span className="text-[10px] sm:text-[21px] text-white font-bold leading-tight tracking-tight truncate mb-0.5">Vidyavardhaka College of Engineering</span>
                                            <span className="text-[6px] sm:text-[13px] text-white/50 leading-tight font-medium truncate">Autonomous institute affiliated to VTU, Belagavi</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Persistent Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`
                            flex flex-col items-center justify-center transition-all duration-300 group/btn active:scale-90
                            ${isPastHome ? 'gap-1.5 md:gap-2' : 'p-2 w-10 h-10 sm:w-14 sm:h-14 space-y-1.5 sm:space-y-2.5 rounded-2xl hover:bg-white/5'}
                        `}
                    >
                        <div className={`h-[2px] sm:h-[3px] bg-white rounded-full transition-all duration-500 ${isPastHome ? 'w-6 sm:w-8 md:w-10' : 'w-6 sm:w-8'}`} />
                        <div className={`h-[2px] sm:h-[3px] bg-white rounded-full transition-all duration-500 ${isPastHome ? 'w-6 sm:w-8 md:w-10' : 'w-6 sm:w-8'}`} />
                        <div className={`h-[2px] sm:h-[3px] bg-white rounded-full transition-all duration-500 ${isPastHome ? 'w-6 sm:w-8 md:w-10' : 'w-6 sm:w-8'}`} />
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
                        className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[150] pointer-events-auto"
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
                        className="fixed top-6 right-6 w-[280px] z-[200] pointer-events-auto"
                    >
                        <div className="w-full relative group">
                            <div className="w-full bg-black/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] relative flex flex-col border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl">
                                <div className="flex justify-end mb-6">
                                    <button onClick={() => setIsOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors">
                                        <ArrowLeft size={24} className="rotate-180" />
                                    </button>
                                </div>

                                <ul className="flex flex-col space-y-4 text-left">
                                    {links.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <button
                                                onClick={() => scrollToSection(link.id)}
                                                className={`block w-full text-left text-[15px] font-black tracking-[0.2em] transition-all uppercase ${activeSection === link.id ? 'text-ivc-secondary text-glow translate-x-1' : 'text-white/70 hover:text-white hover:translate-x-1'}`}
                                            >
                                                {link.name}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center">
                                    <img src={logo} className="h-14 w-auto mb-4" alt="IVC Logo" />
                                    <div className="text-[10px] tracking-[0.2em] text-white uppercase font-black text-center whitespace-nowrap">
                                        Ideate . Visualize . Create
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
