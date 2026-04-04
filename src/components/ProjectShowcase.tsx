import { ExternalLink, Github, ArrowUpRight, Layers } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { ScrollReveal } from './ScrollReveal';
import { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';

const ProjectShowcase = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{
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
              Peaks
            </span>
          </h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '480px', margin: 0 }}>
            Projects built from concept to production — end-to-end ownership.
          </p>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {featuredProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.12} width="100%">
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                overflow: 'hidden',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.28)';
                e.currentTarget.style.boxShadow = '0 12px 52px rgba(124,58,237,0.14)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card header */}
              <div style={{
                padding: '32px 32px 28px',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    {/* Featured label */}
                    <div style={{ marginBottom: '14px' }}>
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(124,58,237,0.22)',
                        borderRadius: '100px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--accent-primary-light)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                      }}>
                        Featured Project
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      letterSpacing: '-0.025em',
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9875rem',
                      maxWidth: '580px',
                      margin: 0,
                      lineHeight: 1.72,
                      color: 'var(--text-secondary)',
                    }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingTop: '2px',
                    flexShrink: 0,
                  }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        title="GitHub"
                        style={{
                          padding: '9px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border)',
                          borderRadius: '11px',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                        }}
                      >
                        <Github size={17} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        title="Live Demo"
                        style={{
                          padding: '9px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border)',
                          borderRadius: '11px',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                        }}
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '9px 16px',
                        background: 'var(--gradient-primary)',
                        borderRadius: '11px',
                        color: '#fff',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        transition: 'opacity var(--transition-fast)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card body: features + tech */}
              <div className="project-body" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}>
                {/* Features */}
                <div style={{
                  padding: '24px 28px',
                  borderRight: '1px solid var(--border)',
                }}>
                  <h4 style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <Layers size={12} /> Key Features
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {project.features.slice(0, 4).map((f, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        gap: '10px',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}>
                        <span style={{
                          minWidth: '4px', height: '4px', borderRadius: '50%',
                          background: 'var(--accent-primary)',
                          marginTop: '8px', flexShrink: 0,
                        }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div style={{ padding: '24px 28px' }}>
                  <h4 style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    Tech Stack
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {project.tech.map((t, i) => (
                      <span key={i} style={{
                        padding: '4px 11px',
                        background: 'rgba(124,58,237,0.08)',
                        border: '1px solid rgba(124,58,237,0.18)',
                        borderRadius: '100px',
                        fontSize: '0.78rem',
                        color: 'var(--accent-primary-light)',
                        fontWeight: 500,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <style>{`
        @media (max-width: 640px) {
          .project-body { grid-template-columns: 1fr !important; }
          .project-body > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
