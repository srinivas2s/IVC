import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';
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
            const scrollPosition = window.scrollY + 100;

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-[8px] z-[150] pointer-events-auto"
                    />
                )}
            </AnimatePresence>

            {/* Premium Menu Sidebar (Right Side) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        className="fixed top-6 right-6 bottom-6 w-[300px] z-[200] pointer-events-auto"
                    >
                        <div className="w-full h-full relative group">
                            <div className="w-full h-full bg-[#080a0f]/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative flex flex-col border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-3xl">
                                {/* Gradient decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-ivc-secondary/5 blur-[60px] rounded-full" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-ivc-primary/5 blur-[60px] rounded-full" />

                                {/* Close button */}
                                <div className="flex justify-between items-center mb-10">
                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Navigation</span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Links */}
                                <ul className="flex flex-col space-y-1 text-left flex-1">
                                    {links.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.04 }}
                                        >
                                            <button
                                                onClick={() => scrollToSection(link.id)}
                                                className={`block w-full text-left py-3 px-4 rounded-xl text-[14px] font-black tracking-[0.15em] transition-all uppercase relative group/link ${activeSection === link.id
                                                        ? 'text-ivc-secondary bg-ivc-secondary/5 border border-ivc-secondary/10'
                                                        : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                                                    }`}
                                            >
                                                <span className="relative z-10 flex items-center gap-3">
                                                    {/* Active indicator dot */}
                                                    {activeSection === link.id && (
                                                        <motion.div
                                                            layoutId="nav-active"
                                                            className="w-1.5 h-1.5 rounded-full bg-ivc-secondary shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                                        />
                                                    )}
                                                    {link.name}
                                                </span>
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Bottom branding */}
                                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                                    <img src={logo} className="h-12 w-auto opacity-60" alt="IVC Logo" />
                                    <div className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-black text-center">
                                        Ideate · Visualize · Create
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
