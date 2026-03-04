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
import vvceLogo from './assets/vvce-logo.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isPastHome, setIsPastHome] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsPastHome(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <Router>
      <SmoothScroll />
      <InteractiveBackground />

      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen text-white font-body relative w-full overflow-x-hidden"
          >
            {/* Floating logo when scrolled */}
            <AnimatePresence>
              {isPastHome && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-5 left-5 z-[90] group cursor-pointer"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <motion.img
                    layoutId="main-logo"
                    src={logo}
                    alt="IVC"
                    className="w-10 h-10 md:w-14 md:h-14 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-110 transition-transform"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Navbar isPastHome={isPastHome} />

            <main className="relative z-10 w-full">
              <section id="home"><Home isPastHome={isPastHome} /></section>
              <section id="about"><About /></section>
              <section id="team"><Team /></section>
              <section id="events"><Events /></section>
              <section id="domains"><Domains /></section>
              <section id="projects"><Projects /></section>
              <section id="achievements"><Achievements /></section>

              {/* CTA Section - TechSolstice "READY TO COMPETE?" style */}
              <section className="relative py-32 md:py-40 overflow-hidden bg-blueprint">
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase mb-8"
                  >
                    READY TO <span className="text-cyan-400 text-glow-cyan">INNOVATE</span>?
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={() => setShowJoinModal(true)}
                      className="font-display text-[11px] md:text-[13px] tracking-[0.4em] uppercase px-10 md:px-14 py-4 md:py-5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500"
                    >
                      JOIN IVC
                    </button>
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer - TechSolstice style with dot matrix */}
            <footer className="relative z-20 border-t border-white/[0.04] overflow-hidden">
              {/* Dot matrix background */}
              <div className="absolute inset-0 dot-matrix opacity-30" />

              <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
                  {/* Left: Branding & Address */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <img src={logo} alt="IVC" className="h-14 w-auto opacity-70" />
                      <div className="w-[1px] h-10 bg-white/10" />
                      <img src={vvceLogo} alt="VVCE" className="h-12 w-auto opacity-50" />
                    </div>
                    <p className="text-white/25 text-sm leading-relaxed font-medium max-w-md mb-6">
                      Vidyavardhaka College of Engineering<br />
                      Autonomous institute affiliated to VTU, Belagavi<br />
                      Mysuru, Karnataka
                    </p>

                    {/* Downloads */}
                    <div className="flex flex-col gap-2 mb-8">
                      <a href="/IVC_Code_of_Conduct_One_Page.pdf" download="IVC_Code_of_Conduct.pdf"
                        className="font-display text-[9px] tracking-[0.3em] text-white/20 uppercase hover:text-cyan-400 transition-colors flex items-center gap-2">
                        ↓ Code of Conduct
                      </a>
                      <a href="/I&V CLUB.pdf" download="IVC_Program_Structure.pdf"
                        className="font-display text-[9px] tracking-[0.3em] text-white/20 uppercase hover:text-cyan-400 transition-colors flex items-center gap-2">
                        ↓ Structure of Programs
                      </a>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-3">
                      {[
                        { href: "https://www.instagram.com/the.official.ivc?igsh=MTBpbGRiZ3JzdnN2bw==", label: "IG", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                        { href: "https://www.linkedin.com/in/innovators-and-visionaries-club-6992443a3", label: "LI", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                        { href: "https://x.com/ivc__official", label: "X", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                      ].map((social, i) => (
                        <a key={i} href={social.href} target="_blank" rel="noreferrer"
                          className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-cyan-400 hover:border-cyan-400/20 transition-all duration-300">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                        </a>
                      ))}
                      <a href="mailto:ivc.official01@gmail.com"
                        className="w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-cyan-400 hover:border-cyan-400/20 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                    </div>
                  </div>

                  {/* Right: Contact Info - TechSolstice style */}
                  <div className="md:text-right">
                    <h3 className="font-display text-lg md:text-xl font-black tracking-wider text-white/60 uppercase mb-8">
                      Contact Us
                    </h3>
                    <div className="space-y-4">
                      <a href="mailto:ivc.official01@gmail.com" className="block font-display text-[10px] md:text-xs tracking-[0.2em] text-white/25 hover:text-cyan-400 transition-colors uppercase">
                        ivc.official01@gmail.com
                      </a>
                    </div>

                    <div className="mt-12">
                      <h4 className="font-display text-[9px] tracking-[0.3em] text-white/15 uppercase mb-4">Quick Links</h4>
                      <div className="flex flex-col gap-2 md:items-end">
                        {['About', 'Events', 'Domains', 'Team', 'Achievements'].map(link => (
                          <button key={link} onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                            className="font-display text-[10px] tracking-[0.2em] text-white/20 hover:text-cyan-400 transition-colors uppercase">
                            {link}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="font-display text-[9px] tracking-[0.3em] text-white/15 uppercase">
                    © 2026 Innovators & Visionaries Club
                  </span>
                  <span className="font-display text-[9px] tracking-[0.3em] text-white/15 uppercase">
                    Vidyavardhaka College of Engineering, Mysuru
                  </span>
                </div>
              </div>

              {/* Large dot-matrix brand text at bottom */}
              <div className="relative h-24 md:h-32 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl md:text-9xl font-black text-white/[0.015] tracking-widest uppercase select-none">
                    IVC'26
                  </span>
                </div>
                <div className="absolute inset-0 dot-matrix opacity-40" />
              </div>
            </footer>

            {/* Join Modal */}
            <AnimatePresence>
              {showJoinModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                >
                  <div className="absolute inset-0 bg-[#060b18]/80 backdrop-blur-xl" onClick={() => setShowJoinModal(false)} />
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    data-lenis-prevent
                    className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a1020]/95 border border-white/[0.06] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                  >
                    {/* Scan line */}
                    <motion.div
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[1px] bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.2)] pointer-events-none z-20"
                    />
                    <button onClick={() => setShowJoinModal(false)} className="absolute top-6 right-6 z-50 w-10 h-10 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="p-8 md:p-12">
                      <Join isModal={true} />
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
