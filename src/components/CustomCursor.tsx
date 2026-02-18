import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", mMove);
            document.addEventListener("mouseenter", mEnter);
            document.addEventListener("mouseleave", mLeave);
            document.addEventListener("mousedown", mDown);
            document.addEventListener("mouseup", mUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", mMove);
            document.removeEventListener("mouseenter", mEnter);
            document.removeEventListener("mouseleave", mLeave);
            document.removeEventListener("mousedown", mDown);
            document.removeEventListener("mouseup", mUp);
        };

        const mMove = (el: MouseEvent) => {
            setPosition({ x: el.clientX, y: el.clientY });
        };

        const mEnter = () => {
            setHidden(false);
        };

        const mLeave = () => {
            setHidden(true);
        };

        const mDown = () => {
            setClicked(true);
        };

        const mUp = () => {
            setClicked(false);
        };

        const handleLinkHoverEvents = () => {
            document.querySelectorAll("a, button, .clickable").forEach((el) => {
                el.addEventListener("mouseover", () => setLinkHovered(true));
                el.addEventListener("mouseout", () => setLinkHovered(false));
            });
        };

        addEventListeners();
        handleLinkHoverEvents();
        return () => removeEventListeners();
    }, []);

    // Also listen for DOM changes to attach listeners to new elements
    useEffect(() => {
        const observer = new MutationObserver(() => {
            document.querySelectorAll("a, button, .clickable").forEach((el) => {
                el.addEventListener("mouseover", () => setLinkHovered(true));
                el.addEventListener("mouseout", () => setLinkHovered(false));
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    const cursorClasses = `custom-cursor ${hidden ? "c-hidden" : ""} ${clicked ? "c-clicked" : ""} ${linkHovered ? "c-hovered" : ""}`;

    return (
        <>
            <style>{`
                .custom-cursor {
                    width: 40px;
                    height: 40px;
                    border: 2px solid var(--accent-primary);
                    border-radius: 50%;
                    position: fixed;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s ease;
                    transition-property: width, height, border;
                    will-change: width, height, transform, border;
                }
                .custom-cursor.c-hovered {
                    width: 50px;
                    height: 50px;
                    border-color: var(--accent-secondary);
                    background-color: rgba(252, 211, 77, 0.1);
                }
                .custom-cursor.c-clicked {
                    transform: translate(-50%, -50%) scale(0.9);
                    background-color: var(--accent-primary);
                }
                .custom-cursor.c-hidden {
                    opacity: 0;
                }
                 /* Hide default cursor on interactive elements if desired, generally safe to keep both or hide default body cursor */
                 body {
                    cursor: none;
                 }
                 a, button {
                    cursor: none;
                 }
                 @media (max-width: 768px) {
                    .custom-cursor {
                        display: none;
                    }
                    body, a, button {
                        cursor: auto;
                    }
                 }
            `}</style>
            <div
                className={cursorClasses}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
            <div
                style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--accent-secondary)',
                    borderRadius: '50%',
                    position: 'fixed',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    display: hidden ? 'none' : 'block'
                }}
            />
        </>
    );
};

export default CustomCursor;
