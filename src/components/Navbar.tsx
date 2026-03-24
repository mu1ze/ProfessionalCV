import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Cover Letter', id: 'cover-letter' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        setIsOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`cv-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="cv-nav-inner">
                {/* Logo */}
                <div
                    className="cv-nav-logo"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className="cv-logo-text">DVLLI</span>
                    <span className="cv-logo-dot">.</span>
                </div>

                {/* Desktop Links */}
                <div className="cv-nav-links">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className="cv-nav-link"
                        >
                            {link.name}
                        </button>
                    ))}
                    <a
                        href="mailto:odebiyimuiz85@gmail.com"
                        className="cv-nav-cta"
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="cv-nav-mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="cv-nav-mobile">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className="cv-nav-mobile-link"
                        >
                            {link.name}
                        </button>
                    ))}
                    <a href="mailto:odebiyimuiz85@gmail.com" className="cv-nav-mobile-cta">
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
}
