import React from 'react';
import heroImage from '../images/poster-i1.svg';
import product1 from '../images/category1.svg';
import product2 from '../images/category2.svg';
import product3 from '../images/category3.svg';
import product4 from '../images/category4.svg';
import '../styles/Home.css';

function Home() {

  const copyToClipboard = () => {
    navigator.clipboard.writeText("HaryStore").then(() => {
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div className="new-home-container">
      
      <div className="hero-section">
        <div className="hero-text">
          <h3>Discover</h3>
          <h3 >the</h3>
          <h3 className="text-p">Best Product</h3>
          <p>Shop the latest trends and timeless classics for everyone.</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Shopping Hero" />
        </div>
      </div>

      <div className="featured-products">
        <h2>Our Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src={product1} alt="Product 1" />
            <h3>Men's Clothing</h3>
          </div>
          <div className="product-card">
            <img src={product2} alt="Product 2" />
            <h3>Women's Clothing</h3>
          </div>
          <div className="product-card">
            <img src={product3} alt="Product 3" />
            <h3>Jewelry</h3>
          </div>
          <div className="product-card">
            <img src={product4} alt="Product 4" />
            <h3>electronics</h3>
          </div>
        </div>
      </div>

      <div className="promo-banner">
        <h2>Exclusive 0.5$</h2>
        <p>Use code <strong>HaryStore</strong> at checkout. Limited time only!</p>
        <button className="discount-btn" onClick={copyToClipboard}>Copy Voucher</button>
      </div>

    </div>
  );
}

export default Home;
