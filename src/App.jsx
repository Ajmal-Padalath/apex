import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import WishlistDrawer from './components/WishlistDrawer';
import ContactSection from './components/ContactSection';
import { products } from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  // Add to Cart
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      );
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: product.selectedSize || product.sizes?.[0], selectedColor: product.selectedColor || product.colors?.[0] }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (product, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => item === product ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (product) => {
    setCartItems(prev => prev.filter(item => item !== product));
  };

  const handleToggleWishlist = (product) => {
    setWishlist(prev => 
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="app">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      
      <HeroSection />

      <main className="main-content" id="shop">
        <div className="container">
          <div className="section-header" id="categories">
            <h2>Trending <span className="text-gradient">Equipment</span></h2>
            
            <div className="category-filters">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isWishlisted={wishlist.includes(product.id)}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        </div>
      </main>

      <ContactSection />

      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <QuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={cartTotal}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}

export default App;
