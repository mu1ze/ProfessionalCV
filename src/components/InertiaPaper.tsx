import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './InertiaPaper.css';

interface InertiaPaperProps {
    children: React.ReactNode;
    className?: string;
}

export default function InertiaPaper({ children, className = '' }: InertiaPaperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const [{ x, y, rotateX, rotateY, scale }, api] = useSpring(() => ({
        x: 0, y: 0,
        rotateX: 0, rotateY: 0,
        scale: 1,
        config: { mass: 1.2, tension: 220, friction: 26 },
    }));

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || isDragging) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateYVal = (mouseX / rect.width) * 22;
        const rotateXVal = -(mouseY / rect.height) * 22;

        api.start({
            x: mouseX * 0.04,
            y: mouseY * 0.04,
            rotateX: rotateXVal,
            rotateY: rotateYVal,
            scale: isHovered ? 1.015 : 1,
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        api.start({ scale: 1.02 });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!isDragging) {
            api.start({ x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 });
        }
    };

    return (
        <animated.div
            ref={ref}
            className={`inertia-paper ${className}`}
            style={{
                x, y,
                rotateX, rotateY,
                scale,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Paper stack effect */}
            <div className="paper-stack paper-stack-back" />
            <div className="paper-stack paper-stack-mid" />
            
            {/* Main paper */}
            <div className="paper-main">
                {/* Paper texture overlay */}
                <div className="paper-texture" />
                
                {/* Subtle ruled lines (like real paper) */}
                <div className="paper-lines" />
                
                {/* Page content */}
                <div className="paper-body" style={{ transform: 'translateZ(60px)' }}>
                    {children}
                </div>
            </div>

            {/* Dynamic shadow */}
            <div
                className={`paper-dynamic-shadow ${isHovered ? 'active' : ''}`}
                style={{
                    background: isHovered
                        ? 'rgba(0, 245, 212, 0.08)'
                        : 'rgba(0, 0, 0, 0.25)',
                }}
            />

            {/* Corner fold */}
            <div className="paper-corner-fold" />
        </animated.div>
    );
}
