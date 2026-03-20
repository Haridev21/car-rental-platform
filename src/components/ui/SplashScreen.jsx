import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Total duration of splash screen

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="car-wrapper">
          <img src="/splash_car.png" alt="DriveEase" className="splash-car" />
          <div className="car-glow"></div>
        </div>
        
        <div className="brand-wrapper">
          <h1 className="brand-text">
            DRIVE<span className="text-primary">EASE</span>
          </h1>
          <p className="brand-tagline">Experience the Pinnacle of Luxury</p>
        </div>
        
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
