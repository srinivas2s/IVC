import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, School, Calendar, CheckCircle } from 'lucide-react';

const Join = ({ isModal = false }) => {
    const [formData, setFormData] = useState({ name: '', email: '', department: '', year: '' });
    const [status, setStatus] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', department: '', year: '' });
        }, 2000);
    };

    const fields = [
        { name: 'name', label: 'FULL NAME', icon: User, type: 'text', placeholder: 'Your Name' },
        { name: 'email', label: 'EMAIL', icon: Mail, type: 'email', placeholder: 'your@email.com' },
        { name: 'department', label: 'DEPARTMENT', icon: School, type: 'text', placeholder: 'Computer Science' },
        { name: 'year', label: 'YEAR', icon: Calendar, type: 'text', placeholder: '3rd Year' },
    ];

    return (
        <div className={isModal ? "w-full py-4 px-2" : "pt-40 pb-24 px-4 max-w-2xl mx-auto min-h-screen flex flex-col justify-center"}>
            <motion.div
                initial={isModal ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-5xl font-black tracking-wider uppercase text-white mb-3">
                        JOIN <span className="text-cyan-400 text-glow-cyan">IVC</span>
                    </h2>
                    <div className="h-[2px] w-12 bg-cyan-400/50 mx-auto mb-4" />
                    <p className="font-display text-[9px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase">
                        Empowering the next generation of visionaries
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="glow-card rounded-2xl p-12 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="text-cyan-400" size={40} />
                            </motion.div>
                            <h3 className="font-display text-xl font-black tracking-wider text-white uppercase mb-3">Application Filed!</h3>
                            <p className="text-white/30 text-sm font-medium mb-8">We'll review your credentials shortly.</p>
                            <button onClick={() => setStatus('')} className="font-display text-[10px] tracking-[0.3em] text-cyan-400/60 uppercase hover:text-cyan-400 transition-colors border border-cyan-400/10 px-6 py-3 rounded-lg hover:border-cyan-400/30">
                                BACK TO FORM
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {fields.map((field, idx) => {
                                    const Icon = field.icon;
                                    return (
                                        <motion.div
                                            key={field.name}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.06 }}
                                        >
                                            <label className="block font-display text-[9px] tracking-[0.3em] text-white/20 uppercase mb-2 ml-1">
                                                {field.label}
                                            </label>
                                            <div className="relative group">
                                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === field.name ? 'text-cyan-400' : 'text-white/15'}`}>
                                                    <Icon size={16} />
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
                                                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl py-4 pl-12 pr-4 text-white text-sm font-medium placeholder-white/10 focus:outline-none focus:border-cyan-400/30 focus:bg-white/[0.03] transition-all duration-300"
                                                />
                                                {focusedField === field.name && (
                                                    <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 rounded-xl font-display text-[11px] tracking-[0.4em] uppercase border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] disabled:opacity-50 transition-all duration-500"
                                >
                                    {status === 'submitting' ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Join;

