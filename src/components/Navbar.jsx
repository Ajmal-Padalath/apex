import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, Activity } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ cartCount, wishlistCount, onCartClick, onWishlistClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <a href="#" className="nav-brand">
          <Activity className="brand-icon" size={28} color="var(--accent-orange)" />
          <span className="brand-text">Apex<span className="text-gradient">Sports</span></span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Action Icons */}
        <div className="nav-actions">
          <button className="btn-icon" aria-label="Search">
            <Search size={20} />
          </button>
          
          <button className="btn-icon badge-container" aria-label="Wishlist" onClick={onWishlistClick}>
            <Heart size={20} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>
          
          <button className="btn-icon badge-container" aria-label="Cart" onClick={onCartClick}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="badge pulse-glow">{cartCount}</span>}
          </button>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          <ul>
            <li><a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop</a></li>
            <li><a href="#categories" onClick={() => setMobileMenuOpen(false)}>Categories</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
