import React from 'react';
import { X, Trash2, Heart, ShoppingCart } from 'lucide-react';
import './WishlistDrawer.css';

export default function WishlistDrawer({ isOpen, onClose, wishlistItems, onRemoveItem, onAddToCart }) {
  
  return (
    <>
      <div className={`wishlist-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`wishlist-drawer glass-panel ${isOpen ? 'open' : ''}`}>
        
        <div className="wishlist-header">
          <h2>Your Wishlist <span className="wishlist-count">({wishlistItems.length})</span></h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="wishlist-content">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <Heart size={48} color="var(--text-secondary)" className="mb-4" />
              <h3>Your wishlist is empty</h3>
              <p>Save items you love to your wishlist to review them later.</p>
              <button className="btn-secondary" onClick={onClose}>Explore Gear</button>
            </div>
          ) : (
            <ul className="wishlist-items">
              {wishlistItems.map(item => (
                <li key={item.id} className="wishlist-item">
                  <img src={item.image} alt={item.name} className="wishlist-item-image" />
                  <div className="wishlist-item-details">
                    <h4>{item.name}</h4>
                    <div className="item-price">${item.price.toFixed(2)}</div>
                    
                    <div className="item-actions">
                      <button className="btn-primary add-to-cart-small" onClick={() => onAddToCart(item)}>
                        <ShoppingCart size={14} /> Add
                      </button>
                      <button className="remove-btn" onClick={() => onRemoveItem(item)} aria-label="Remove from wishlist">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
