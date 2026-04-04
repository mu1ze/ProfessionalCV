import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Self-Employed',
    period: 'Dec 2025 – Present',
    location: 'Remote, ON',
    color: '#7c3aed',
    description: [
      'Developed and deployed multiple production websites with end-to-end ownership of the full development lifecycle.',
      'Designed and built responsive, user-friendly web applications using React and Node.js.',
      'Managed frontend, backend, database architecture, and deployment pipelines via Netlify.',
      'Integrated third-party APIs including Google Maps API to enhance application functionality.',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Netlify', 'TypeScript'],
  },
  {
    id: 2,
    role: 'Level 3 Technical Advisor',
    company: 'Transcom',
    period: 'May 2024 – Present',
    location: 'Remote',
    color: '#06b6d4',
    description: [
      'Provided tier-2 technical support for complex hardware and software issues, consistently exceeding SLA targets and mentoring new team members.',
      'Advanced troubleshooting for macOS systems, resolving complex software and hardware issues.',
      'Break down and communicate complex technical issues to less technical audiences clearly and concisely.',
      'Contribute to continuous improvement initiatives and knowledge sharing across the support team.',
    ],
    tech: ['macOS', 'Technical Support', 'SLA Management', 'Mentoring'],
  },
  {
    id: 3,
    role: 'Undergraduate Research Assistant',
    company: 'Brock University',
    period: 'Sept 2023 – April 2024',
    location: 'St. Catharines, ON',
    color: '#10b981',
    description: [
      'Assisted in design and implementation of experiments to study human-computer interaction.',
      'Team member for a project developing a 3D walk-through simulation of a hospital, using Unity and C++.',
    ],
    tech: ['Unity', 'C++', 'HCI Research'],
  },
];

const ExperienceTimeline = () => {
  return (
    <section id="experience" style={{
      padding: '120px 32px',
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
              Climb
            </span>
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '480px', margin: 0 }}>
            Roles that shaped my approach to building and solving hard problems.
          </p>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {experiences.map((exp, index) => (
          <ScrollReveal key={exp.id} delay={index * 0.12} width="100%">
            <div
              style={{
                padding: '32px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '22px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all var(--transition-normal)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${exp.color}35`;
                e.currentTarget.style.boxShadow = `0 8px 40px ${exp.color}12`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '3px',
                height: '100%',
                background: `linear-gradient(180deg, ${exp.color}, ${exp.color}40)`,
                borderRadius: '3px 0 0 3px',
              }} />

              {/* Header row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '22px',
              }}>
                <div>
                  {/* Company badge + icon */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      padding: '6px',
                      background: `${exp.color}18`,
                      border: `1px solid ${exp.color}28`,
                      borderRadius: '8px',
                      color: exp.color,
                      display: 'flex',
                    }}>
                      <Briefcase size={14} />
                    </div>
                    <span style={{
                      padding: '3px 10px',
                      background: `${exp.color}12`,
                      border: `1px solid ${exp.color}28`,
                      borderRadius: '100px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: exp.color,
                    }}>
                      {exp.company}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}>
                    {exp.role}
                  </h3>
                </div>

                {/* Period + location */}
                <div className="exp-meta" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  alignItems: 'flex-end',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                  }}>
                    <Calendar size={11} /> {exp.period}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                  }}>
                    <MapPin size={11} /> {exp.location}
                  </div>
                </div>
              </div>

              {/* Description bullets */}
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
                marginBottom: '22px',
              }}>
                {exp.description.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: '10px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                  }}>
                    <span style={{
                      minWidth: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: exp.color,
                      marginTop: '9px',
                      flexShrink: 0,
                    }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {exp.tech.map((t, i) => (
                  <span key={i} style={{
                    padding: '4px 11px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .exp-meta { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
};

export default ExperienceTimeline;
