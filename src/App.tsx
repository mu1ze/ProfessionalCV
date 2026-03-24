import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Feedback from './pages/Feedback';
import Navbar from './components/Navbar';
import PhysicsCursor from './components/PhysicsCursor';
import './index.css';
import './components/Navbar.css';

function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
}

export default function App() {
    return (
        <LenisProvider>
            <BrowserRouter>
                <PhysicsCursor />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="/feedback" element={<Feedback />} />
                </Routes>
            </BrowserRouter>
        </LenisProvider>
    );
}
