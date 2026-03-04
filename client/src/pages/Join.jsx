import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, School, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';

const Join = ({ isModal = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        year: '',
    });
    const [status, setStatus] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', department: '', year: '' });
        }, 2000);
    };

    const containerClasses = isModal
        ? "w-full py-4 px-6"
        : "pt-40 pb-24 px-4 max-w-2xl mx-auto min-h-screen flex flex-col justify-center";

    const inputFields = [
        { name: 'name', label: 'Full Name', icon: <User size={18} />, type: 'text', placeholder: 'Srinivas P' },
        { name: 'email', label: 'Email Address', icon: <Mail size={18} />, type: 'email', placeholder: 'your@email.com' },
        { name: 'department', label: 'Department', icon: <School size={18} />, type: 'text', placeholder: 'Computer Science' },
        { name: 'year', label: 'Year', icon: <Calendar size={18} />, type: 'text', placeholder: '3rd Year' },
    ];

    return (
        <div className={containerClasses}>
            <motion.div
                initial={isModal ? {} : { opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
            >
                {/* Header Section */}
                <div className="text-center mb-12 px-4">
                    <motion.h2
                        className="text-4xl md:text-6xl font-black mb-4 text-gradient tracking-tight uppercase px-4 py-2 overflow-visible"
                    >
                        Join IVC
                    </motion.h2>
                    <p className="text-gray-400 font-bold tracking-wide text-sm uppercase">
                        Empowering the next generation of <span className="text-ivc-secondary">visionaries</span>.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="bg-white/[0.03] border border-ivc-secondary/20 rounded-[40px] p-12 text-center backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
                        >
                            {/* Success glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-ivc-secondary/5 to-transparent" />

                            <div className="relative z-10">
                                <div className="flex justify-center mb-8">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                        className="w-24 h-24 rounded-full bg-ivc-secondary/10 flex items-center justify-center text-ivc-secondary border border-ivc-secondary/30 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                                    >
                                        <CheckCircle size={48} />
                                    </motion.div>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Application Filed!</h3>
                                <p className="text-gray-400 mb-10 font-bold text-sm">We've received your transmission. Our team will review your credentials shortly.</p>
                                <button
                                    onClick={() => setStatus('')}
                                    className="px-8 py-3 rounded-full border border-white/10 text-white/50 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all"
                                >
                                    Back to Form
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8 relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {inputFields.map((field, idx) => (
                                    <motion.div
                                        key={field.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.08 }}
                                        className="relative group"
                                    >
                                        <label className="block text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-3 ml-1 group-focus-within:text-ivc-secondary transition-colors duration-300">
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedField === field.name ? 'text-ivc-secondary' : 'text-gray-600'}`}>
                                                {field.icon}
                                            </div>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField(field.name)}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-ivc-secondary/20 focus:border-ivc-secondary/30 focus:bg-white/[0.05] transition-all duration-300 text-sm"
                                            />
                                            {/* Bottom glow on focus */}
                                            {focusedField === field.name && (
                                                <motion.div
                                                    layoutId="input-glow"
                                                    className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-ivc-secondary/50 to-transparent"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <LiquidButton
                                        type="submit"
                                        loading={status === 'submitting'}
                                        className="w-full !py-6 !rounded-2xl !text-sm !font-black !tracking-[0.4em]"
                                        variant="primary"
                                    >
                                        {status === 'submitting' ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
                                    </LiquidButton>
                                </motion.div>
                                <p className="text-center text-white/15 text-[10px] font-black uppercase tracking-[0.3em] mt-4">
                                    Your data is secure with us
                                </p>
                            </div>

                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Join;
