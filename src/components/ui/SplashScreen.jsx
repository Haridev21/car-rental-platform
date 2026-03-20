import { useEffect, useState } from 'react';
import './SplashScreen.css';
import porscheImg from '../../assets/porsche-splash.png';

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 6500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const brandName = "DRIVEEASE";

    return (
        <div className="master-splash-container">
            <div className="master-splash-overlay"></div>
            <div className="master-splash-content">
                <div className="automotive-image-wrapper">
                    <img src={porscheImg} alt="Porsche 911" className="splash-car-image" />
                    <div className="car-reflection-glow"></div>
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
