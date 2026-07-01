import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check } from 'lucide-react';
import './QuickViewModal.css';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...product, selectedColor, selectedSize });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quick-view-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content-grid">
          <div className="modal-image-col">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="modal-info-col">
            <span className="product-category">{product.category}</span>
            <h2 className="product-title">{product.name}</h2>
            
            <div className="product-meta-large">
              <div className="price">${product.price.toFixed(2)}</div>
              <div className="rating">
                <Star fill="var(--accent-orange)" color="var(--accent-orange)" size={16} />
                <span>{product.rating}</span>
                <span className="reviews">({product.reviews} reviews)</span>
              </div>
            </div>
            
            <p className="product-desc">{product.description}</p>
            
            {product.colors && (
              <div className="selector-group">
                <h4>Color</h4>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {product.sizes && (
              <div className="selector-group">
                <h4>Size</h4>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="tech-specs">
              <h4>Tech Specs</h4>
              <ul>
                {product.specs?.map((spec, idx) => (
                  <li key={idx}>- {spec}</li>
                ))}
              </ul>
            </div>
            
            <button 
              className={`btn-primary add-cart-large ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? <><Check size={20} /> Added to Cart</> : <><ShoppingBag size={20} /> Add to Cart</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
