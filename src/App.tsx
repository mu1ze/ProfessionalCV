import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';

import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsMatrix from './components/SkillsMatrix';
import GitHubGraph3D from './components/GitHubGraph3D';
import Navbar from './components/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Ambient background orbs */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)',
          animation: 'orb-drift 22s ease-in-out infinite',
          filter: 'blur(48px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '-8%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%)',
          animation: 'orb-drift 28s ease-in-out infinite reverse',
          filter: 'blur(48px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '38%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)',
          animation: 'orb-drift 35s ease-in-out infinite',
          filter: 'blur(48px)',
        }} />
      </div>

      <Navbar />

      <main style={{
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Hero />
        <About />

        <ExperienceTimeline />
        <ProjectShowcase />
        <SkillsMatrix />
        <GitHubGraph3D />

        <footer style={{
          padding: '40px 32px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div className="container">
            <p style={{
              margin: 0,
              maxWidth: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
            }}>
              © {new Date().getFullYear()} Aderinola Muiz Odebiyi · Built with React & Vite
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
