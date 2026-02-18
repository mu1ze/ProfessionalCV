import { Code2, Database, Layout, Terminal } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const SkillsMatrix = () => {
    const skillCategories = [
        {
            title: "Languages",
            icon: <Code2 className="text-accent-primary" />,
            skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3/SCSS", "Python", "SQL"]
        },
        {
            title: "Frameworks & Libs",
            icon: <Layout className="text-accent-secondary" />,
            skills: ["React", "Node.js", "Express", "TailwindCSS", "Next.js", "Redux"]
        },
        {
            title: "Tools & DevOps",
            icon: <Terminal className="text-accent-creative" />,
            skills: ["Git/GitHub", "Docker", "AWS (EC2, S3)", "Vercel", "Netlify", "Webpack"]
        },
        {
            title: "Other",
            icon: <Database className="text-accent-primary" />,
            skills: ["RESTful APIs", "GraphQL", "Agile/Scrum", "UI/UX Design", "SEO"]
        }
    ];

    return (
        <section id="skills" style={{ padding: 'var(--spacing-xxl) 0', marginBottom: 'var(--spacing-xxl)' }}>
            <ScrollReveal>
                <h2 style={{ marginBottom: 'var(--spacing-xl)', fontSize: '2.5rem' }}>The <span className="text-gradient">Arsenal</span></h2>
            </ScrollReveal>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-lg)'
            }}>
                {skillCategories.map((category, index) => (
                    <ScrollReveal key={category.title} delay={index * 0.1}>
                        <div className="glass-panel" style={{
                            padding: 'var(--spacing-lg)',
                            height: '100%',
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                {category.icon}
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{category.title}</h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {category.skills.map((item, i) => (
                                    <span key={i} style={{
                                        padding: '6px 14px',
                                        backgroundColor: 'var(--bg-color-alt)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section >
    );
};

export default SkillsMatrix;
