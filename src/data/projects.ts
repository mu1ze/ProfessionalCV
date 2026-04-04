export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    tech: string[];
    github: string;
    live: string;
    features: string[];
    useCases: string[];
    structure: string;
    demoVideo?: string; // URL to mp4 or webm
    screenshots?: string[]; // URLs to images
    heroImage?: string; // Main image for the modal header
    videos?: {
        url: string;
        title: string;
        description: string;
    }[]; // Array of feature videos
    featured?: boolean;
    problem: string;
    solution: string;
    impact: string;
}

export const projects: Project[] = [
    {
        id: 'pink-crown',
        title: 'Pink Crown',
        description: 'Comprehensive e-commerce and booking management ecosystem for beauty professionals. Scalable, secure, and client-focused.',
        fullDescription: 'Pink Crown is a dual-interface platform designed to revolutionize how beauty professionals manage their business. It combines a high-performance e-commerce storefront for customers with a powerful admin dashboard for inventory, appointments, and CRM.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Resend'],
        github: '#',
        live: '#',
        features: [
            'Full-featured E-commerce Storefront',
            'Intelligent Admin Dashboard',
            'Automated Appointment Booking & Reminders',
            'Inventory & Order Management',
            'Secure RESTful API Architecture'
        ],
        useCases: [
            'Beauty Professionals managing 100+ monthly clients',
            'E-commerce scaling with automated inventory',
            'Client retention via automated CRM tools'
        ],
        structure: 'Frontend decoupled into Client and Admin apps using React. Backend connects via a secure Node.js REST API to a hosted PostgreSQL database. Deployment optimized via Netlify with CI/CD pipelines.',
        heroImage: 'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2010.58.21%20AM.png',
        videos: [
            {
                url: 'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screen%20Recording%202026-02-11%20at%2010.53.32%20AM.mov',
                title: 'Project Demo',
                description: 'A complete walkthrough of the Pink Crown ecosystem, showcasing the client booking flow.'
            }
        ],
        screenshots: [
            'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2010.57.41%20AM.png',
            'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2010.57.56%20AM.png',
            'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2010.57.41%20AM.png',
            'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2010.58.34%20AM.png',
            'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2010.58.43%20AM.png',
            'https://viholordwdwscgecabqo.supabase.co/storage/v1/object/public/portfolio-media/PinkCrown/Screenshot%202026-02-11%20at%2011.00.48%20AM.png'
        ],
        featured: true,
        problem: "Beauty professionals struggle with fragmented tools for booking, inventory, and payments, leading to lost revenue and administrative burnout.",
        solution: "A unified ecosystem integrating e-commerce and booking. Custom-built admin dashboard centralizes operations, while the client-facing app ensures a seamless booking experience.",
        impact: "Streamlined operations for beta users, reducing admin time by 40%. Enabled 24/7 booking capability, projected to increase appointment volume by 25%."
    },
    {
        id: 'high-heat',
        title: 'High_Heat',
        description: 'Sports-focused social platform connecting athletes with local games and facilities. Real-time scheduling and geospatial discovery.',
        fullDescription: 'High_Heat solves the "where need to play" problem for amateur athletes. It enables users to create, manage, and join local pickup games while delivering intelligent facility recommendations based on location and amenities.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Supabase'],
        github: '#',
        live: '#',
        features: [
            'Geospatial Facility Discovery (Google Maps)',
            'Real-time Game Scheduling & Joining',
            'User Profile & Stats Tracking',
            'Secure Auth & Data Scalability (Supabase)',
            'Responsive Mobile-First Interface'
        ],
        useCases: [
            'Athletes finding pickup games',
            'Facilities maximizing off-peak usage',
            'Communities building local sports leagues'
        ],
        structure: 'React frontend optimized for mobile. Node.js backend handling complex scheduling logic. Supabase used for auth, real-time subscriptions, and scalable data storage.',
        demoVideo: '',
        screenshots: [],
        featured: true,
        problem: "Amateur athletes lack a centralized platform to find local pickup games and suitable facilities, relying on disjointed group chats and static maps.",
        solution: "A geolocation-first social platform. 'High_Heat' aggregates facility data and user-created games, allowing real-time discovery and joining via an intuitive map interface.",
        impact: "Facilitates community building by removing friction from organizing games. MVP testing showed a 50% reduction in time-to-game-coordination for local groups."
    },
    {
        id: 'job-hunter',
        title: 'Job-Hunter',
        description: 'This project optimizes your chances of getting your resume viewed by a recruiter.',
        fullDescription: 'Job-Hunter is a tool designed to maximize resume visibility in applicant tracking systems and recruiter workflows. It analyzes job descriptions, tailors resume content, and tracks applications to improve the overall job search success rate.',
        tech: ['TypeScript', 'PLpgSQL', 'PostgreSQL', 'Node.js'],
        github: 'https://github.com/mu1ze/Job-Hunter',
        live: '#',
        features: [
            'Resume optimization against job descriptions',
            'ATS keyword analysis and scoring',
            'Application tracking dashboard',
            'PostgreSQL-backed persistence layer',
            'Stored procedure logic via PLpgSQL'
        ],
        useCases: [
            'Job seekers improving resume-to-role match rates',
            'Tracking active applications across multiple companies',
            'Identifying keyword gaps between resume and job postings'
        ],
        structure: 'TypeScript backend with a PostgreSQL database. Business logic encapsulated in PLpgSQL stored procedures for performance. REST API layer exposes endpoints for the client interface.',
        featured: true,
        problem: "Most job seekers send generic resumes and never hear back, unable to identify why their applications are filtered out by ATS systems.",
        solution: "Job-Hunter parses job descriptions and cross-references them with resume content, surfacing missing keywords and ranking optimization suggestions.",
        impact: "Helps candidates tailor applications more precisely, increasing the likelihood of recruiter review and interview callbacks."
    },
    {
        id: 'sales-stride-pro',
        title: 'sales-stride-pro',
        description: 'A sales productivity platform built to streamline outreach, track pipelines, and accelerate deal closure.',
        fullDescription: 'sales-stride-pro is a full-stack sales enablement application built with TypeScript and EJS templating. It provides sales teams with tools to manage leads, track deal stages, and generate performance reports.',
        tech: ['TypeScript', 'EJS', 'Node.js', 'HTML', 'CSS'],
        github: 'https://github.com/mu1ze/sales-stride-pro',
        live: '#',
        features: [
            'Lead management and pipeline visualization',
            'EJS server-side rendered views',
            'Deal stage tracking and forecasting',
            'Team performance reporting',
            'Responsive UI with CSS styling'
        ],
        useCases: [
            'Sales teams managing high-volume prospect lists',
            'Managers tracking rep performance and pipeline health',
            'SMBs needing a lightweight CRM alternative'
        ],
        structure: 'Node.js/TypeScript server rendering HTML via EJS templates. Stateless session handling with lightweight persistence. Modular route structure separating leads, deals, and reporting concerns.',
        featured: true,
        problem: "Sales teams rely on bloated CRM platforms that slow down daily workflows and obscure key pipeline metrics.",
        solution: "A streamlined sales tool that surfaces only the data reps need — leads, deal stages, and next actions — with a fast server-rendered interface.",
        impact: "Reduces context-switching for sales reps and gives managers real-time visibility into pipeline health without enterprise CRM overhead."
    },
    {
        id: 'mirofish',
        title: 'MiroFish',
        description: 'A Simple and Universal Swarm Intelligence Engine, Predicting Anything.',
        fullDescription: 'MiroFish is a swarm intelligence engine inspired by emergent behaviors in nature. Built with Python and Vue.js, it models distributed agent systems to simulate and predict complex outcomes across configurable scenarios.',
        tech: ['Python', 'Vue.js', 'Docker'],
        github: 'https://github.com/mu1ze/MiroFish',
        live: '#',
        features: [
            'Universal swarm intelligence simulation engine',
            'Vue.js interactive frontend for real-time visualization',
            'Dockerized deployment for portability',
            'Configurable agent behaviors and environments',
            'Python-powered prediction and analysis backend'
        ],
        useCases: [
            'Researchers modeling emergent collective behavior',
            'Engineers simulating distributed system dynamics',
            'Data scientists experimenting with bio-inspired algorithms'
        ],
        structure: 'Python backend implements the core swarm engine and exposes a REST API. Vue.js frontend renders real-time agent visualizations. The full stack is containerized with Docker for reproducible deployment.',
        featured: true,
        problem: "Swarm intelligence research requires complex simulation infrastructure that is difficult to set up, configure, and visualize.",
        solution: "MiroFish abstracts the complexity into a universal engine with a clean Vue.js interface, making swarm simulations accessible and configurable without deep infrastructure knowledge.",
        impact: "Enables rapid experimentation with swarm models, lowering the barrier to entry for bio-inspired computing research and distributed system design."
    },
    {
        id: 'adam-website',
        title: 'adam-website',
        description: 'A personal portfolio and web presence built with vanilla JavaScript and CSS.',
        fullDescription: 'adam-website is a handcrafted personal portfolio site built with pure JavaScript and CSS — no frameworks. It showcases projects, skills, and contact information with a clean, performant, and lightweight design.',
        tech: ['JavaScript', 'CSS', 'HTML'],
        github: 'https://github.com/mu1ze/adam-website',
        live: '#',
        features: [
            'Vanilla JavaScript interactions and animations',
            'Custom CSS layout and responsive design',
            'Lightweight and fast — zero framework overhead',
            'Project showcase and contact sections',
            'Semantic HTML structure'
        ],
        useCases: [
            'Personal branding and online presence',
            'Showcasing projects to recruiters and collaborators',
            'Demonstrating core web fundamentals without frameworks'
        ],
        structure: 'Static site built with HTML, CSS, and vanilla JavaScript. No build tools or bundlers — files served directly for maximum simplicity and performance.',
        featured: true,
        problem: "Most portfolio templates rely on heavy frameworks that add unnecessary complexity for a simple personal site.",
        solution: "A from-scratch build using only web fundamentals — delivering a fast, fully custom experience that demonstrates core front-end proficiency.",
        impact: "Serves as a clean, professional web presence with sub-second load times and full control over every design and interaction detail."
    }
];
