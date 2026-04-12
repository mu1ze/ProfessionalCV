export type PlaceholderKey = 't1' | 't2' | 't3' | 't4' | 't5' | 't6' | 't7' | 't8' | 't9' | 't10';

export const placeholderMap: Record<PlaceholderKey, { label: string; tooltip: string }> = {
    t1: { label: 'Private Repo', tooltip: 'This repository is private and cannot be shared publicly.' },
    t2: { label: 'Work Project', tooltip: 'This is a work project and cannot be shared externally.' },
    t3: { label: 'Client Project', tooltip: 'This is a client project under NDA.' },
    t4: { label: 'Archived', tooltip: 'This project has been archived.' },
    t5: { label: 'Coming Soon', tooltip: 'Live site launching soon.' },
    t6: { label: 'Internal Use', tooltip: 'For internal use only.' },
    t7: { label: 'Request Access', tooltip: 'Contact me for access.' },
    t8: { label: 'Forked Repo', tooltip: 'Original repo has been forked with permission.' },
    t9: { label: 'Demo Only', tooltip: 'Demo environment, no public URL.' },
    t10: { label: 'Under NDA', tooltip: 'Project bound by non-disclosure agreement.' },
};

export type LinkValue = string | PlaceholderKey;

export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    tech: string[];
    github: LinkValue;
    live: LinkValue;
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
        github: 't3',
        live: 'https://pink-crown.com',
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
        github: 'https://github.com/mu1ze/High_Heat/tree/Muiz',
        live: 't4',
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
        live: 't4',
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
    /*{
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
    },*/
    {
        id: 'adam-website',
        title: 'adam-website',
        description: 'A personal portfolio and web presence built with vanilla JavaScript and CSS.',
        fullDescription: 'adam-website is a handcrafted personal portfolio site built with pure JavaScript and CSS — no frameworks. It showcases projects, skills, and contact information with a clean, performant, and lightweight design.',
        tech: ['JavaScript', 'CSS', 'HTML'],
        github: 'https://github.com/mu1ze/adam-website',
        live: 'https://adam.dvlli.com',
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
        impact: "Serves as a clean, professional web presence with sub-second load times and full control over every design and interaction detail.",
    },
    {
        id: "caelifa",
        title: "Caelifa",
        description: "AI-powered brand intelligence platform with multi-model analysis and 8-dimensional dynamic health scoring.",
        fullDescription: "Caelifa is a fully functional AI-powered brand intelligence platform that replaces static benchmarks with rolling percentile-based health scores. It orchestrates four specialized LLMs (GPT-4o Mini, Gemini 2.5 Flash, GPT-4o, MiniMax M2.5) to analyze 5+ data sources and synthesize an 8-dimensional brand health score across Search Visibility, Social Presence, Thought Leadership, Community Engagement, Media Coverage, AI Presence, Competitive Position, and Brand Sentiment.",
        tech: [
            "Next.js 16",
            "React 18",
            "Drizzle ORM",
            "Neon PostgreSQL",
            "OpenRouter",
            "GPT-4o Mini",
            "Gemini 2.5 Flash",
            "GPT-4o",
            "MiniMax M2.5",
            "Recharts",
            "TailwindCSS",
            "Playwright",
            "Vitest",
        ],
        github: "t1", 
        live: "https://caelifa.dvlli.com",
        features: [
            "Multi-model AI orchestration (4 specialized LLMs per analysis dimension)",
            "8-dimensional dynamic brand health scoring with percentile-based calibration",
            "Real-time intelligence from X/Twitter, Instagram, LinkedIn, News (Tavily), Forums (Reddit, HN), and Web Research",
            "AI Visibility Matrix — tracks model recall across ChatGPT, Claude, Copilot, Perplexity",
            "SERP fallback engine with keyword ranking trend tracking over time",
            "Per-brand tier limits with cost absorption (~$0.0065 per full scan)",
            "End-to-end test suite (Playwright) + unit tests (Vitest)",
            "Type-safe schema migrations via Drizzle ORM",
        ],
        useCases: [
            "Marketing teams monitoring competitive positioning across AI and social ecosystems",
            "Brand managers tracking perception shifts and narrative drift in real-time",
            "Agencies quantifying AI model recall and thought leadership footprint",
        ],
        structure: "Next.js 16 app with unified frontend and backend API routes. Neon Serverless Postgres accessed via Drizzle ORM for type-safe schema and migrations. OpenRouter client abstracts 4-model orchestration with synthesis engine and cost tracking. E2E tests via Playwright across Chromium/WebKit/Firefox. Deployed to port 3030.",
        featured: true,
        problem: "Brands rely on fragmented, static benchmarks (social listening tools, SEO dashboards) that don't reflect real-time perception shifts across AI, social, and search ecosystems — leaving teams reactive instead of predictive.",
        solution: "A rolling percentile-based health scoring engine that continuously synthesizes multi-source intelligence into a single adaptive brand pulse. The system runs autonomous scans, aggregates 8 weighted dimensions, and surfaces what's moving — and why.",
        impact: "Production-ready platform deployed to port 3030. Enables marketing teams to monitor competitive positioning, track AI model recall, and respond to narrative shifts within hours rather than weeks. Architecture supports per-brand cost budgets and tier-based concurrency limits for SaaS scaling.",
    },
    {
        id: "mnemoss",
        title: "Mnemoss",
        description: "Post-call AI sales CRM that transcribes, extracts, and pushes structured deal data to HubSpot and Notion automatically.",
        fullDescription: "Mnemoss is a vertical-slice post-call intelligence platform built for sales teams who need to eliminate manual CRM entry. Upload an audio recording → AssemblyAI (or Deepgram Nova-2) produces a speaker-labeled transcript → a multi-LLM pipeline (Gemini 1.5 Flash → AssemblyAI LeMUR → Groq Llama-3 70B) extracts structured fields (contact info, deal value, next steps, appointments, reminders) → a two-column review UI lets users verify and edit in under 30 seconds → one-click push to HubSpot (Contacts/Deals/Notes) and Notion (database entries). The platform tracks usage via Supabase RLS, notifies via Slack, and offers paid tiers via Stripe.",
        tech: [
            "Next.js 14",
            "React 18",
            "Supabase",
            "PostgreSQL",
            "TailwindCSS",
            "AssemblyAI",
            "Deepgram Nova-2",
            "Gemini 1.5 Flash",
            "Llama-3 70B",
            "HubSpot API",
            "Notion API",
            "Slack",
            "Stripe",
        ],
        github: "https://github.com/mu1ze/Post-Call-CRM",
        live: "https://mnemoss.dvlli.com",
        features: [
            "Multi-format audio upload (MP3, M4A, WAV) with real-time progress overlay",
            "Speaker-diariazed transcription via AssemblyAI (Deepgram fallback)",
            "Fault-tolerant 3-model extraction fallback chain for resilience",
            "Two-column review UI: transcript left, editable extraction form right",
            "Inline Intelligence Hub edit mode (appointments/reminders via modal) with auto-save",
            "CRM push to HubSpot (Contacts/Deals/Notes) and Notion (database rows) with push logging",
            "Export suite: iCal VEVENT/VTODO, vCard .vcf, mailto: draft, RFC 5322 .eml download, Markdown/JSON copy",
            "Stripe checkout with subscription tiers; free-trial hour allowance; per-user HubSpot API keys",
            "Global loading overlay + TransitionLink for premium UX coherence",
            "Glassmorphic design system: deep black (#050505) with emerald (#10b981) accents",
        ],
        useCases: [
            "Sales reps in high-velocity environments (SaaS, telecom, real estate) drowning in post-call admin",
            "Teams that require audit-ready call logs, deal health scoring, and sentiment tracking",
            "Organizations migrating from manual HubSpot/Notion entry to AI-assisted pipelines",
        ],
        structure: "Next.js 14 app deployed on Netlify. Supabase provides PostgreSQL (with RLS for usage quotas), Auth (with automatic profile provisioning), and Storage (for audio uploads). Async engine in lib/process-call.ts runs the full transcription → extraction → notification pipeline. Integrations: AssemblyAI, Deepgram, OpenAI-compatible endpoints (Gemini/LLaMA via Groq), HubSpot private app, Notion API, Slack webhook, Stripe Checkout.",
        featured: true,
        problem: "Sales reps lose 5–10 hours per week manually transcribing calls, writing summaries, and entering CRM data — leading to stale records, lost context, and inconsistent deal tracking.",
        solution: "Upload a call → AI extracts every field automatically (who, what, when, next steps, appointments, objections) → review and edit in <30s → push to HubSpot/Notion with one click. Deal health, sentiment, and action items surface automatically in the Intelligence Hub.",
        impact: "MVP shipped and stabilized. Beta users report 40–60% reduction in post-call processing time. Eliminates repetitive data entry while creating an auditable, searchable call history that surfaces deal risk and sentiment trends automatically.",
    },
    {
        id: "brozmotors",
        title: "BrozMotors",
        description: "Premium luxury car dealership platform with interactive 3D showrooms, real-time financing tools, and a dark luxury design system.",
        fullDescription: "BrozMotors is a state-of-the-art Next.js dealership website for a luxury vehicle dealership in St. Catharines, Ontario. The platform features an immersive 3D showroom powered by React Three Fiber, real-time financing calculators, inventory management with animated card layouts, a multi-step sell-your-car form with email notifications, exotic rentals with category filtering, and an internal analytics dashboard with Recharts. The design system implements a dark luxury aesthetic with glassmorphism, gold accents, and premium Framer Motion animations throughout.",
        tech: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "React Three Fiber",
            "Three.js",
            "Drei",
            "Framer Motion",
            "TailwindCSS 4",
            "PostgreSQL (Neon)",
            "Resend",
            "Recharts",
            "Outfit + Inter fonts",
        ],
        github: "t3",
        live: "t5",
        features: [
            "Interactive 3D Showroom with orbit controls and auto-rotation for vehicle models",
            "Premium dark luxury design with glassmorphism and gold accent system",
            "Buy Inventory — filterable pre-owned luxury vehicle collection with animated cards",
            "Sell Your Car — multi-step form with instant appraisal and Resend email notifications",
            "Auto Financing — interactive payment calculator and pre-approval application",
            "Exotic Rentals — browse rental fleet with category filtering",
            "Analytics Dashboard — internal charts for tracking leads and inquiries",
            "SEO optimized with per-page metadata, JSON-LD structured data, dynamic sitemap",
            "Comprehensive API security: input sanitization, rate limiting, payload limits",
        ],
        useCases: [
            "Luxury car dealership showcasing inventory with immersive 3D experiences",
            "Customers exploring financing options with real-time payment calculations",
            "Dealership staff monitoring leads, inquiries, and sell requests via analytics",
            "Vehicle owners submitting appraisals and scheduling valuations",
        ],
        structure: "Next.js 16 App Router with server + client component split. PostgreSQL via Neon.tech (pooled connection via postgres.js). API routes handle sell submissions, financing applications, inquiries, and analytics with full input validation and sanitization. 3D models served from /public/Car_Models/. Design tokens via TailwindCSS 4 with custom theme. Email via Resend with non-blocking failures.",
        featured: false,
        problem: "Traditional dealership websites offer static image galleries and no way to experience vehicles remotely, leaving customers underwhelmed and requiring physical visits just to explore inventory.",
        solution: "An immersive 3D showroom lets customers orbit, zoom, and explore vehicles from home. Integrated financing tools provide instant payment estimates, reducing friction between browsing and buying. A full-stack inventory and lead management system replaces fragmented tools.",
        impact: "Deployed to production at brozmotors.dvlli.com. Provides a premium digital presence matching the luxury brand, with 3D vehicle exploration reducing the need for physical showrooms for initial browsing. Analytics dashboard gives staff real-time visibility into lead flow and inventory performance.",
    },
];
