import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Code2, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const stats = [
  { value: 'B.Sc.', label: 'Computer Science — Brock University', icon: GraduationCap, color: '#7c3aed' },
  { value: '2', label: 'Shipped Production Products', icon: Code2, color: '#06b6d4' },
  { value: 'L3', label: 'Technical Advisor — Transcom', icon: Zap, color: '#10b981' },
];

const storyParagraphs = [
  {
    text: `My path in technology hasn't been a straight line — it's been a journey of relentless determination. From completing high school in Nigeria at 15 to earning my Bachelor of Science in Computer Science from Brock University at 21, my story is defined by an `,
    highlight: 'unwavering commitment to learning',
    rest: ' and the resilience to overcome obstacles that would have derailed many others.',
  },
  {
    text: `Beginning university at 16 required maturity beyond my years. During COVID-19, isolated in a foreign country, programming became my lifeline. What could have been despair instead became `,
    highlight: 'profound growth',
    rest: ', reigniting my passion for creation and problem-solving.',
  },
  {
    text: `December 2024 tested my physical limits. A car accident left me with a broken right arm — my dominant hand — as a final-year CS student. I refused to let it define me. I adapted, persevered, and pushed through pain to complete every assignment. `,
    highlight: 'True dedication means showing up',
    rest: ' even when circumstances make it nearly impossible.',
  },
];

const About = () => {
  return (
    <section id="about" style={{
      padding: '120px 32px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Section heading */}
      <ScrollReveal width="100%">
        <div style={{ marginBottom: '72px' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            Beyond the{' '}
            <span style={{
              background: 'var(--gradient-primary)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Code
            </span>
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '520px', margin: 0 }}>
            My journey from Abuja, Nigeria to Ontario, Canada shaped by resilience and an unwavering passion for technology.
          </p>
        </div>
      </ScrollReveal>

      {/* Two-column layout */}
      <div className="about-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '56px',
        alignItems: 'start',
      }}>
        {/* Story column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {storyParagraphs.map((para, i) => (
            <ScrollReveal key={i} delay={i * 0.12} width="100%">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.82, margin: 0, color: 'var(--text-secondary)' }}>
                {para.text}
                <span style={{
                  background: 'var(--gradient-primary)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                }}>
                  {para.highlight}
                </span>
                {para.rest}
              </p>
            </ScrollReveal>
          ))}

          {/* Quote */}
          <ScrollReveal delay={0.36} width="100%">
            <motion.blockquote
              style={{
                margin: '4px 0 0',
                padding: '20px 24px',
                background: 'rgba(124, 58, 237, 0.07)',
                border: '1px solid rgba(124, 58, 237, 0.18)',
                borderLeft: '3px solid var(--accent-primary)',
                borderRadius: '0 14px 14px 0',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--text-primary)',
                lineHeight: 1.65,
              }}
            >
              "Technology didn't just keep me afloat; it reminded me of my purpose."
            </motion.blockquote>
          </ScrollReveal>
        </div>

        {/* Stats sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="about-sidebar">
          {/* Location chip */}
          <ScrollReveal delay={0.1} width="100%">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 18px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
            }}>
              <div style={{
                padding: '8px',
                background: 'rgba(6,182,212,0.12)',
                borderRadius: '10px',
                color: 'var(--accent-secondary)',
                display: 'flex',
                flexShrink: 0,
              }}>
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  Ontario, Canada
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  St. Catharines → Toronto area
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats cards */}
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={i} delay={0.18 + i * 0.1} width="100%">
                <div
                  style={{
                    padding: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${stat.color}35`;
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }}
                >
                  <div style={{
                    padding: '7px',
                    background: `${stat.color}18`,
                    border: `1px solid ${stat.color}28`,
                    borderRadius: '9px',
                    color: stat.color,
                    display: 'inline-flex',
                    marginBottom: '12px',
                  }}>
                    <Icon size={15} />
                  </div>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    fontFamily: 'Outfit, sans-serif',
                    background: 'var(--gradient-primary)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Availability badge */}
          <ScrollReveal delay={0.52} width="100%">
            <div style={{
              padding: '16px 18px',
              background: 'rgba(16, 185, 129, 0.07)',
              border: '1px solid rgba(16, 185, 129, 0.18)',
              borderRadius: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  backgroundColor: '#10b981', flexShrink: 0,
                  animation: 'pulse-glow 2.5s ease-in-out infinite',
                }} />
                <span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.85rem' }}>
                  Open to Opportunities
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>
                Full-time · Remote-first · Open to hybrid
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-sidebar { display: grid !important; grid-template-columns: 1fr 1fr; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .about-sidebar { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
