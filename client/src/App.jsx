import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Domains from './pages/Domains';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Team from './pages/Team';
import Join from './pages/Join';
import Achievements from './pages/Achievements';
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

function App() {
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
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

  return (
    <Router>
      <Navbar />
      <InteractiveBackground />

      {/* Viewport edge glow overlay - TechSolstice style */}
      <div className="fixed inset-0 pointer-events-none z-[80] viewport-glow" />

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
            {/* Removed floating logo as requested */}

            {/* Scroll Timeline - right side - TechSolstice style */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center gap-0"
            >
              {/* Timeline line */}
              <div className="relative h-64 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent">
                {/* Glowing diamond indicator */}
                <motion.div
                  animate={{ top: `${(activeIdx / (sections.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-4 h-4 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                </motion.div>

                {/* Section dots */}
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="absolute left-1/2 -translate-x-1/2 group"
                    style={{ top: `${(i / (sections.length - 1)) * 100}%` }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIdx === i ? 'opacity-0 scale-0' : 'bg-white/15 hover:bg-white/30 scale-100 opacity-100'
                      }`} />
                    {/* Label on hover */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-display text-[8px] tracking-[0.2em] text-white/30 uppercase whitespace-nowrap">{section.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Removed Navbar for cleaner UI */}

            <main className="relative z-10 w-full">
              <section id="home"><Home isPastHome={isPastHome} /></section>
              <section id="about"><About /></section>
              <section id="team"><Team /></section>
              <section id="events"><Events /></section>
              <section id="domains"><Domains /></section>
              <section id="projects"><Projects /></section>
              <section id="achievements"><Achievements /></section>

              {/* CTA Section with Robot */}
              <section className="relative pt-32 md:pt-40 pb-0 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                  {/* Text + Button - left side */}
                  <div className="flex-1 text-center lg:text-left py-20 pb-40">
                    <motion.h2
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="font-display text-5xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase mb-8 text-white"
                    >
                      ARE YOU READY TO <span className="text-cyan-400 text-glow-cyan">INNOVATE</span>
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <button
                        onClick={() => setShowJoinModal(true)}
                        className="font-display text-[11px] md:text-[13px] tracking-[0.4em] uppercase px-10 md:px-14 py-4 md:py-5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition-all duration-500"
                      >
                        JOIN IVC
                      </button>
                    </motion.div>
                  </div>
                  {/* Robot - right side */}
                  <motion.div
                    initial={{ opacity: 0, x: 60, y: 100 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex-shrink-0 self-end translate-y-1"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,211,238,0.1)_0%,transparent_70%)] pointer-events-none will-change-transform" />
                    <img
                      src={robotImg}
                      alt="Robot"
                      className="relative w-full max-w-[320px] md:max-w-[600px] lg:max-w-[750px] h-auto mix-blend-screen z-10"
                      style={{
                        maskImage: 'linear-gradient(to top, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 85%, transparent 100%)'
                      }}
                    />
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="relative z-20 border-t border-white/[0.04] overflow-hidden">
              <div className="absolute inset-0 dot-matrix opacity-25" />
              <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
                  <div>
                    <div className="flex items-center gap-6 mb-8">
                      <img src={logo} alt="IVC" className="h-20 md:h-24 w-auto opacity-90 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]" />
                      <div className="w-[1px] h-12 bg-white/[0.1]" />
                      <img src={vvceLogo} alt="VVCE" className="h-16 md:h-20 w-auto opacity-80" />
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed font-medium max-w-md mb-6">
                      Vidyavardhaka College of Engineering, Mysuru<br />
                      Autonomous institute affiliated to VTU, Belagavi
                    </p>
                    <div className="flex flex-col gap-2 mb-8">
                      <a href="/IVC_Code_of_Conduct_One_Page.pdf" download="IVC_Code_of_Conduct.pdf" className="font-display text-[9px] tracking-[0.3em] text-white/40 uppercase hover:text-cyan-400 transition-colors">Code of Conduct</a>
                      <a href="/I&V CLUB.pdf" download="IVC_Program_Structure.pdf" className="font-display text-[9px] tracking-[0.3em] text-white/40 uppercase hover:text-cyan-400 transition-colors">Structure of Programs</a>
                    </div>
                    <div className="flex gap-3">
                      {[
                        { href: "https://www.instagram.com/the.official.ivc?igsh=MTBpbGRiZ3JzdnN2bw==", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", color: "hover:text-pink-500 hover:border-pink-500/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]" },
                        { href: "https://www.linkedin.com/in/innovators-and-visionaries-club-6992443a3", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", color: "hover:text-blue-500 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
                        { href: "https://x.com/ivc__official", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", color: "hover:text-white hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center text-white/30 transition-all duration-500 ${s.color}`}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                        </a>
                      ))}
                      <a href="mailto:ivc.official01@gmail.com" className="w-10 h-10 rounded-full border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-red-500 hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <h3 className="font-display text-base md:text-lg font-black tracking-wider text-white/60 uppercase mb-8">Contact</h3>
                    <a href="mailto:ivc.official01@gmail.com" className="block font-display text-[10px] md:text-xs tracking-[0.2em] text-white/40 hover:text-cyan-400 transition-colors uppercase mb-8">
                      ivc.official01@gmail.com
                    </a>
                    <h4 className="font-display text-[9px] tracking-[0.3em] text-white/30 uppercase mb-4">Quick Links</h4>
                    <div className="flex flex-col gap-2 md:items-end">
                      {['About', 'Events', 'Domains', 'Team'].map(l => (
                        <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                          className="font-display text-[10px] tracking-[0.2em] text-white/40 hover:text-cyan-400 transition-colors uppercase">{l}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="font-display text-[8px] tracking-[0.3em] text-white/30 uppercase">© 2026 Innovators & Visionaries Club</span>
                  <span className="font-display text-[8px] tracking-[0.3em] text-white/30 uppercase">VVCE, Mysuru</span>
                </div>
              </div>
              <div className="relative h-20 md:h-28 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-display text-7xl md:text-9xl lg:text-[12rem] font-black text-white/[0.08] tracking-[0.3em] uppercase select-none text-glow-white/10">IVC'26</span>
                </div>
                <div className="absolute inset-0 dot-matrix opacity-30" />
              </div>
            </footer>

            {/* Join Modal */}
            <AnimatePresence>
              {showJoinModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                  <div className="absolute inset-0 bg-[#050a15]/85 backdrop-blur-xl" onClick={() => setShowJoinModal(false)} />
                  <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    data-lenis-prevent className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a1020]/95 border border-white/[0.05] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                    <button onClick={() => setShowJoinModal(false)} className="absolute top-5 right-5 z-50 w-9 h-9 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="p-8 md:p-12"><Join isModal={true} /></div>
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
