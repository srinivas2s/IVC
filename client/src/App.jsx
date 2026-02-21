import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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

import InteractiveBackground from './components/InteractiveBackground';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <InteractiveBackground mode={theme} />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <div key="content" className={`min-h-screen ${theme === 'light' ? 'text-ivc-text-dark' : 'text-ivc-text'} font-sans selection:bg-ivc-primary selection:text-white flex flex-col relative overflow-x-hidden transition-colors duration-1000`}>
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main className="flex-grow relative z-10">
              <section id="home"><Home /></section>
              <section id="about"><About /></section>
              <section id="team"><Team /></section>
              <section id="events"><Events /></section>
              <section id="domains"><Domains /></section>
              <section id="projects"><Projects /></section>
              <section id="achievements"><Achievements /></section>
              <section id="join"><Join /></section>
            </main>

            <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-4">
                <p className="mb-2">&copy; {new Date().getFullYear()} IVC - Innovation & Value Creation Club.</p>
                <p className="text-gray-600">Built with passion for the next generation of innovators.</p>
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
