import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Target, Video, Zap, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../data/projects';
import { useEffect, useState } from 'react';
import MediaViewerModal from './MediaViewerModal';

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
    const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [project]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9998,
                            cursor: 'pointer'
                        }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        style={{
                            position: 'fixed',
                            top: '5%',
                            left: '50%',
                            translate: '-50% 0', // transform is used by framer motion, use translate for centering
                            width: '90%',
                            maxWidth: '1000px',
                            maxHeight: '90vh',
                            backgroundColor: 'var(--bg-color-alt)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-lg)',
                            zIndex: 9999,
                            overflowY: 'auto',
                            boxShadow: 'var(--glass-shadow)',
                            padding: '0'
                        }}
                        className="custom-scrollbar"
                    >
                        {/* Header Image / Video Area */}
                        <div style={{
                            width: '100%',
                            height: '400px',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            background: 'linear-gradient(to bottom right, #064e3b, #022c22)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    padding: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    zIndex: 20
                                }}
                            >
                                <X size={24} />
                            </button>

                            {project.heroImage ? (
                                <img
                                    src={project.heroImage}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => setSelectedMedia({ url: project.heroImage!, type: 'image' })}
                                />
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <ImageIcon size={48} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
                                    <p>No Hero Image Available</p>
                                </div>
                            )}
                        </div>

                        {/* Content Body */}
                        <div style={{ padding: 'var(--spacing-xl)' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>{project.title}</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: 'var(--spacing-xl)' }}>
                                {project.description}
                            </p>

                            {/* Problem / Solution / Impact Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: 'var(--spacing-lg)',
                                marginBottom: 'var(--spacing-xl)'
                            }}>
                                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-danger)', marginBottom: '8px' }}>
                                        <Target size={20} /> Problem
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{project.problem}</p>
                                </div>
                                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-secondary)', marginBottom: '8px' }}>
                                        <Lightbulb size={20} /> Solution
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{project.solution}</p>
                                </div>
                                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '8px' }}>
                                        <Zap size={20} /> Impact
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{project.impact}</p>
                                </div>

                                {/* Feature Demos / Video Cards */}
                                {project.videos && project.videos.map((video, index) => (
                                    <div key={index} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ position: 'relative', height: '180px', backgroundColor: '#000' }}>
                                            <video
                                                src={video.url}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                muted
                                                playsInline
                                                loop
                                                onMouseOver={e => e.currentTarget.play()}
                                                onMouseOut={e => e.currentTarget.pause()}
                                            />
                                            {/* Expand / Play Button */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                background: 'rgba(0,0,0,0.6)',
                                                borderRadius: '50%',
                                                padding: '8px',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(4px)'
                                            }}
                                                onClick={() => setSelectedMedia({ url: video.url, type: 'video' })}
                                                title="Open Video"
                                            >
                                                <Video size={16} color="white" />
                                            </div>
                                        </div>
                                        <div style={{ padding: 'var(--spacing-md)' }}>
                                            <h4 style={{ marginBottom: '4px', color: 'var(--text-primary)', fontSize: '1.1rem' }}>{video.title}</h4>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{video.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Deep Dive & Media */}
                            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Deep Dive</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 'var(--spacing-lg)' }}>
                                    {project.fullDescription}
                                </p>

                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Project Structure</h4>
                                <code style={{
                                    display: 'block',
                                    padding: 'var(--spacing-md)',
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-muted)',
                                    fontFamily: 'monospace'
                                }}>
                                    {project.structure}
                                </code>
                            </div>

                            {/* Gallery */}
                            {project.screenshots && project.screenshots.length > 0 && (
                                <div>
                                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Gallery</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                                        {project.screenshots.map((shot, i) => (
                                            <div key={i} style={{
                                                aspectRatio: '16/9',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                borderRadius: 'var(--radius-md)',
                                                overflow: 'hidden',
                                                border: '1px solid var(--glass-border)',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s'
                                            }}
                                                onClick={() => setSelectedMedia({ url: shot, type: 'image' })}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <img
                                                    src={shot}
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Media Viewer Modal */}
                    <MediaViewerModal
                        isOpen={!!selectedMedia}
                        onClose={() => setSelectedMedia(null)}
                        mediaUrl={selectedMedia?.url || null}
                        mediaType={selectedMedia?.type || null}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
