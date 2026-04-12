import { useParams, Link, Navigate } from 'react-router-dom';
import { projects, type LinkValue } from '../data/projects';
import { resolveLinkValue } from '../utils/linkUtils';
import './ProjectDetail.css';

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find(p => p.id === id);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="project-detail container">
            <Link to="/" className="back-link">← Back to Projects</Link>
            
            <header className="detail-header">
                <h1 className="detail-title">{project.title}</h1>
                <div className="detail-meta">
                    <div className="tech-stack">
                        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                    </div>
                    <div className="project-links">
                        {(() => {
                          const liveResolved = resolveLinkValue(project.live as LinkValue);
                          return liveResolved.isPlaceholder ? (
                            <span title={liveResolved.tooltip} style={{ cursor: 'default' }}>{liveResolved.label}</span>
                          ) : (
                            <a href={liveResolved.href} target="_blank" rel="noopener noreferrer" className="cta-link">Live Demo</a>
                          );
                        })()}
                        {(() => {
                          const githubResolved = resolveLinkValue(project.github as LinkValue);
                          return githubResolved.isPlaceholder ? (
                            <span title={githubResolved.tooltip} style={{ cursor: 'default' }}>{githubResolved.label}</span>
                          ) : (
                            <a href={githubResolved.href} target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>
                          );
                        })()}
                    </div>
                </div>
            </header>

            <div className="warning-banner">
                <span className="warning-icon">🚧</span>
                <div className="warning-content">
                    <strong>TESTING PHASE</strong>
                    <p>This project is in active development. Bugs are to be expected. Please report any issues on the <Link to="/feedback">Feedback Page</Link>.</p>
                    <p className="warning-note">Note: All data created during this phase will be deleted before launch.</p>
                </div>
            </div>

            {/* Demo Video Section */}
            {project.demoVideo && (
                <section className="detail-section video-section">
                    <h2>Project Demo</h2>
                    <div className="video-container">
                        <video controls autoPlay loop muted playsInline className="project-video">
                            <source src={project.demoVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
            )}

            <section className="detail-section">
                <h2>Overview</h2>
                <p className="detail-description">{project.fullDescription || project.description}</p>
            </section>

            <div className="detail-grid">
                <section className="detail-section">
                    <h2>Key Features</h2>
                    <ul className="feature-list">
                        {project.features?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        )) || <li>Features coming soon...</li>}
                    </ul>
                </section>

                <section className="detail-section">
                    <h2>Use Cases</h2>
                    <ul className="use-case-list">
                        {project.useCases?.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                        )) || <li>Use cases defining in progress...</li>}
                    </ul>
                </section>
            </div>

            {/* Screenshot Gallery Section */}
            {project.screenshots && project.screenshots.length > 0 && (
                <section className="detail-section gallery-section">
                    <h2>Gallery</h2>
                    <div className="screenshot-grid">
                        {project.screenshots.map((shot, index) => (
                            <div key={index} className="screenshot-item">
                                <img src={shot} alt={`${project.title} screenshot ${index + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="detail-section structure-section">
                <h2>Project Structure</h2>
                <p>{project.structure || 'Architecture details coming soon.'}</p>
            </section>

            <div className="feedback-cta">
                <h3>Have thoughts on {project.title}?</h3>
                <p>Your feedback helps make this project better.</p>
                <Link to="/feedback" className="feedback-button">Leave Feedback</Link>
            </div>
        </div>
    );
}
