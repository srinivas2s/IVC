import { motion } from 'framer-motion';
import { Lightbulb, Zap, Rocket } from 'lucide-react';

const PillarCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="group relative p-8 rounded-[32px] liquid-glass flex flex-col items-start text-left overflow-hidden h-full cursor-pointer"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-ivc-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
            <Icon className="text-ivc-primary" size={24} />
        </div>
        <h3 className="relative z-10 text-xl font-black italic uppercase tracking-tighter mb-4 text-white group-hover:text-ivc-primary transition-colors">
            {title}
        </h3>
        <p className="relative z-10 text-sm md:text-base text-white/60 leading-relaxed font-black">
            {description}
        </p>
    </motion.div>
);

const About = () => {
    const cards = [
        {
            title: "Our Mission",
            content: "To create an ecosystem where curiosity is encouraged, failure is celebrated as learning, and every student becomes a value creator through collaborative excellence.",
            className: "liquid-glass"
        },
        {
            title: "Our Vision",
            content: "To become the paramount student-driven innovation hub in India, producing the next generation of engineers who don't just find jobs, but create them.",
            className: "liquid-glass border-ivc-primary/20 bg-ivc-primary/5"
        }
    ];

    return (
        <section className="relative w-full py-24 md:py-40 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full -z-10 animate-nebula" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full -z-10 animate-nebula-reverse" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Header */}
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black mb-10 text-center text-gradient tracking-tight italic uppercase"
                    >
                        Beyond <br className="md:hidden" /> Innovation
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl text-white/60 leading-relaxed font-black max-w-2xl mx-auto"
                    >
                        The Innovation & Value Creation Club isn't just a community; it's an accelerator for your imagination. We bridge the gap between academic theory and real-world impact.
                    </motion.p>
                </div>

                {/* Mission & Vision Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`p-10 md:p-14 rounded-[40px] ${card.className} relative overflow-hidden group flex flex-col justify-center min-h-[350px] shadow-2xl cursor-pointer`}
                        >
                            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 text-white group-hover:text-ivc-primary transition-colors duration-500">
                                {card.title}
                            </h3>
                            <p className="text-lg md:text-xl text-white/70 font-black leading-relaxed">
                                {card.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* The Three Pillars */}
                <div className="text-center mb-16">
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                        Our Core Pillars
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PillarCard
                        icon={Lightbulb}
                        title="Ideate"
                        description="Capturing the wildest ideas and refining them into feasible solutions for technical and social challenges."
                        delay={0.1}
                    />
                    <PillarCard
                        icon={Zap}
                        title="Visualize"
                        description="Prototyping and designing user experiences that bring concepts to life through digital and physical mediums."
                        delay={0.2}
                    />
                    <PillarCard
                        icon={Rocket}
                        title="Create"
                        description="Shipping real products, hosting events, and executing projects that leave a lasting impact on our campus."
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
