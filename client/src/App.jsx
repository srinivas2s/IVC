import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Domains from './pages/Domains';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Team from './pages/Team';
import Join from './pages/Join';
import Achievements from './pages/Achievements';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import InteractiveBackground from './components/InteractiveBackground';
import logo from './assets/logo.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isPastHome, setIsPastHome] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show corner logo and hide navbar when scrolled past home
      setIsPastHome(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px 400px 0px' } // Detect footer 400px before it enters viewport
    );

    const footerElement = document.querySelector('footer');
    if (footerElement) observer.observe(footerElement);

    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, [loading]);

  return (
    <Router>
      <SmoothScroll />
      {/* Background stays below everything */}
      <div style={{ pointerEvents: 'none' }}>
        <InteractiveBackground />
      </div>

      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen text-ivc-text font-sans selection:bg-ivc-primary selection:text-white flex flex-col relative w-full overflow-x-hidden"
          >
            {/* Smooth flying logo transition */}
            <AnimatePresence>
              {isPastHome && !isFooterInView && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-6 right-6 z-[90] group"
                >
                  <motion.img
                    layoutId="main-logo"
                    src={logo}
                    alt="IVC Logo"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-12 h-12 md:w-24 md:h-24 cursor-pointer drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-110 transition-transform duration-300"
                  />
                  {/* Tooltip or Label */}
                  <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-widest text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Back to Top
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isPastHome && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
                >
                  <div className="pointer-events-auto">
                    <Navbar />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <main className="flex-grow relative z-10 w-full overflow-x-hidden">
              <section id="home"><Home isPastHome={isPastHome} /></section>
              <section id="about"><About /></section>
              <section id="team"><Team /></section>
              <section id="events"><Events /></section>
              <section id="domains"><Domains /></section>
              <section id="projects"><Projects /></section>
              <section id="achievements" className="pb-12"><Achievements /></section>
            </main>

            <footer className="pt-12 pb-10 text-center liquid-glass relative z-20 w-full overflow-x-hidden group transition-all duration-500">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-center">
                  {/* Left Column: Tagline & Socials */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-white text-xl font-black italic uppercase tracking-tighter mb-2">INNOVATORS & VISIONARIES CLUB</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-[320px] font-black opacity-80 mb-6">
                      A community dedicated to fostering innovation, creativity, and technical excellence among students.
                    </p>
                    <div className="flex gap-4">
                      <a href="https://www.instagram.com/the.official.ivc?igsh=MTBpbGRiZ3JzdnN2bw==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/40 hover:shadow-[0_0_20px_rgba(225,48,108,0.3)] transition-all duration-300 border border-white/5 active:scale-95">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      </a>
                      <a href="https://www.linkedin.com/in/innovators-and-visionaries-club-6992443a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#0077B5] hover:bg-[#0077B5]/10 hover:border-[#0077B5]/40 hover:shadow-[0_0_20px_rgba(0,119,181,0.3)] transition-all duration-300 border border-white/5 active:scale-95">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                      <a href="https://x.com/ivc__official?s=21" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-black hover:bg-white hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 border border-white/5 active:scale-95">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      </a>
                      <a href="mailto:ivc.official01@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#EA4335] hover:bg-[#EA4335]/10 hover:border-[#EA4335]/40 hover:shadow-[0_0_20px_rgba(234,67,53,0.3)] transition-all duration-300 border border-white/5 active:scale-95">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                    </div>
                  </div>

                  {/* Middle Column: Animated Logo */}
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={logo}
                      alt="IVC Logo"
                      className="w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform duration-500 cursor-pointer"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                  </div>

                  {/* Right Column: Quick Links */}
                  <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 opacity-50">Quick Links</h4>
                    <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white transition-colors text-sm md:text-right font-black mb-4">About IVC</button>
                    <button onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-white transition-colors text-sm md:text-right font-black mb-4">Latest Events</button>
                    <button
                      onClick={() => setShowJoinModal(true)}
                      className="text-white font-black hover:scale-105 transition-all text-sm md:text-right uppercase italic tracking-widest group relative w-fit mt-2 md:ml-auto"
                    >
                      JOIN OUR COMMUNITY
                      <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  </div>
                </div>
                <div className="mt-6 pt-4 flex justify-center">
                  <p className="text-white font-black text-lg md:text-xl tracking-tighter opacity-90 italic uppercase">&copy; 2026 Innovators & Visionaries Club</p>
                </div>
              </div>
            </footer>

            <AnimatePresence>
              {showJoinModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" onClick={() => setShowJoinModal(false)} />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    data-lenis-prevent
                    className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#05070a]/90 border border-white/10 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                  >
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_30px_#22d3ee,0_0_60px_#22d3ee] opacity-50 pointer-events-none z-20"
                    />
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-cyan-500/[0.12] to-transparent pointer-events-none z-10"
                    />
                    <button onClick={() => setShowJoinModal(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <div className="p-8 md:p-12">
                      <Join isModal={true} />
                      <div className="flex justify-center items-center gap-6 pt-8 opacity-40">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">By joining, you agree to innovate and push boundaries</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
