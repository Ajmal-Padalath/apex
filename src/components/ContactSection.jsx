import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 4 seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-container glass-panel">
          <div className="contact-info">
            <h2>Get in <span className="text-gradient">Touch</span></h2>
            <p>Have questions about our premium gear, sizing, or your recent order? Reach out to our expert team.</p>
            <div className="contact-details">
              <p><strong>Email:</strong> support@apexsports.com</p>
              <p><strong>Phone:</strong> +1 (800) 123-4567</p>
              <p><strong>Hours:</strong> Mon-Fri, 9am - 6pm EST</p>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="contact-success">
                <CheckCircle size={48} color="var(--accent-cyan)" />
                <h3>Message Sent!</h3>
                <p>We've received your message and will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" required placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
                <div className="input-group">
                  <label>Message</label>
                  <textarea required placeholder="How can we help you?" rows="4"></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
