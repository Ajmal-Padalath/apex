import React from 'react';
import { Activity } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Activity color="var(--accent-cyan)" size={32} />
            <span>Apex<span className="text-gradient">Sports</span></span>
          </div>
          <p className="footer-desc">
            Equipping athletes with the most advanced gear to shatter their limits. Designed for performance, crafted for style.
          </p>
          <div className="social-links">
            <a href="#" className="social-text">IG</a>
            <a href="#" className="social-text">X</a>
            <a href="#" className="social-text">FB</a>
            <a href="#" className="social-text">YT</a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">Men's Footwear</a></li>
            <li><a href="#">Women's Footwear</a></li>
            <li><a href="#">Apparel</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>Get exclusive offers, sneak peeks, and pro tips straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>&copy; {new Date().getFullYear()} ApexSports. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
