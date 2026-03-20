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
                <div className="automotive-logo-wrapper high-fidelity">
                    <svg className="car-silhouette-svg" viewBox="0 0 200 80">
                        <defs>
                            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1e3a8a" />
                                <stop offset="50%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1e3a8a" />
                            </linearGradient>
                        </defs>
                        <g className="full-car-group" fill="none" stroke="url(#line-gradient)" strokeWidth="1">
                            {/* Detailed Body Contour */}
                            <path 
                                className="car-line body-outline" 
                                d="M15,55 C15,55 25,54 30,52 C35,50 45,35 65,32 C85,29 120,29 145,38 C160,43 175,54 185,55 L195,57 L195,65 L185,69 C185,69 170,70 160,70 M40,70 L15,70 L10,65 L10,55" 
                            />
                            {/* Cabin / Windows */}
                            <path className="car-line window-outline" d="M65,32 Q100,28 140,36 L135,45 Q100,40 68,45 Z" />
                            {/* Wheels with spokes animation */}
                            <g className="wheel-group">
                                <circle className="car-line wheel-rim" cx="50" cy="65" r="9" />
                                <path className="car-line wheel-spokes" d="M50,56 L50,74 M41,65 L59,65" opacity="0.4" />
                            </g>
                            <g className="wheel-group">
                                <circle className="car-line wheel-rim" cx="150" cy="65" r="9" />
                                <path className="car-line wheel-spokes" d="M150,56 L150,74 M141,65 L159,65" opacity="0.4" />
                            </g>
                            {/* Front/Rear detailed lines */}
                            <path className="car-line detail-line" d="M10,60 L25,60 M185,60 L195,60" stroke="#3b82f6" strokeWidth="1.5" />
                            <path className="car-line door-line" d="M95,38 L95,70 M68,45 L135,45" opacity="0.3" />
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
