import Hero from '../components/Hero';
import CoverLetter from '../components/CoverLetter';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectShowcase from '../components/ProjectShowcase';
import SkillsMatrix from '../components/SkillsMatrix';
import './Home.css';

export default function Home() {
    return (
        <>
            <Hero />
            <CoverLetter />
            <ExperienceTimeline />
            <ProjectShowcase />
            <SkillsMatrix />
            <footer className="cv-footer">
                <div className="cv-footer-inner">
                    <div className="cv-footer-left">
                        <p className="cv-footer-label">End of Document</p>
                        <p className="cv-footer-name">Aderinola Muiz Odebiyi</p>
                    </div>
                    <div className="cv-footer-right">
                        <p className="cv-footer-links">
                            <a href="mailto:odebiyimuiz85@gmail.com">Email</a>
                            <span>·</span>
                            <a href="https://linkedin.com/in/muizOdebiyi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <span>·</span>
                            <a href="https://github.com/mu1ze" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </p>
                        <p className="cv-footer-copy">
                            © {new Date().getFullYear()} Aderinola Muiz Odebiyi. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
