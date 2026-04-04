import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '120px 32px 100px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      position: 'relative',
    }}>
      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 16px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.22)',
          borderRadius: '100px',
          marginBottom: '36px',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: '#34d399',
          letterSpacing: '0.01em',
        }}
      >
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          flexShrink: 0,
          animation: 'pulse-glow 2.5s ease-in-out infinite',
        }} />
        Available for new opportunities
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(52px, 8.5vw, 104px)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          marginBottom: '28px',
          fontFamily: 'Outfit, sans-serif',
          background: 'linear-gradient(140deg, #ffffff 0%, #c4b5fd 45%, #67e8f9 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Aderinola<br />Muiz Odebiyi
      </motion.h1>

      {/* Role line */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
        style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: '28px',
          fontFamily: 'Outfit, sans-serif',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        Full Stack Developer
        <span style={{
          background: 'var(--gradient-primary)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          · React · Node.js · Cloud
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: 'easeOut' }}
        style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
          maxWidth: '520px',
          marginBottom: '52px',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
        }}
      >
        I transform complex requirements into seamless digital experiences.
        From Lagos to Ontario — driven by resilience, shipping production-quality
        software for businesses and startups.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.44, ease: 'easeOut' }}
        style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
      >
        <button
          onClick={() => scrollToSection('projects')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'var(--gradient-primary)',
            borderRadius: '100px',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9375rem',
            transition: 'all var(--transition-fast)',
            boxShadow: '0 0 0 0 rgba(124,58,237,0)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,0.45)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 0 0 rgba(124,58,237,0)';
          }}
        >
          View My Work <ArrowRight size={17} />
        </button>

        <a
          href="https://www.linkedin.com/in/muizOdebiyi"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '100px',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          LinkedIn <ExternalLink size={15} />
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollToSection('about')}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
};

export default Hero;
