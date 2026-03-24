import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './ExperienceTimeline.css';

const experiences = [
    {
        id: 1,
        role: 'Full Stack Developer',
        company: 'Self-Employed',
        period: 'Dec 2025 – Present',
        location: 'Remote, ON',
        description: [
            'Driven by a passion for continuous learning, expanding expertise across the full stack — from modern frontend frameworks to scalable backend architectures.',
            'Developed and deployed multiple production websites, demonstrating end-to-end ownership of the full development lifecycle.',
            'Designed and implemented responsive, user-friendly web applications using React and Node.js.',
            'Integrated third-party APIs including Google Maps API to enhance application functionality.',
        ],
    },
    {
        id: 2,
        role: 'Level 3 Technical Advisor',
        company: 'Transcom',
        period: 'May 2024 – Present',
        location: 'Remote',
        description: [
            'Provided tier-3 technical support for complex hardware and software issues, consistently exceeding SLA targets.',
            'Mentored new team members and contributed to continuous improvement and knowledge sharing.',
            'Able to breakdown and communicate complex technical issues to non-technical stakeholders clearly.',
        ],
    },
    {
        id: 3,
        role: 'Undergraduate Research Assistant',
        company: 'Brock University',
        period: 'Sept 2023 – April 2024',
        location: 'St. Catharines, ON',
        description: [
            'Assisted in the design and implementation of experiments to study human-computer interaction.',
            'Team member for a project to develop a 3D walk-through simulation of a hospital, using Unity and C++.',
        ],
    },
];

const SectionHeader = ({ label, title }: { label: string; title: string }) => (
    <div className="exp-header">
        <span className="exp-label">
            <span className="exp-hash">0x02 // </span>{label}
        </span>
        <h2 className="exp-title">{title}</h2>
    </div>
);

export default function ExperienceTimeline() {
    return (
        <section id="experience" className="exp-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeader label="THE_CLIMB" title="Experience" />
                </motion.div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className="timeline-item"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            {/* Node */}
                            <div className="timeline-node">
                                <div className="timeline-node-inner" />
                                <div className="timeline-node-pulse" />
                            </div>

                            {/* Card */}
                            <div className="exp-card">
                                <div className="exp-card-header">
                                    <div>
                                        <h3 className="exp-role">{exp.role}</h3>
                                        <p className="exp-company">{exp.company}</p>
                                    </div>
                                    <div className="exp-meta">
                                        <span className="exp-meta-item">
                                            <Calendar size={13} />
                                            {exp.period}
                                        </span>
                                        <span className="exp-meta-item">
                                            <MapPin size={13} />
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>

                                <ul className="exp-desc">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
