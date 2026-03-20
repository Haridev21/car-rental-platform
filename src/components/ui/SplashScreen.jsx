import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 6200);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const brandName = "DRIVEEASE";

    return (
        <div className="master-splash-container">
            <div className="master-splash-overlay"></div>
            <div className="master-splash-content">
                <div className="automotive-logo-wrapper porsche-detail">
                    <svg className="car-silhouette-svg" viewBox="0 0 200 80">
                        <defs>
                            <linearGradient id="porsche-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1e293b" />
                                <stop offset="50%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1e293b" />
                            </linearGradient>
                        </defs>
                        <g className="porsche-911-group" fill="none" stroke="currentColor" strokeWidth="1.2">
                            {/* Iconic Porsche 911 Silhouette (Flyline) */}
                            <path 
                                className="car-line porsche-body" 
                                d="M15,62 L20,60 Q35,58 45,52 Q55,42 65,38 Q100,22 145,35 Q175,42 185,58 L190,62 L190,68 L180,72 L160,72 M40,72 L15,72 L10,68 L10,62" 
                                stroke="url(#porsche-gradient)"
                            />
                            {/* Window & Cabin line */}
                            <path className="car-line porsche-window" d="M70,38 Q100,28 140,36 Q135,46 125,48 Q100,44 75,48 Z" opacity="0.6" />
                            {/* Rear Light Bar (Porsche Signature) */}
                            <path className="car-line porsche-light-bar" d="M175,55 L188,55" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                            {/* Wheels */}
                            <g className="wheel-group">
                                <circle className="car-line wheel-rim" cx="50" cy="70" r="9" />
                                <circle className="car-line wheel-dot" cx="50" cy="70" r="1" fill="currentColor" stroke="none" />
                                <path className="car-line wheel-spokes" d="M50,61 L50,79 M41,70 L59,70" opacity="0.3" />
                            </g>
                            <g className="wheel-group">
                                <circle className="car-line wheel-rim" cx="150" cy="70" r="9" />
                                <circle className="car-line wheel-dot" cx="150" cy="70" r="1" fill="currentColor" stroke="none" />
                                <path className="car-line wheel-spokes" d="M150,61 L150,79 M141,70 L159,70" opacity="0.3" />
                            </g>
                            {/* Door & Air Intake detail */}
                            <path className="car-line porsche-door" d="M100,42 L100,72 M155,55 Q160,55 165,65" opacity="0.4" />
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
                                style={{ animationDelay: `${1.8 + (index * 0.1)}s` }}
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
