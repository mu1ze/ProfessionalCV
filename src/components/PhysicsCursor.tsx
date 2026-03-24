import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './PhysicsCursor.css';

export default function PhysicsCursor() {
    const [cursorStyle, cursorApi] = useSpring(() => ({
        x: 0, y: 0,
        config: { mass: 0.3, tension: 600, friction: 28 },
    }));

    const [followerStyle, followerApi] = useSpring(() => ({
        x: 0, y: 0,
        config: { mass: 2.5, tension: 120, friction: 20 },
    }));

    useEffect(() => {
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        let raf: number;

        const onMouseMove = (e: MouseEvent) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        };

        const animate = () => {
            followerX += (cursorX - followerX) * 0.06;
            followerY += (cursorY - followerY) * 0.06;
            cursorApi.start({ x: cursorX, y: cursorY });
            followerApi.start({ x: followerX, y: followerY });
            raf = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(raf);
        };
    }, [cursorApi, followerApi]);

    return (
        <>
            <animated.div className="cursor-dot" style={cursorStyle} />
            <animated.div className="cursor-follower" style={followerStyle} />
        </>
    );
}
