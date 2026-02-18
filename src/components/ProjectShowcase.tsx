import { Layers, Maximize2 } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { ScrollReveal } from './ScrollReveal';
import { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';

const ProjectShowcase = () => {
    // Filter only featured projects or specific IDs
    const featuredProjects = projects.filter(p => p.featured);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" style={{ padding: 'var(--spacing-xxl) 0' }}>
            <ScrollReveal>
                <h2 style={{ marginBottom: 'var(--spacing-xl)', fontSize: '2.5rem' }}>The <span className="text-gradient">Peaks</span></h2>
            </ScrollReveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                {featuredProjects.map((project, index) => (
                    <ScrollReveal key={project.id} delay={index * 0.2}>
                        <div className="glass-panel" style={{
                            padding: 'var(--spacing-lg)',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid var(--glass-border)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* View Details Overlay Trigger */}
                            <div
                                className="clickable"
                                onClick={() => setSelectedProject(project)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                            >
                                <span style={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '1.2rem',
                                    fontWeight: 600,
                                    padding: '12px 24px',
                                    backgroundColor: 'var(--accent-primary)',
                                    borderRadius: 'var(--radius-full)'
                                }}>
                                    <Maximize2 size={20} /> View Details
                                </span>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                                        {project.title}
                                    </h3>
                                    {/* Links are now secondary to the detail view, but we keep them accessible via z-index if needed, 
                                        or we can move them to the modal. For now, let's keep them here but the overlay covers them. 
                                        Actually, let's make the overlay NOT cover the specific link buttons if we want them clickable immediately.
                                        But simpler: Overlay covers all, 'View Details' opens modal, Modal has links.
                                    */}
                                </div>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', maxWidth: '80ch' }}>{project.description}</p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: 'var(--spacing-lg)',
                                marginTop: 'var(--spacing-md)'
                            }}>
                                <div style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    padding: 'var(--spacing-md)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
                                        <Layers size={18} color="var(--accent-secondary)" /> Key Features
                                    </h4>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                                        {project.features.map((feature, i) => (
                                            <li key={i} style={{ marginBottom: '4px' }}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Tech Stack</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {project.tech.map((t, i) => (
                                            <span key={i} style={{
                                                padding: '4px 12px',
                                                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                                color: 'var(--accent-primary)',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.9rem',
                                                border: '1px solid rgba(56, 189, 248, 0.2)'
                                            }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Architecture</h4>
                                        <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{project.structure}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default ProjectShowcase;
