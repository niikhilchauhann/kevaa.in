import React from 'react';
import '../css/home/poojaProducts.css';
import decor from '../assets/decor.jpg'; // rename and place your image in /src/assets/

const PoojaProducts = () => {
  return (
    <div className="pooja-container">
      <div className="pooja-left">
        <h1>Lab tested and authentic<br />pooja products</h1>
        <p className="subtitle">Made for your home and for your wellness</p>

        <ul className="features">
          <li><span>✓</span> <strong>Eco-conscious:</strong> Sustainably packed, spiritually pure — good for your soul and the Earth.</li>
          <li><span>✓</span> <strong>Pure & Gentle:</strong> Only nature’s finest — lab-verified</li>
          <li><span>✓</span> <strong>Handcrafted with Devotion:</strong> Every item is blessed by tradition and made with sacred care.</li>
          <li><span>✓</span> <strong>Made to Endure:</strong> Designed to last, with timeless quality and spiritual depth in every use.</li>
        </ul>

        <button className="learn-more">Learn more</button>
      </div>

      <div className="pooja-right">
        <img src={decor} alt="Pooja product" />
      </div>
    </div>
  );
};

export default PoojaProducts;
