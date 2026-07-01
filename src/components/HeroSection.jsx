import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient-overlay"></div>
        {/* We use a high quality unsplash athletic image */}
        <img 
          src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Athlete working out" 
          className="hero-image"
        />
      </div>
      
      <div className="container hero-content">
        <div className="hero-text-block">
          <span className="hero-subtitle text-gradient-cyan">Elevate Your Performance</span>
          <h1 className="hero-title">
            DEFY YOUR <br />
            <span className="text-gradient">LIMITS</span>
          </h1>
          <p className="hero-description">
            Discover premium athletic gear engineered for maximum performance, comfort, and style. Push boundaries with ApexSports.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">
              Shop Collection <ArrowRight size={18} />
            </button>
            <button className="btn-secondary play-btn">
              <Play size={18} fill="currentColor" /> Watch Video
            </button>
          </div>
        </div>
        
        <div className="hero-stats glass-panel">
          <div className="stat-item">
            <h4>500+</h4>
            <p>Premium Products</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h4>24/7</h4>
            <p>Expert Support</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h4>10k+</h4>
            <p>Happy Athletes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
