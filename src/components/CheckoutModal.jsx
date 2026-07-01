import React, { useState } from 'react';
import { X, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import './CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose, cartTotal, onCompleteOrder }) {
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Success step
    setTimeout(() => {
      onCompleteOrder();
      setStep(1);
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="checkout-modal glass-panel">
        {step < 4 && (
          <button className="close-btn modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        )}

        {step < 4 && (
          <div className="checkout-stepper">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Review</div>
          </div>
        )}

        <div className="checkout-content">
          {step === 1 && (
            <form onSubmit={handleNext} className="checkout-form">
              <h3>Shipping Information</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" required />
                </div>
                <div className="input-group full-width">
                  <label>Address</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>City</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>Zip Code</label>
                  <input type="text" required />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="checkout-form">
              <h3>Payment Method</h3>
              
              {/* Dynamic Credit Card Visual */}
              <div className="credit-card-visual">
                <div className="card-chip"></div>
                <div className="card-number">
                  {cardData.number || '#### #### #### ####'}
                </div>
                <div className="card-details">
                  <div className="card-name">
                    <span>Cardholder Name</span>
                    <div>{cardData.name || 'JOHN DOE'}</div>
                  </div>
                  <div className="card-expiry">
                    <span>Valid Thru</span>
                    <div>{cardData.expiry || 'MM/YY'}</div>
                  </div>
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Card Number</label>
                  <input type="text" name="number" maxLength="19" onChange={handleInputChange} required placeholder="0000 0000 0000 0000" />
                </div>
                <div className="input-group full-width">
                  <label>Name on Card</label>
                  <input type="text" name="name" onChange={handleInputChange} required placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label>Expiration (MM/YY)</label>
                  <input type="text" name="expiry" maxLength="5" onChange={handleInputChange} required placeholder="MM/YY" />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input type="text" name="cvv" maxLength="4" onChange={handleInputChange} required placeholder="123" />
                </div>
              </div>
              <div className="form-actions split">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  <ChevronLeft size={18} /> Back
                </button>
                <button type="submit" className="btn-primary">
                  Review Order <ChevronRight size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="checkout-form review-step">
              <h3>Review Your Order</h3>
              <div className="order-summary-box">
                <div className="summary-row">
                  <span>Items Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax (Estimated):</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Order Total:</span>
                  <span className="text-gradient-cyan">${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <div className="form-actions split">
                <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                  <ChevronLeft size={18} /> Back
                </button>
                <button type="submit" className="btn-primary">
                  Place Order
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="success-state">
              <div className="success-icon-wrapper">
                <CheckCircle size={64} color="var(--accent-cyan)" />
              </div>
              <h2>Order Confirmed!</h2>
              <p>Your premium gear is being prepared for dispatch.</p>
              <p className="order-number">Order #APX-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
