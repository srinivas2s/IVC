import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Domains from './pages/Domains';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Team from './pages/Team';
import Join from './pages/Join';
import Achievements from './pages/Achievements';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import InteractiveBackground from './components/InteractiveBackground';
import logo from './assets/logo.png';
import vvceLogo from './assets/vvce-logo.png';
import robotImg from './assets/robot.png';

const sections = [
  { id: 'home', label: '01' },
  { id: 'about', label: '02' },
  { id: 'team', label: '03' },
  { id: 'events', label: '04' },
  { id: 'domains', label: '05' },
  { id: 'projects', label: '06' },
  { id: 'achievements', label: '07' },
];

function MainSite() {
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isJoinEnabled, setIsJoinEnabled] = useState(true);
  const [showClosedPopup, setShowClosedPopup] = useState(false);
  const [isPastHome, setIsPastHome] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const footerMouseX = useMotionValue(0);
  const footerMouseY = useMotionValue(0);

  const footerMaskImage = useMotionTemplate`radial-gradient(200px circle at ${footerMouseX}px ${footerMouseY}px, black, transparent)`;
  const signatureMaskImage = useMotionTemplate`radial-gradient(150px circle at ${footerMouseX}px ${footerMouseY}px, black, transparent)`;

  const handleFooterMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    footerMouseX.set(e.clientX - rect.left);
    footerMouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    // Check if applications are enabled
    fetch('/api/settings/join-status')
      .then(res => res.json())
      .then(data => setIsJoinEnabled(data.enabled))
      .catch(() => setIsJoinEnabled(true));

    const handleScroll = () => {
      setIsPastHome(window.scrollY > 400);
      const scrollPos = window.scrollY + 150;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos && (el.offsetTop + el.offsetHeight) > scrollPos) {
          setActiveIdx(i);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const handleJoinClick = () => {
    if (isJoinEnabled) {
      setShowJoinModal(true);
    } else {
      setShowClosedPopup(true);
    }
  };

  return (
    <>
      <Navbar />
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
            {/* Scroll Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center gap-0"
            >
              <div className="relative h-64 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent">
                <motion.div
                  animate={{ top: `${(activeIdx / (sections.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-4 h-4 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                </motion.div>
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="absolute left-1/2 -translate-x-1/2 group"
                    style={{ top: `${(i / (sections.length - 1)) * 100}%` }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIdx === i ? 'opacity-0 scale-0' : 'bg-white/50 hover:bg-white/90 scale-100 opacity-100'}`} />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-display text-[8px] tracking-[0.2em] text-white/30 uppercase whitespace-nowrap">{section.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <main className="relative z-10 w-full">
              <section id="home"><Home isPastHome={isPastHome} /></section>
              <section id="about"><About /></section>
              <section id="team"><Team /></section>
              <section id="events"><Events /></section>
              <section id="domains"><Domains /></section>
              <section id="projects"><Projects /></section>
              <section id="achievements"><Achievements /></section>

              {/* CTA Section */}
              <section className="relative pt-32 md:pt-40 pb-0 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                  <div className="flex-1 text-center lg:text-left py-20 pb-40">
                    <motion.h2 initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase mb-8 text-white">
                      ARE YOU READY TO <span className="text-cyan-400 text-glow-cyan">INNOVATE ?</span>
                    </motion.h2>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                      <button
                        onClick={handleJoinClick}
                        className="relative group font-display text-[13px] md:text-[15px] font-bold tracking-[0.4em] uppercase px-12 md:px-16 py-5 md:py-6 rounded-full border-2 border-cyan-400 text-cyan-400 overflow-hidden transition-all duration-500 hover:border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] hover:-translate-y-1 hover:scale-105"
                      >
                        <span className="relative z-10">JOIN IVC</span>
                      </button>
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0, x: 60, y: 100 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative flex-shrink-0 self-end translate-y-1">
                    <img src={robotImg} alt="Robot" className="relative w-full max-w-[320px] md:max-w-[600px] lg:max-w-[750px] h-auto mix-blend-screen z-10" style={{ maskImage: 'linear-gradient(to top, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 85%, transparent 100%)' }} />
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="relative z-20 border-t border-white/[0.08]">
              <div className="absolute inset-0 dot-matrix opacity-20" />
              <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
                  <div>
                    <div className="flex items-center gap-6 mb-8">
                      <img src={logo} alt="IVC" className="h-20 md:h-24 w-auto opacity-90 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]" />
                      <div className="w-[3px] h-12 bg-white/[0.1]" />
                      <img src={vvceLogo} alt="VVCE" className="h-16 md:h-20 w-auto opacity-80" />
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed font-medium max-w-md mb-6">Vidyavardhaka College of Engineering, Mysuru<br />Autonomous institute affiliated to VTU, Belagavi</p>
                    <div className="flex gap-3">
                      {[
                        { href: "https://www.instagram.com/the.official.ivc?igsh=MTBpbGRiZ3JzdnN2bw==", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", color: "hover:text-pink-500 hover:border-pink-500/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]" },
                        { href: "https://www.linkedin.com/company/ivc-innovators-visionaries-club/", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", color: "hover:text-blue-500 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
                        { href: "https://x.com/ivc__official", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", color: "hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center text-white/30 transition-all duration-500 ${s.color}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right">
                    <h3 className="font-display text-base md:text-lg font-black tracking-wider text-white/60 uppercase mb-8">Contact</h3>
                    <a href="mailto:ivc.official01@gmail.com" className="block font-display text-[10px] md:text-xs tracking-[0.2em] text-white/40 hover:text-cyan-400 transition-colors uppercase mb-8">ivc.official01@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="relative h-20 md:h-28 overflow-hidden" onMouseMove={handleFooterMouseMove}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-display text-7xl md:text-9xl lg:text-[12rem] font-black text-white/[0.08] tracking-[0.3em] uppercase select-none">IVC'26</span>
                </div>
                <div className="absolute inset-0 dot-matrix opacity-30" />
              </div>
            </footer>

            {/* Join Modal */}
            <AnimatePresence>
              {showJoinModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                  <div className="absolute inset-0 bg-[#050a15]/85 backdrop-blur-xl" onClick={() => setShowJoinModal(false)} />
                  <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} data-lenis-prevent className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a1020]/95 border border-white/[0.05] rounded-2xl shadow-2xl">
                    <button onClick={() => setShowJoinModal(false)} className="absolute top-5 right-5 z-50 w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                    <div className="p-8 md:p-12"><Join isModal={true} /></div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Closed Popup */}
            <AnimatePresence>
              {showClosedPopup && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center px-4">
                  <div className="absolute inset-0 bg-[#050a15]/90 backdrop-blur-md" onClick={() => setShowClosedPopup(false)} />
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative z-10 w-full max-w-sm bg-[#0a1020] border border-red-500/30 p-10 rounded-2xl text-center shadow-2xl">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 className="font-display text-xl font-black text-white uppercase tracking-wider mb-2">Applications Closed</h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-8 leading-relaxed">Membership registration is currently restricted. Stay tuned for future openings.</p>
                    <button onClick={() => setShowClosedPopup(false)} className="w-full py-4 rounded-xl bg-white text-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-red-500 hover:text-white transition-all">DISMISS</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </Router>
  );
}

export default App;
