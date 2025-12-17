export type ProjectCategory = 'Achievements' | 'Apps' | 'Bots' | 'System Testing / Utils';

export interface Project {
    title: string;
    image?: string;
    tags: string[];
    description?: string;
    icon?: string;
    timeline: string;
    preview?: string;
    sources?: { label: string; url: string }[];
    gallery?: string[]; // Added gallery support
    category: ProjectCategory[];
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
        category: ["Apps"],
        // featured: true
    },
    {
        title: "SRE ITS Official Website",
        tags: ["Next.js", "Tailwind CSS", "SEO"],
        image: "/projects/sre.png",
        description: "Official platform for the Society of Renewable Energy ITS Student Chapter. Showcases renewable energy projects, upcoming events, and educational resources. Designed with a clean, eco-friendly aesthetic.",
        icon: "⚡",
        timeline: "Aug 2024 - Jul 2025",
        preview: "https://sre-its.com",
        category: ["Apps"],
        featured: true
    },
    {
        title: "Hackathon Fit Compe 2025 - 3rd Place",
        tags: ["Next.js", "Leaflet", "Tailwind CSS", "MongoDB", "ExpressJS", "Tanstack Router"],
        image: "/projects/sustainamap.png",
        description: "An interactive mapping platform designed to visualize environmental data and sustainable initiatives. Users can pin locations, view detailed environmental metrics, and filter by sustainability categories.",
        icon: "🥉️",
        timeline: "2025",
        sources: [
            { label: "Frontend Source Code", url: "https://github.com/Ax3lrod/sustainamap-fe" },
            { label: "Backend Source Code", url: "https://github.com/dimasandhk/be-fit-sustainamap/" }
        ],
        gallery: [
             "/projects/achievements/fitcompe1.webp",
             "/projects/achievements/fit1.png",
             "/projects/achievements/fit2.png",
             "/projects/achievements/fit3.png",
             "/projects/achievements/fit4.png",
        ],
        category: ["Achievements", "Apps"],
        featured: true
    },
    {
        title: "KRTI 2025 - 2nd Place Tech Development",
        tags: ["AWS", "Flask", "Firebase", "React", "Tailwind CSS", "MAVLink"],
        image: "/projects/bayu.jpg",
        icon: "🥈",
        timeline: "Mar 2024 - Present",
        preview: "https://youtu.be/Cgao-0TH2Wo?si=sdB9NYZyq2IQjZnt&t=5900",
        description: "A comprehensive ground control station (GCS) software for autonomous UAVs. Features real-time telemetry tracking, mission planning interface, and safety override protocols. Used in the KRTI national robotics competition.",
        category: ["Achievements", "Apps"],
        gallery: [
            "/projects/achievements/bayu1.jpg",
            "/projects/achievements/bayu2.jpg",
        ],
        featured: true
    },
    {
        title: "Abang Jago Entertainment Discord Bot",
        tags: ["Node.js", "Discord.js", "jpeg canvas"],
        icon: "🤖",
        timeline: "Nov 2021",
        description: "A Multi Purpose Discord Bot (Entertainment, Utility, etc). Features fun fact, meme generator, mini games, and more.",
        image: "/projects/abangjagobo.png",
        sources: [
            { label: "Source Code", url: "https://github.com/dimasandhk/abang-jago-bot" }
        ],
        category: ["Bots"],
        featured: true,
        gallery: [
             "/projects/bots/abang1.png",
             "/projects/bots/abang2.png",
             "/projects/bots/abang3.png",
             "/projects/bots/abang4.png"
        ],
    },
    {
        title: "Free Epic Game Info Discord Bot",
        tags: ["Node.js", "Discord.js"],
        icon: "🤖",
        timeline: "Mar 2025",
        description: "A Discord bot that provides information about free epic games. Features game search, game details, and more.",
        image: "/projects/epicgamesbot.jpg",
        sources: [
            { label: "Source Code", url: "https://github.com/dimasandhk/free-epic-games" }
        ],
        category: ["Bots"]
    },
    {
        title: "Muslim Prayer Room Scraper",
        tags: ["Node.js", "Cheerio", "Puppeteer", "ExpressJS"],
        icon: "🕌",
        timeline: "May 2021",
        description: "A scraper that scrapes the prayer room data from the website and serves it as an API.",
        image: "/projects/prayerroomscrape.png",
        sources: [
            { label: "Source Code", url: "https://github.com/dimasandhk/api-masjid-mushalla-indonesia/" }
        ],
        category: ["System Testing / Utils"]
    },
    {
        title: "GEMASTIK XVIII Smart City - 2nd Place",
        tags: ["IoT", "Next.js", "React Native", "Tailwind CSS", "Leaflet", "Mapbox"],
        icon: "🏆",
        timeline: "Jul 2025 - Oct 2025",
        description: "Won 2nd place in the Smart City division for developing an innovative flood control system integration for Jakarta. ARJUNA (Adaptive Real-time Joint-response Urban flood Navigation & Alleviation): Sistem Kendali Banjir Prediktif Berbasis AI dan Digital Twin untuk Kota Jakarta",
        image: "/projects/gemastik.jpg",
        // sources: [
        //     { label: "Source Code", url: "https://github.com/dimasandhk/gemastik-xviii-smart-city" }
        // ],
        preview: "https://www.youtube.com/live/jEd5YEnG3o8?si=HzCuaPaNP-NTVRQm&t=2129",
        gallery: [
            "/projects/achievements/gemastik1.webp",
            "/projects/achievements/gemastik2.webp"
        ],
        category: ["Achievements", "Apps"],
        featured: true
    },
    {
        title: "TEDxITS 2025 Website",
        tags: ["Next.js", "Tailwind CSS", "GSAP", "Ngrok", "Tanstack Router", "Shadcn UI", "Framer Motion", "SEO"],
        icon: "🃏",
        timeline: "Nov 2024 - May 2025",
        description: "TEDxITS is a TEDx event held by students of Institut Teknologi Sepuluh Nopember. The name ITS shows that TEDxITS event represents all elements of Institut Teknologi Sepuluh Nopember without leading to anyone or several specific parts in it. We aim to provide an experience for individuals to delve into a journey of self-awareness by being reflective of one's self to discover one's passion and thrive in the respective field in order to give impact to others, and ultimately, the whole world.",
        image: "/projects/tedxits.png",
        preview: "https://tedxits2025-frontend.vercel.app/",
        category: ["Apps"]
    },
    {
        title: "ARA5 Website",
        tags: ["Next.js", "Tailwind CSS", "Tanstack Router", "SEO"],
        icon: "👩‍💻",
        timeline: "Oct 2023 - Jun 2024",
        description: "Developed the official web platform for A Renewal Agent (ARA), a major annual IT event organized by HMIT ITS. The platform serves as the central hub for thousands of participants, facilitating registration and information dissemination for national-level competitions such as OlimpIT and Capture the Flag (CTF). Focus was placed on creating a responsive, user-friendly interface to handle high traffic during event registration periods.",
        image: "/projects/araits.png",
        preview: "https://ara5-frontend-main.vercel.app/",
        category: ["Apps"]
    },
    {
        title: "ARA6 Website",
        tags: ["Next.js", "Tailwind CSS", "Tanstack Router", "SEO"],
        icon: "👩‍💻",
        timeline: "Oct 2023 - Jun 2024",
        description: "Developed the official web platform for A Renewal Agent (ARA), a major annual IT event organized by HMIT ITS. The platform serves as the central hub for thousands of participants, facilitating registration and information dissemination for national-level competitions such as OlimpIT and Capture the Flag (CTF). Focus was placed on creating a responsive, user-friendly interface to handle high traffic during event registration periods.",
        image: "/projects/ara6.png",
        preview: "https://ara6-frontend-main.vercel.app/",
        category: ["Apps"]
    },
    {
        title: "IniLhoITS 2025 Website",
        tags: ["Next.js", "Grafana", "Tanstack Router", "Headless UI", "Google Analytics", "Tailwind CSS"],
        icon: "🏫",
        timeline: "Oct 2024 - Jan 2025",
        description: "INI LHO ITS! is the flagship integrated event of Institut Teknologi Sepuluh Nopember (ITS). Its mission is to introduce the university ecosystem—including its faculties, majors, and campus culture—to high school students throughout Indonesia and the world. The platform serves as a bridge, helping students discover their dream majors through interactive content and massive online tryouts.",
        image: "/projects/ilits25.png",
        preview: "https://ilits2025-frontend-dev.vercel.app/",
        category: ["Apps"]
    },
    {
        title: "EduVision Text Recog Powered by LLM",
        tags: ["Flask", "OpenCV", "EasyOCR", "Pillow", "OpenAI RAG"],
        icon: "📃",
        timeline: "Jun 2025",
        description: "EduVision is an innovative multimedia platform designed to bridge the gap between physical educational materials and digital workflows. By integrating Optical Character Recognition (OCR) with Large Language Models (LLMs), the project aims to streamline the digitalization of handwritten or printed notes, making learning more interactive and accessible.",
        image: "/projects/tekmul.png",
        sources: [
            { label: "Source Code", url: "https://github.com/dimasandhk/eduvision-fp-tekmul" }
        ],
        preview: "https://youtu.be/aGT5qPdILh8?si=oKpQZT6CiAy4Hfv0",
        category: ["Apps"]
    },
    {
        title: "Scam Detection Bot WA",
        tags: ["Node.js", "Google GENAI", "WhatsApp API", "QRCode Terminal"],
        icon: "🕵️",
        timeline: "Jun 2025",
        description: "The Problem: University environments are frequent targets for social engineering attacks, specifically the 'Dosen Minta Pulsa' scam, where fraudsters impersonate lecturers to demand money or phone credit from students. The Solution: I developed an automated WhatsApp bot acting as a dual-layer security shield for the ITS community. The bot allows users to verify suspicious numbers and messages instantly. It combines static database verification with dynamic AI analysis to determine the legitimacy of a contact.",
        image: "/projects/botsoceng.png",
        sources: [
            { label: "Source Code", url: "https://github.com/dimasandhk/bot-soceng" }
        ],
        gallery: [
            "/projects/bots/soceng1.png",
            "/projects/bots/soceng2.png"
        ],
        category: ["Bots"]
    },
    {
        title: "High-Availability Cloud Architecture",
        tags: ["Nginx", "Docker", "Digital Ocean", "Locust", "Load Balancer", "MongoDB"],
        icon: "📈",
        timeline: "Jun 2024",
        description: `Project Overview:\n
Designed and deployed a scalable cloud infrastructure for a Sentiment Analysis application under a strict budget constraint of $65/month. The goal was to create a fault-tolerant architecture capable of handling high-traffic loads using Digital Ocean droplets.<br>
Architectural Solution:\n
We implemented a 3-node distributed system consisting of:\n
1 Load Balancer Node: Configured with Nginx using a Round-Robin algorithm and optimized caching policies to distribute traffic efficiently.\n
2 Worker Nodes: Each hosting the full application stack (Nginx, Python Flask, Gunicorn with Gevent for concurrency) and a local MongoDB instance.\n\m
Key Achievements:\n
High Performance: Achieved a maximum throughput of 1,015 Requests Per Second (RPS) with zero failure rate during stress testing using Locust.\n
Cost Efficiency: Successfully optimized the architecture to run effectively on 3 AMD VMs (~$63/mo), staying under the $65 budget cap.\n
Stability: Maintained stable response times (~200ms) under medium load, with graceful degradation at peak concurrency.`,
        image: "/projects/fptka.jpg",
        sources: [
            { label: "Source Code + Preview", url: "https://github.com/dimasandhk/fp-cloud-computing-b4" }
        ],
        category: ["System Testing / Utils"]
    },
];
