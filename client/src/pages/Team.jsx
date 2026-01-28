import { motion } from 'framer-motion';

const Team = () => {
    // Layout based on user's specific grouping: 
    // Coord/Mentor(2), Pres/VP/Sec(4), Op(2), Proj(2), Treas(1), Design(3), Comm(4), Social(2)
    // Layout based on user's specific grouping: 
    // Coord/Mentor(2), Pres/VP/Sec(4), Op/Proj(4), Treas(1), Design(3), Comm(4), Social(2)
    const layoutConfiguration = [2, 4, 4, 1, 3, 4, 2];

    // Explicitly defining roles in order
    const teamRoles = [
        { name: "Member Name", role: "Coordinator" },
        { name: "Member Name", role: "Mentor" },
        { name: "Member Name", role: "President" },
        { name: "Member Name", role: "Vice President" },
        { name: "Member Name", role: "Secretary" },
        { name: "Member Name", role: "Secretary" },
        { name: "Member Name", role: "Operational Lead" },
        { name: "Member Name", role: "Operational Lead" },
        { name: "Member Name", role: "Project Lead" },
        { name: "Member Name", role: "Project Lead" },
        { name: "Member Name", role: "Treasurer" },
        { name: "Member Name", role: "Design & Documentation Lead" },
        { name: "Member Name", role: "Design & Documentation Lead" },
        { name: "Member Name", role: "Design & Documentation Lead" },
        { name: "Member Name", role: "Communication & Outreach Lead" },
        { name: "Member Name", role: "Communication & Outreach Lead" },
        { name: "Member Name", role: "Communication & Outreach Lead" },
        { name: "Member Name", role: "Communication & Outreach Lead" },
        { name: "Member Name", role: "Social Media & Marketing Lead" },
        { name: "Member Name", role: "Social Media & Marketing Lead" },
    ];

    // Map to objects with IDs
    const teamMembers = teamRoles.map((member, i) => {
        let image = null;

        // Specific Image Assignments by Index
        if (member.role === "Coordinator") {
            image = "/images/team/coordinator.jpg";
        } else if (member.role === "Mentor") {
            image = "/images/team/mentor.jpg";
        } else if (member.role === "Secretary") {
            if (i === 4) image = "/images/team/secretary_1.jpg";
        } else if (member.role === "Operational Lead") {
            if (i === 6) image = "/images/team/operational_lead.jpg";
            if (i === 7) image = "/images/team/operational_lead_2.jpg";
        } else if (member.role === "Project Lead") {
            if (i === 8) image = "/images/team/project_lead_1.jpg";
            if (i === 9) image = "/images/team/project_lead_2.jpg";
        } else if (member.role === "Communication & Outreach Lead") {
            // Assign specific images to the first two Communication leads based on their global index
            // Communication leads are at indices 14, 15, 16, 17
            if (i === 14) image = "/images/team/comm_outreach_1.jpg";
            if (i === 15) image = "/images/team/comm_outreach_2.jpg";
            if (i === 16) image = "/images/team/comm_outreach_3.png";
        } else if (member.role === "Social Media & Marketing Lead") {
            if (i === 18) image = "/images/team/social_media_1.jpg";
            if (i === 19) image = "/images/team/social_media_2.jpg";
        }

        return {
            id: i + 1,
            ...member,
            image
        };
    });

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
                        className={`flex flex-wrap justify-center gap-6 ${row.length > 3 ? 'md:flex-nowrap' : ''}`}
                    >
                        {row.map((member, index) => {
                            const isBigCard = member.role === "Coordinator" || member.role === "Mentor";
                            // 1.5x size for big cards: w-48 * 1.5 = w-72. Image w-28 * 1.5 ≈ w-40 (10rem)
                            const cardWidth = isBigCard ? "w-72" : "w-48";
                            const imgSize = isBigCard ? "w-40 h-40" : "w-28 h-28";

                            return (
                                <div key={member.id} className="flex items-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 glass-panel glass-panel-hover rounded-2xl flex flex-col items-center ${cardWidth}`}
                                    >
                                        <div className={`${imgSize} bg-gray-300 rounded-full mb-3 relative overflow-hidden group-hover:scale-105 transition-transform`}>
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover object-top scale-125"
                                                />
                                            ) : (
                                                /* Placeholder for image */
                                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-400 group-hover:from-gray-300 group-hover:to-gray-500"></div>
                                            )}
                                        </div>
                                        <h3 className={`font-bold mb-1 text-ivc-dark-text ${isBigCard ? 'text-2xl' : 'text-lg'}`}>{member.name}</h3>
                                        <p className={`text-ivc-primary font-medium tracking-wide ${isBigCard ? 'text-base' : 'text-xs'}`}>{member.role}</p>
                                    </motion.div>

                                    {/* Vertical Divider after Vice President (Index 1 in this row of 4) */}
                                    {row.length === 4 && index === 1 && rowIndex === 1 && (
                                        <div className="h-32 w-px bg-gray-500/20 ml-6 hidden md:block"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
