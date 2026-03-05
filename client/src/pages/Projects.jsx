import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => { setProjects(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section className="relative py-32 md:py-48 overflow-hidden ">
            <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">PROJECTS</div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div {...fadeUp()} className="text-center mb-20">
                    <h2 className="font-display text-5xl md:text-8xl lg:text-[7rem] font-black tracking-wider uppercase mb-4">
                        OUR <span className="text-cyan-400 text-glow-cyan">PROJECTS</span>
                    </h2>
                    <p className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase">
                        Real-world solutions built by our community
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
                    </div>
                ) : projects.length === 0 ? (
                    <motion.div {...fadeUp(0.2)} className="glow-card rounded-2xl p-16 text-center">
                        <div className="font-display text-6xl md:text-8xl font-black text-white/5 mb-6">00</div>
                        <h3 className="font-display text-xl md:text-2xl font-black tracking-wider text-white/60 uppercase mb-4">Coming Soon</h3>
                        <p className="text-white/40 text-sm font-medium max-w-md mx-auto">
                            Projects are currently being developed. Check back soon for updates.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                {...fadeUp(0.05 + i * 0.06)}
                                className="glow-card rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-lg border border-cyan-400/15 bg-[#060b18]/60 backdrop-blur-md">
                                        <span className="font-display text-[9px] tracking-[0.2em] text-cyan-400/60 uppercase">{project.domain}</span>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-display text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase mb-3">{project.title}</h3>
                                    <p className="text-white/25 text-sm leading-relaxed font-medium line-clamp-2 mb-6">{project.description}</p>
                                    <div className="font-display text-[10px] tracking-[0.3em] text-cyan-400/40 uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                        VIEW DETAILS <span className="group-hover:translate-x-1 transition-transform"></span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;


