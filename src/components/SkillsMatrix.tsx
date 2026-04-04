import { Code2, Database, Layout, Terminal } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    color: '#7c3aed',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    title: 'Frameworks & Libs',
    icon: Layout,
    color: '#06b6d4',
    skills: ['React', 'Vue.js', 'Node.js', 'Express', 'EJS'],
  },
  {
    title: 'Tools & DevOps',
    icon: Terminal,
    color: '#10b981',
    skills: ['Docker', 'Git / GitHub', 'Vite', 'Vercel', 'Netlify'],
  },
  {
    title: 'Data & APIs',
    icon: Database,
    color: '#f59e0b',
    skills: ['PostgreSQL', 'PLpgSQL', 'Supabase', 'RESTful APIs', 'Google Maps API'],
  },
];

const SkillsMatrix = () => {
  return (
    <section id="skills" style={{
      padding: '120px 32px 160px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    }}>
      <ScrollReveal width="100%">
        <div style={{ marginBottom: '72px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            The{' '}
            <span style={{
              background: 'var(--gradient-primary)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Arsenal
            </span>
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '480px', margin: 0 }}>
            Tools and technologies I use to ship production-ready software.
          </p>
        </div>
      </ScrollReveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '18px',
      }}>
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <ScrollReveal key={category.title} delay={index * 0.1} width="100%">
              <div
                style={{
                  padding: '28px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  height: '100%',
                  transition: 'all var(--transition-normal)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${category.color}35`;
                  e.currentTarget.style.boxShadow = `0 8px 36px ${category.color}10`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Decorative background glyph */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  opacity: 0.035,
                  transform: 'scale(2.8)',
                  color: category.color,
                  pointerEvents: 'none',
                }}>
                  <Icon size={52} />
                </div>

                {/* Icon + title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '22px',
                }}>
                  <div style={{
                    padding: '10px',
                    background: `${category.color}15`,
                    border: `1px solid ${category.color}25`,
                    borderRadius: '12px',
                    color: category.color,
                    display: 'flex',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{
                    fontSize: '0.9875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}>
                    {category.title}
                  </h3>
                </div>

                {/* Skill pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '5px 12px',
                        background: `${category.color}08`,
                        border: `1px solid ${category.color}18`,
                        borderRadius: '100px',
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 500,
                        transition: 'all var(--transition-fast)',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${category.color}16`;
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = `${category.color}35`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = `${category.color}08`;
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = `${category.color}18`;
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsMatrix;
