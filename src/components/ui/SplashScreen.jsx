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
                <div className="automotive-logo-wrapper full-car">
                    <svg className="car-silhouette-svg" viewBox="0 0 200 80">
                        {/* More Detailed Full Car Path */}
                        <g className="full-car-group" fill="none" stroke="currentColor" strokeWidth="1.2">
                            {/* Main Body */}
                            <path 
                                className="car-line car-main-body" 
                                d="M20,60 L25,58 C35,58 45,45 60,40 C80,33 110,33 135,42 C150,47 165,58 185,60 L195,62 L195,68 L185,72 L160,72 M40,72 L15,72 L10,68 L10,60" 
                            />
                            {/* Windows & Roof line */}
                            <path className="car-line car-window" d="M60,40 Q100,34 135,42 L130,48 Q100,42 63,48 Z" opacity="0.7" />
                            {/* Front Wheel */}
                            <circle className="car-line car-wheel" cx="50" cy="68" r="10" />
                            <circle className="car-line car-wheel-inner" cx="50" cy="68" r="6" opacity="0.5" />
                            {/* Back Wheel */}
                            <circle className="car-line car-wheel" cx="150" cy="68" r="10" />
                            <circle className="car-line car-wheel-inner" cx="150" cy="68" r="6" opacity="0.5" />
                            {/* Door details */}
                            <path className="car-line car-door" d="M95,43 L95,72 M63,48 L130,48" strokeWidth="0.8" opacity="0.4" />
                            {/* Headlight/Bumper detail */}
                            <path className="car-line car-light" d="M190,62 L195,63" strokeWidth="2" stroke="#3b82f6" />
                        </g>
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
