import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            });
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-ivc-text underline underline-offset-8 decoration-ivc-primary/30">Our Projects</h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ivc-primary"></div>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            className="bg-[#050505] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group hover:scale-[1.02] hover:border-ivc-primary hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
                        >
                            <div className="h-56 bg-gray-900 overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono border border-gray-700 text-gray-300">
                                    {project.domain}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-ivc-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                                <button className="text-ivc-primary text-sm font-bold tracking-wide hover:text-white transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300">
                                    Read More <span className="text-lg">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
export default Projects;
