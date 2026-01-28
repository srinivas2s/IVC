import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github, MessageCircle } from 'lucide-react';

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.231-.298.347-.497.116-.198.058-.372-.029-.545-.087-.174-.787-1.897-1.078-2.599-.283-.679-.571-.586-.787-.597-.197-.01-.422-.012-.647-.012-.224 0-.588.085-.895.421-.308.337-1.173 1.147-1.173 2.798 0 1.652 1.203 3.248 1.371 3.473.168.224 2.368 3.618 5.736 5.071 3.369 1.453 3.369.967 3.992.893.623-.075 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const Join = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        year: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await fetch('/api/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', department: '', year: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="pt-20 pb-24 px-4 max-w-xl mx-auto flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-ivc-secondary to-ivc-accent underline underline-offset-8 decoration-ivc-primary/30">
                    Join the Innovation Club
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 bg-ivc-card dark:bg-ivc-dark-card p-8 rounded-xl border border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-ivc-primary dark:hover:border-ivc-primary hover:shadow-ivc-primary/20">
                    {['Name', 'Email', 'Department', 'Year'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{field}</label>
                            <input
                                type={field === 'Email' ? 'email' : 'text'}
                                name={field.toLowerCase()}
                                value={formData[field.toLowerCase()]}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-0 bg-white dark:bg-gray-800 py-2 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-ivc-primary sm:text-sm sm:leading-6 px-3 transition-all placeholder:text-gray-400"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full justify-center rounded-md bg-ivc-primary px-3 py-2 text-sm font-semibold leading-6 text-gray-200 shadow-sm hover:bg-ivc-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivc-primary disabled:opacity-50 transition-all hover:scale-[1.02]"
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Join Now'}
                    </button>

                    {status === 'success' && <p className="text-green-400 text-center animate-pulse">Welcome to IVC! Check your email.</p>}
                    {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Ensure backend is running.</p>}
                </form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 text-center"
                id="contact"
            >
                <div className="bg-ivc-card dark:bg-ivc-dark-card/50 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
                    <h3 className="text-2xl font-bold text-ivc-text dark:text-ivc-dark-text mb-3">
                        Connect With Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Follow our socials to stay updated!
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6">
                        {[
                            {
                                Icon: Instagram,
                                href: "#",
                                colorClass: "hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C]" // Instagram Brand Color
                            },
                            {
                                Icon: Linkedin,
                                href: "#",
                                colorClass: "hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:text-[#0077b5]" // LinkedIn Brand Color
                            },
                            {
                                Icon: Github,
                                href: "#",
                                colorClass: "hover:border-white hover:bg-white/10 hover:text-white" // GitHub (White for dark mode)
                            },
                            {
                                Icon: MessageCircle,
                                href: "#",
                                colorClass: "hover:border-green-500 hover:bg-green-500/10 hover:text-green-500" // Chat (Green)
                            }
                        ].map(({ Icon, href, colorClass }, index) => (
                            <a
                                key={index}
                                href={href}
                                className={`p-3 rounded-full border border-gray-500/30 transition-all duration-300 group hover:scale-125 hover:-translate-y-1 ${colorClass}`}
                            >
                                <Icon className="w-6 h-6 text-gray-400 transition-colors group-hover:text-current" />
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default Join;
