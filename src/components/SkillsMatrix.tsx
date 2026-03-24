import { Code2, Database, Layout, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import './SkillsMatrix.css';

const skillCategories = [
    {
        title: 'Languages',
        icon: <Code2 size={18} />,
        color: 'cyan',
        skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3/SCSS', 'Python', 'SQL'],
    },
    {
        title: 'Frameworks & Libraries',
        icon: <Layout size={18} />,
        color: 'purple',
        skills: ['React', 'Node.js', 'Express', 'TailwindCSS', 'Next.js', 'Redux'],
    },
    {
        title: 'Tools & DevOps',
        icon: <Terminal size={18} />,
        color: 'pink',
        skills: ['Git/GitHub', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Webpack'],
    },
    {
        title: 'Other',
        icon: <Database size={18} />,
        color: 'gold',
        skills: ['RESTful APIs', 'GraphQL', 'Agile/Scrum', 'UI/UX Design', 'SEO'],
    },
];

export default function SkillsMatrix() {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="skills-header">
                        <span className="skills-label">
                            <span className="skills-hash">0x04 // </span>THE_ARSENAL
                        </span>
                        <h2 className="skills-title">Skills &amp; Tech Stack</h2>
                    </div>
                </motion.div>

                <div className="skills-grid">
                    {skillCategories.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            className={`skill-card color-${cat.color}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="skill-card-header">
                                <span className="skill-icon">{cat.icon}</span>
                                <h3 className="skill-card-title">{cat.title}</h3>
                            </div>
                            <div className="skill-tags">
                                {cat.skills.map((s, i) => (
                                    <span key={i} className="skill-tag">{s}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
