import { Calendar, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const experiences = [
    {
        id: 1,
        role: 'Full Stack Developer',
        company: 'Self-Employed',
        period: 'Dec 2025 – Present',
        location: 'Remote, ON',
        description: [
            'Driven by a passion for continuous learning, actively expanding expertise across the full stack — from modern frontend frameworks to scalable backend architectures.',
            'Developed and deployed multiple production websites, demonstrating end-to-end ownership of the full development lifecycle.',
            'Designed and implemented responsive, user-friendly web applications using modern frameworks including React and Node.js.',
            'Managed frontend and backend development, database architecture, and deployment pipelines via Netlify.',
            'Integrated third-party APIs including Google Maps API to enhance application functionality.'
        ]
    },
    {
        id: 2,
        role: "Level 3 Technical Advisor",
        company: "Transcom",
        period: "May 2024 - Present",
        description: [
            "Provided tier-2 technical support for complex hardware and software issues. consistently exceeding SLA targets and mentoring new team members.",
            'Provide advanced technical support and troubleshooting for macOS systems, resolving complex software issues.',
            'Able to breakdown and communicate complex technical issues to less technical people clearly and concisely',
            'Contribute to continuous improvement initiatives and knowledge sharing across the support team'
        ],
        location: "Remote"
    },
    {
        id: 3,
        role: "Undergraduate Research Assistant",
        company: "Brock University",
        period: "Sept 2023 - April 2024",
        description: [
            "Assisted in the design and implementation of experiments to study human-computer interaction.",
            "Team member for project to develop 3D walk-through simulation of a hospital, using Unity and C++",
        ],
        location: "St. Catharines, ON"
    }
];

const ExperienceTimeline = () => {
    return (
        <section id="experience" style={{ padding: 'var(--spacing-xxl) 0' }}>
            <ScrollReveal>
                <h2 style={{ marginBottom: 'var(--spacing-xl)', fontSize: '2.5rem' }}>The <span className="text-gradient">Climb</span></h2>
            </ScrollReveal>

            <div className="timeline-container" style={{ position: 'relative', borderLeft: '2px solid var(--glass-border)', marginLeft: '20px' }}>
                {experiences.map((exp, index) => (
                    <ScrollReveal key={exp.id} delay={index * 0.2}>
                        <div className="timeline-item" style={{
                            marginBottom: 'var(--spacing-xl)',
                            paddingLeft: 'var(--spacing-lg)',
                            position: 'relative'
                        }}>
                            {/* Dot Indicator */}
                            <div style={{
                                position: 'absolute',
                                left: '-49px', // Adjusted from -49px to account for paddingLeft on parent
                                top: '0',
                                width: '16px',
                                height: '16px',
                                backgroundColor: 'var(--accent-primary)',
                                borderRadius: '50%',
                                border: '4px solid var(--bg-color)',
                                boxShadow: '0 0 0 2px var(--accent-primary)'
                            }} />

                            <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 'var(--spacing-md)', gap: 'var(--spacing-sm)' }}>
                                    <div>
                                        <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>{exp.role}</h3>
                                        <div style={{ fontSize: '1.1rem', color: 'var(--accent-secondary)' }}>{exp.company}</div>
                                    </div>
                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>
                                            <Calendar size={14} /> {exp.period}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <MapPin size={14} /> {exp.location}
                                        </div>
                                    </div>
                                </div>

                                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
                                    {exp.description.map((item, index) => (
                                        <li key={index} style={{ marginBottom: 'var(--spacing-sm)' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
