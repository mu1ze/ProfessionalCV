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
    }
];
