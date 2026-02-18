import { useEffect, useState } from 'react';
import './Loader.css';
import logo from '../assets/logo.svg';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading for 2.5 seconds or until app is ready
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 800); // Match fade-out duration
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`loader-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="loader-content">
        <div className="logo-container">
          <img src={logo} alt="DV Logo" className="logo-3d" />
          <div className="logo-shadow"></div>
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <p className="loading-text">REFINING EXPERIENCE</p>
      </div>
    </div>
  );
}
