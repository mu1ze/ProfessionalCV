import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsMatrix from './components/SkillsMatrix';
import Navbar from './components/Navbar';
// import Contact from './components/Contact'; // To be implemented

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simulate loading for smooth entry
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className="bg-gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, var(--accent-primary) 0%, transparent 15%), 
                       radial-gradient(circle at 80% 20%, var(--accent-secondary) 0%, transparent 30%),
                       radial-gradient(circle at 20% 80%, var(--accent-creative) 0%, transparent 30%)`,
          opacity: 0.15,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
          transition: 'background 0.2s ease',
          animation: 'gradient-move 20s infinite alternate'
        }}
      />

      <Navbar />

      <main style={{
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xxl)'
      }}>
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectShowcase />
        <SkillsMatrix />

        <footer className="container section" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} Aderinola Muiz Odebiyi. Built with React & Vite.</p>
        </footer>
      </main>
    </>
  )
}

export default App

