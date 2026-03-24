import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import InertiaPaper from './InertiaPaper';
import './CoverLetter.css';

export default function CoverLetter() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cl-header', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.3,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <section id="cover-letter" className="cl-section" ref={sectionRef}>
            <div className="cl-header">
                <div className="cl-label">
                    <span className="cl-hash">0x01 // COVER_LETTER.doc</span>
                    <span className="cl-status">
                        <span className="cl-dot" />
                        Confidential
                    </span>
                </div>
                <h2 className="cl-title">
                    Cover <span className="gradient-text">Letter</span>
                </h2>
                <p className="cl-subtitle">
                    Aderinola Muiz Odebiyi — Full Stack Developer
                </p>
            </div>

            <InertiaPaper className="cl-document">
                {/* Letterhead */}
                <div className="cl-letterhead">
                    <div className="cl-from">
                        <p className="cl-name">Aderinola Muiz Odebiyi</p>
                        <p>Toronto, Ontario, Canada</p>
                        <p>odebiyimuiz85@gmail.com</p>
                        <p>linkedin.com/in/muizOdebiyi</p>
                    </div>
                    <div className="cl-date-block">
                        <p className="cl-date">{today}</p>
                    </div>
                </div>

                <div className="cl-divider" />

                {/* Recipient */}
                <div className="cl-recipient">
                    <p>To Whom It May Concern,</p>
                </div>

                <div className="cl-salutation">
                    <p>Dear Hiring Committee,</p>
                </div>

                {/* Body paragraphs */}
                <div className="cl-body">
                    <p className="cl-para">
                        I am writing to express my strong interest in the Full Stack Developer position at your organization. With a Bachelor's degree in Computer Science from Brock University and hands-on experience building production-ready applications, I bring a rare combination of <strong>technical depth</strong>, <strong>creative problem-solving</strong>, and <strong>resilience</strong> that I believe would make me a valuable addition to your team.
                    </p>

                    <p className="cl-para">
                        My journey in technology hasn't been a straight line—it has been defined by <strong>relentless determination</strong>. Beginning university at 16 required a maturity beyond my years, but my greatest test came during the COVID-19 pandemic. Isolated in a foreign country, thousands of miles from family, programming became my lifeline. I immersed myself in building projects and teaching myself new frameworks. What could have been a period of despair instead became a period of <strong>profound growth</strong>, reigniting my passion for creation.
                    </p>

                    <p className="cl-para">
                        December 2024 tested my physical limits in ways I could never have anticipated. A car accident left me with a broken right arm—my dominant hand—requiring surgery and extensive physiotherapy. As a final-year CS student, this injury couldn't have come at a worse time. Yet, I refused to let it define me. I adapted, persevered, and pushed through pain and exhaustion to complete every assignment and exam. This experience taught me that <strong>true dedication means showing up</strong> even when circumstances make it nearly impossible.
                    </p>

                    <p className="cl-para">
                        Today, I channel that same resilience into building production-ready applications. From self-employed projects to my current role as a Level 3 Technical Advisor, I bring end-to-end ownership and deep expertise in the full stack. Whether working with <strong>React, Node.js, Python, PostgreSQL, AWS, Docker</strong>, or complex database architectures, I approach each challenge with the determination that carried me through isolation and injury.
                    </p>

                    <p className="cl-para">
                        My technical proficiency is built on a foundation of genuine passion and hard-earned perseverance. I don't just write code—I solve problems with creativity and persistence. I am <strong>eager to bring this resilience, technical expertise, and relentless commitment to excellence</strong> to your organization.
                    </p>

                    <p className="cl-para">
                        Thank you for your time and consideration. I look forward to the opportunity to discuss how my background, skills, and drive align with your team's goals.
                    </p>
                </div>

                <div className="cl-closing">
                    <p className="cl-signature">Sincerely,</p>
                    <div className="cl-signature-block">
                        <p className="cl-signature-name">Aderinola Muiz Odebiyi</p>
                        <p className="cl-signature-title">Full Stack Developer</p>
                    </div>
                </div>

                {/* Decorative seal */}
                <div className="cl-seal">
                    <div className="cl-seal-inner">
                        <span>DV</span>
                    </div>
                </div>
            </InertiaPaper>
        </section>
    );
}
