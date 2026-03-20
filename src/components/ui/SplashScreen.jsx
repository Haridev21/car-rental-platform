import { useEffect, useState } from 'react';
import './SplashScreen.css';
import porscheImg from '../../assets/porsche-splash.png';

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
            <div className="master-splash-content photo-mode">
                <div className="porsche-hero-wrapper">
                    <div className="glass-card">
                        <img 
                            src={porscheImg} 
                            alt="Porsche 911 Carrera" 
                            className="porsche-photo"
                        />
                        <div className="card-shine"></div>
                    </div>
                    <div className="hero-glow"></div>
                </div>
                
                <div className="staggered-text-wrapper">
                    <div className="brand-letters">
                        {brandName.split("").map((letter, index) => (
                            <span 
                                key={index} 
                                className={`letter ${index > 4 ? 'accent' : ''}`}
                                style={{ animationDelay: `${2.2 + (index * 0.1)}s` }}
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
