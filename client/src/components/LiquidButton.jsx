import { motion } from 'framer-motion';

const LiquidButton = ({
    children,
    onClick,
    className = "",
    variant = "primary", // primary, secondary, glass
    loading = false,
    disabled = false,
    type = "button"
}) => {
    // Variants Mapping
    const variants = {
        primary: "dark:bg-white dark:text-black bg-black text-white hover:opacity-90 border-white/20 shadow-liquid",
        secondary: "bg-ivc-primary text-white hover:bg-ivc-primary/90 border-white/10 shadow-liquid",
        glass: "dark:bg-white/5 bg-black/[0.03] dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/5 border-black/5 dark:border-white/10 backdrop-blur-md"
    };

    return (
        <motion.button
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`
        relative px-10 py-4 rounded-full font-black tracking-widest text-xs uppercase 
        flex items-center justify-center gap-3 transition-all border
        ${variants[variant]} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        group overflow-hidden
      `}
        >
            {/* Liquid Glare Effect */}
            <span className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none">
                <span className="absolute inset-0 dark:bg-gradient-to-tr dark:from-white/20 bg-gradient-to-tr from-ivc-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute -inset-[100%] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.1)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 animate-liquid pointer-events-none" />
            </span>

            <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                ) : children}
            </span>

            {/* Subtle Glow beneath */}
            <motion.div
                className="absolute -inset-1 dark:bg-white/10 bg-indigo-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10"
            />
        </motion.button>
    );
};

export default LiquidButton;
