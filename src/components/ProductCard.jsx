import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, onQuickView, onToggleWishlist, isWishlisted }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        {product.isNew && <span className="product-badge">New</span>}
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
        >
          <Heart size={18} fill={isWishlisted ? "var(--accent-orange)" : "none"} color={isWishlisted ? "var(--accent-orange)" : "white"} />
        </button>
        <img src={product.image} alt={product.name} className="product-image" />
        
        <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
          <button className="action-btn" onClick={() => onQuickView(product)}>
            <Eye size={18} /> Quick View
          </button>
          <button className="action-btn primary" onClick={() => onAddToCart(product)}>
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-meta">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-rating">
            <Star size={14} fill="var(--accent-orange)" color="var(--accent-orange)" />
            <span>{product.rating}</span>
            <span className="reviews">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
