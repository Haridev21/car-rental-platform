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

    const brandName = "DRIVEEASE";

    return (
        <div className="master-splash-container">
            <div className="master-splash-overlay"></div>
            <div className="master-splash-content">
                <div className="automotive-logo-wrapper">
                    <svg className="car-silhouette-svg" viewBox="0 0 200 80">
                        {/* High-end Car Silhouette Path */}
                        <path 
                            className="car-contour" 
                            d="M10,60 L25,58 C35,58 45,45 60,40 C80,33 110,33 135,42 C150,47 165,58 185,60 L190,62 M10,60 Q5,60 5,55 L5,50 Q40,48 45,40 M160,45 Q175,45 185,55" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path 
                            className="car-detail" 
                            d="M60,40 L130,40 M85,34 L110,34" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="0.8"
                            opacity="0.6"
                        />
                    </svg>
                    <div className="car-shadow-glow"></div>
                </div>
                
                <div className="staggered-text-wrapper">
                    <div className="brand-letters">
                        {brandName.split("").map((letter, index) => (
                            <span 
                                key={index} 
                                className={`letter ${index > 4 ? 'accent' : ''}`}
                                style={{ animationDelay: `${1.5 + (index * 0.1)}s` }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                    <div className="brand-line"></div>
                    <p className="brand-subtitle">EXECUTIVE CAR RENTAL</p>
                </div>

                <div className="precision-loader">
                    <div className="loader-fill">
                        <div className="loader-glow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
