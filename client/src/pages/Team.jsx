import { motion } from 'framer-motion';

const Team = () => {
    // Current layout requests: 2, 2, 2, 2, 2, 3, 4, 2 boxes
    const layoutConfiguration = [2, 2, 2, 2, 2, 3, 4, 2];

    // Generate enough dummy data to fill the layout (Total 19)
    const totalMembers = layoutConfiguration.reduce((a, b) => a + b, 0);
    const teamMembers = Array.from({ length: totalMembers }, (_, i) => ({
        id: i + 1,
        name: "Member Name",
        role: "Coordinator",
        image: null // Placeholder
    }));

    // Helper to slice data based on layout config
    let currentIndex = 0;
    const rows = layoutConfiguration.map((count) => {
        const rowMembers = teamMembers.slice(currentIndex, currentIndex + count);
        currentIndex += count;
        return rowMembers;
    });

    return (
        <div className="pt-24 pb-24 px-4 max-w-7xl mx-auto text-center text-ivc-text">
            <h1 className="text-4xl font-bold mb-12 underline underline-offset-8 decoration-ivc-primary/30">Meet the Team</h1>

            <div className="space-y-8">
                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        {row.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-[#050505] border border-gray-800 rounded-2xl hover:border-ivc-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] flex flex-col items-center w-72"
                            >
                                <div className="w-32 h-32 bg-gray-300 rounded-full mb-6 relative overflow-hidden group-hover:scale-105 transition-transform">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-400 group-hover:from-gray-300 group-hover:to-gray-500"></div>
                                </div>
                                <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                                <p className="text-ivc-primary text-sm font-medium tracking-wide">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
