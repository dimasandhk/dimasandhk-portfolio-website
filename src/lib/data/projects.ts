export interface Project {
    title: string;
    image?: string;
    tags: string[];
    description?: string;
    icon?: string;
    timeline: string;
    preview?: string;
    sources?: { label: string; url: string }[];
    category: 'Achievements' | 'Apps' | 'Bots' | 'System Testing / Utils';
    featured?: boolean;
}

export const projects: Project[] = [
    {
        title: "BEM ITS Official Website",
        tags: ["Next.js", "Cloudinary", "Tailwind CSS", "Cloudflare"],
        image: "/projects/bemits.png",
        description: "The official website for the Student Executive Board of ITS (BEM ITS). Built to serve thousands of students with news, transparency reports, and event information. Features a custom CMS for easy content management and optimized for high traffic.",
        icon: "🏛️",
        timeline: "Mar 2025 - Present",
        preview: "https://bem-its.com",
        category: "Apps",
        featured: true
    },
    {
        title: "Autonomous UAV Control System Software",
        tags: ["Python", "Flask", "Firebase", "React", "Tailwind CSS", "MAVLink"],
        image: "/projects/bayu.jpg",
        description: "A comprehensive ground control station (GCS) software for autonomous UAVs. Features real-time telemetry tracking, mission planning interface, and safety override protocols. Used in the KRTI national robotics competition.",
        icon: "✈️",
        timeline: "Mar 2024 - Present",
        category: "System Testing / Utils",
        featured: true
    },
    {
        title: "SRE ITS Official Website",
        tags: ["Next.js", "Tailwind CSS"],
        image: "/projects/sre.png",
        description: "Official platform for the Society of Renewable Energy ITS Student Chapter. Showcases renewable energy projects, upcoming events, and educational resources. Designed with a clean, eco-friendly aesthetic.",
        icon: "⚡",
        timeline: "Aug 2024 - Jul 2025",
        preview: "https://sre-its.com",
        category: "Apps",
        featured: true
    },
    {
        title: "SustainaMap",
        tags: ["Next.js", "Leaflet", "Tailwind CSS", "MongoDB", "ExpressJS"],
        image: "/projects/sustainamap.png",
        description: "An interactive mapping platform designed to visualize environmental data and sustainable initiatives. Users can pin locations, view detailed environmental metrics, and filter by sustainability categories.",
        icon: "🗺️",
        timeline: "2025",
        sources: [
            { label: "Frontend Source Code", url: "https://github.com/Ax3lrod/sustainamap-fe" },
            { label: "Backend Source Code", url: "https://github.com/dimasandhk/be-fit-sustainamap/" }
        ],
        category: "Apps",
        featured: true
    },
    {
        title: "Discord Music Bot",
        tags: ["Node.js", "Discord.js", "FFmpeg"],
        icon: "🤖",
        timeline: "2023",
        description: "A high-performance music bot for Discord servers supporting YouTube, Spotify, and SoundCloud links. Features queue management, lyrics display, and audio filters.",
        category: "Bots"
    },
    {
        title: "E2E Testing Suite for E-Commerce",
        tags: ["Cypress", "JavaScript", "GitHub Actions"],
        icon: "🧪",
        timeline: "2024",
        description: "Automated end-to-end testing suite ensuring reliability of checkout flows, user authentication, and inventory management for a high-scale e-commerce platform.",
        category: "System Testing / Utils"
    },
    {
        title: "GEMASTIK XVIII Smart City - 2nd Place",
        tags: ["Award", "Smart City", "IoT"],
        icon: "🏆",
        timeline: "2025",
        description: "Won 2nd place in the Smart City division for developing an innovative flood control system integration for Jakarta.",
        category: "Achievements"
    },
    {
        title: "KRTI 2025 - 2nd Place Tech Development",
        tags: ["Award", "UAV", "Robotics"],
        icon: "🥈",
        timeline: "2025",
        description: "Designed and implemented advanced control systems for unmanned aerial vehicles for disaster surveillance and response.",
        category: "Achievements"
    },
    {
        title: "Hackathon Fit Competition 2025 - 3rd Place",
        tags: ["Award", "Web", "Hackathon"],
        icon: "🥉",
        timeline: "2025",
        description: "Developed an interactive mapping platform designed to translate complex environmental data into intuitive, personalized visuals.",
        category: "Achievements"
    },
    {
        title: "KRTI 2024 - Best Methodology Award",
        tags: ["Award", "Methodology", "Robotics"],
        icon: "📝",
        timeline: "2024",
        description: "Recognized for comprehensive methodology of our innovation and systematic engineering approach.",
        category: "Achievements"
    }
];
