import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            gsap.set('.hero-tag', { opacity: 0, y: 20 });
            gsap.set('.hero-title span', { opacity: 0, y: 60, rotateX: -30 });
            gsap.set('.hero-sub', { opacity: 0, x: -30 });
            gsap.set('.hero-desc', { opacity: 0, y: 20 });
            gsap.set('.hero-actions', { opacity: 0, y: 20 });
            gsap.set('.hero-data', { opacity: 0 });

            tl
                .to('.hero-tag', { opacity: 1, y: 0, duration: 0.7 }, 0.3)
                .to('.hero-title span', { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1 }, 0.5)
                .to('.hero-sub', { opacity: 1, x: 0, duration: 0.8 }, 1.1)
                .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8 }, 1.3)
                .to('.hero-actions', { opacity: 1, y: 0, duration: 0.6 }, 1.5)
                .to('.hero-data', { opacity: 1, duration: 0.5 }, 1.8);
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToCoverLetter = () => {
        document.getElementById('cover-letter')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero-web3" ref={heroRef}>
            {/* Ambient glows */}
            <div className="ambient-glow glow-1" />
            <div className="ambient-glow glow-2" />
            <div className="ambient-glow glow-3" />

            {/* Hex grid */}
            <div className="hex-grid" />

            {/* Grid background */}
            <div className="hero-grid" />

            <div className="hero-content">
                {/* Tag */}
                <div className="hero-tag">
                    <span className="hero-tag-dot" />
                    <span className="hero-tag-text">FULL STACK DEVELOPER · BROCK UNIVERSITY</span>
                </div>

                {/* Title */}
                <h1 className="hero-title">
                    <span>Aderinola</span>
                    <span className="hero-title-accent">Muiz Odebiyi</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-sub">
                    <span className="hero-sub-line" />
                    Building intelligent platforms &amp; scalable solutions
                </p>

                {/* Description */}
                <p className="hero-desc">
                    I transform complex requirements into seamless digital experiences.
                    Specializing in React, Node.js, Python &amp; Cloud Architectures —
                    with a track record of shipping production-quality software.
                </p>

                {/* Actions */}
                <div className="hero-actions">
                    <button className="hero-btn-primary" onClick={scrollToCoverLetter}>
                        <span>View Cover Letter</span>
                        <ArrowRight size={18} />
                    </button>
                    <a
                        href="https://linkedin.com/in/muizOdebiyi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn-secondary"
                    >
                        LinkedIn
                    </a>
                </div>

                {/* Data badges */}
                <div className="hero-data">
                    <div className="hero-data-item">
                        <span className="hero-data-val">3+</span>
                        <span className="hero-data-label">Years Experience</span>
                    </div>
                    <div className="hero-data-sep" />
                    <div className="hero-data-item">
                        <span className="hero-data-val">15+</span>
                        <span className="hero-data-label">Projects Shipped</span>
                    </div>
                    <div className="hero-data-sep" />
                    <div className="hero-data-item">
                        <span className="hero-data-val">Full Stack</span>
                        <span className="hero-data-label">Expertise</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <ChevronDown size={24} />
                <span>scroll</span>
            </div>

            {/* Floating blockchain decorations */}
            <div className="hero-blockchain-deco">
                <div className="bcd-item bcd-1">
                    <span className="bcd-hash">0x7f3a</span>
                    <span className="bcd-label">LATEST_BLOCK</span>
                </div>
                <div className="bcd-item bcd-2">
                    <span className="bcd-hash">0xa9c2</span>
                    <span className="bcd-label">PREV_HASH</span>
                </div>
                <div className="bcd-item bcd-3">
                    <span className="bcd-hash">0xb12e</span>
                    <span className="bcd-label">TX_COUNT</span>
                </div>
            </div>
        </section>
    );
}
