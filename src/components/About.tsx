import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"]
    });

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <section ref={ref} className="about-section container">
            <motion.div
                style={{
                    scale: scaleProgress,
                    opacity: opacityProgress,
                }}
                className="about-container glass-panel"
            >
                <div className="about-header">
                    <h2 className="about-title">Beyond the Code</h2>
                    <p className="about-subtitle">
                        My journey from Lagos to Ontario, shaped by resilience and an unwavering passion for technology.
                    </p>
                </div>

                <div className="story-content">
                    <p className="story-paragraph">
                        My path in technology hasn't been a straight line—it's been a journey of relentless determination.
                        From completing high school in Nigeria at 15 to earning my Bachelor of Science in Computer Science
                        from Brock University at 21, my story is defined by an <span className="story-highlight">unwavering commitment to learning</span> and the resilience to overcome obstacles that would have derailed many others.
                    </p>

                    <p className="story-paragraph">
                        Beginning university at 16 required maturity beyond my years, but my greatest test came during the COVID-19 pandemic.
                        Isolated in a foreign country, thousands of miles from family, programming became my lifeline.
                        I immersed myself in code, building projects and teaching myself new frameworks.
                        What could have been a period of despair instead became a period of <span className="story-highlight">profound growth</span>, reigniting my passion for creation.
                    </p>

                    <motion.div
                        className="quote-block"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        "Technology didn't just keep me afloat; it reminded me of my purpose."
                    </motion.div>

                    <p className="story-paragraph">
                        December 2024 tested my physical limits. A car accident left me with a broken right arm—my dominant hand—requiring surgery and extensive physiotherapy.
                        As a final-year CS student, this injury couldn't have come at a worse time. Yet, I refused to let it define me.
                        I adapted, persevered, and pushed through pain and exhaustion to complete every assignment and exam.
                        This experience taught me that <span className="story-highlight">true dedication means showing up</span> even when circumstances make it nearly impossible.
                    </p>

                    <p className="story-paragraph">
                        Today, I channel that same resilience into building production-ready applications.
                        From self-employed projects to my role as a Level 3 Technical Advisor, I bring end-to-end ownership and a deep expertise in the full stack.
                        Whether working with React, Node.js, or complex database architectures, I approach each challenge with the determination that carried me through isolation and injury.
                    </p>

                    <p className="story-paragraph">
                        My technical proficiency is built on a foundation of genuine passion and hard-earned perseverance.
                        I don't just write code; I solve problems with creativity and persistence.
                        I am eager to bring this resilience, technical expertise, and relentless commitment to excellence to your team.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
