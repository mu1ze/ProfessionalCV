import { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - 48px)',
        maxWidth: '880px',
        transition: 'all var(--transition-normal)',
      }}>
        {/* Pill container */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          background: scrolled
            ? 'rgba(5, 5, 9, 0.88)'
            : 'rgba(15, 15, 26, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: scrolled
            ? '1px solid rgba(124, 58, 237, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '100px',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(124,58,237,0.12)'
            : '0 4px 24px rgba(0,0,0,0.2)',
          transition: 'all var(--transition-normal)',
        }}>
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              cursor: 'pointer',
              fontSize: '1.15rem',
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.05em',
              color: 'var(--text-primary)',
              userSelect: 'none',
            }}
          >
            AMO<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '2px' }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  padding: '7px 15px',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="mailto:odebiyimuiz85@gmail.com"
              className="nav-cta"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'var(--gradient-primary)',
                borderRadius: '100px',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = '0.85';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Mail size={13} />
              <span className="nav-cta-text">Hire Me</span>
            </a>

            <button
              className="nav-mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'none',
                color: 'var(--text-primary)',
                padding: '7px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div style={{
            marginTop: '8px',
            padding: '12px',
            background: 'rgba(5, 5, 9, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            animation: 'slide-up 0.2s ease',
          }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.name}
              </button>
            ))}
            <a
              href="mailto:odebiyimuiz85@gmail.com"
              style={{
                display: 'block',
                marginTop: '8px',
                padding: '13px 16px',
                background: 'var(--gradient-primary)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Contact Me
            </a>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          .nav-cta-text { display: none; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
