import { Layers, Maximize2 } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectDetailModal from './ProjectDetailModal';
import './ProjectShowcase.css';

const ProjectShowcase = () => {
    const featuredProjects = projects.filter((p) => p.featured);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="proj-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="proj-header">
                        <span className="proj-label">
                            <span className="proj-hash">0x03 // </span>THE_PEAKS
                        </span>
                        <h2 className="proj-title">Featured Projects</h2>
                    </div>
                </motion.div>

                <div className="proj-grid">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="proj-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.12 }}
                        >
                            <div
                                className="proj-card-inner"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Glow */}
                                <div className="proj-glow" />

                                {/* Header */}
                                <div className="proj-card-header">
                                    <div>
                                        <h3 className="proj-card-title">{project.title}</h3>
                                        <p className="proj-card-sub">{project.description}</p>
                                    </div>
                                    <button className="proj-expand-btn" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>
                                        <Maximize2 size={16} />
                                    </button>
                                </div>

                                {/* Features */}
                                <div className="proj-features">
                                    <h4 className="proj-features-title">
                                        <Layers size={14} /> Key Features
                                    </h4>
                                    <ul>
                                        {project.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech + Arch */}
                                <div className="proj-card-footer">
                                    <div className="proj-tech">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="proj-tech-tag">{t}</span>
                                        ))}
                                    </div>
                                    <p className="proj-arch">{project.structure}</p>
                                </div>

                                {/* Hover overlay */}
                                <div className="proj-overlay">
                                    <span className="proj-overlay-btn">
                                        <Maximize2 size={16} /> View Details
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
};

export default ProjectShowcase;
