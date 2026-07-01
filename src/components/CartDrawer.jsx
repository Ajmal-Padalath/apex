import React from 'react';
import { X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer glass-panel ${isOpen ? 'open' : ''}`}>
        
        <div className="cart-header">
          <h2>Your Cart <span className="cart-count">({cartItems.length})</span></h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} color="var(--text-secondary)" className="mb-4" />
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
              <button className="btn-secondary" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="item-meta">
                      Size: {item.selectedSize || 'N/A'} | Color: 
                      <span className="color-swatch-small" style={{ backgroundColor: item.selectedColor }}></span>
                    </p>
                    <div className="item-price">${item.price.toFixed(2)}</div>
                    
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => onUpdateQuantity(item, item.quantity - 1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item, item.quantity + 1)}><Plus size={14} /></button>
                      </div>
                      <button className="remove-btn" onClick={() => onRemoveItem(item)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="btn-primary checkout-btn" onClick={onCheckout}>
              <CreditCard size={18} /> Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// Importing ShoppingCart just for the empty state
import { ShoppingCart } from 'lucide-react';
