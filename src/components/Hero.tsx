import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
    const scrollToExperience = () => {
        const experienceSection = document.getElementById('experience');
        experienceSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="container section" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 'var(--spacing-xxl)'
        }}>
            <div style={{ maxWidth: '900px' }}>
                <h4 style={{
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--spacing-md)'
                }}>
                    Portfolio & Professional Journey
                </h4>

                <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>
                    Aderinola Muiz Odebiyi
                </h1>

                <h2 style={{
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--spacing-lg)',
                    fontWeight: 500
                }}>
                    Full Stack Developer building <span style={{ color: 'var(--accent-secondary)' }}>intelligent platforms</span> and scalable solutions.
                </h2>

                <p style={{
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    marginBottom: 'var(--spacing-xl)',
                    lineHeight: 1.8
                }}>
                    I transform complex requirements into seamless digital experiences.
                    Specializing in React, Node.js, and Cloud Architectures, I help businesses
                    and startups ship production-quality software.
                </p>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button
                        onClick={scrollToExperience}
                        style={{
                            padding: '16px 32px',
                            backgroundColor: 'var(--accent-primary)',
                            color: 'var(--bg-color)',
                            fontWeight: 600,
                            borderRadius: 'var(--radius-full)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            fontSize: '1rem',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-secondary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Start the Journey <ArrowRight size={20} />
                    </button>

                    <a
                        href="https://www.linkedin.com/in/muizOdebiyi"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '16px 32px',
                            border: '1px solid var(--text-secondary)',
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                            borderRadius: 'var(--radius-full)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            fontSize: '1rem',
                            transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            e.currentTarget.style.color = 'var(--accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--text-secondary)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                    >
                        LinkedIn
                    </a>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'bounce 2s infinite'
            }}>
                <ChevronDown size={32} color="var(--text-secondary)" />
            </div>

            <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
          40% {transform: translateY(-10px) translateX(-50%);}
          60% {transform: translateY(-5px) translateX(-50%);}
        }
      `}</style>
        </section>
    );
};

export default Hero;
