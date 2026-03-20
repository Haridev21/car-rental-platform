import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="minimal-splash-container">
            <div className="minimal-splash-content">
                <div className="logo-animation-wrapper">
                    <svg className="splash-logo-svg" viewBox="0 0 100 100">
                        <path 
                            className="logo-path" 
                            d="M20,30 L80,30 L80,70 L20,70 Z M35,40 L65,40 M35,50 L65,50 M35,60 L55,60" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3"
                        />
                    </svg>
                    <div className="logo-pulse"></div>
                </div>
                
                <div className="text-reveal-wrapper">
                    <h1 className="reveal-title">
                        DRIVE<span className="accent">EASE</span>
                    </h1>
                    <div className="reveal-line"></div>
                    <p className="reveal-subtitle">PREMIUM MOBILITY</p>
                </div>

                <div className="minimal-loader">
                    <div className="loader-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
