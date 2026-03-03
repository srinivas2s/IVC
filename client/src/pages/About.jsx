import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';

const About = () => (
    <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto text-center text-ivc-text flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-10 text-center text-gradient tracking-tighter">
            About IVC
        </h2>
        <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed font-medium">
            The Innovation & Value Creation Club (IVC) is dedicated to fostering a culture of innovation
            and entrepreneurship among students. We believe in transforming ideas into impactful reality
            through collaboration, technology, and mentorship.
        </p>

    </div>
);

export default About;
