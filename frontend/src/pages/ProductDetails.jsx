// Enhanced Product Details Page (Inspired by image you shared)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products as allProducts } from '../data/realProducts.js';
import '../css/productDescription/productsDetails.css';
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar, } from "react-icons/fa";
import { BsHeart } from 'react-icons/bs';

export default function ProductDetails() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found!</p>;

  const images = Array.isArray(product?.variants?.[selectedColor]?.images)
    ? product.variants[selectedColor].images
    : Array.isArray(product.images) ? product.images : [product.image].filter(Boolean);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const totalStars = 5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#f6b01e" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#f6b01e" />);
    }

    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#f6b01e" />);
    }

    return stars;
  };

  function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) =>
    r + r + g + g + b + b
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}

  return (
    <div className='main-product-details-container'>
      <div className='main-product-details-header'>
        <h4>{product.category} <MdKeyboardArrowRight /> {product.dressStyle} </h4>
      </div>
      <div className="product-details-container">
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-price-rating">
            <p className="price">${product.price}</p>
            <div className="rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-number">{product.rating} / 5 ({product.reviewsCount} reviews)</span>
            </div>

          </div>
          <p className="desc">{product.description}</p>

          <div className="color-options">
            {product?.availableColors?.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          <div className='quantity-add-to-cart'>
            <div className="quantity-selector">
              <button onClick={decrement}>-</button>
              <span>{quantity}</span>
              <button onClick={increment}>+</button>
            </div>

            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
          <p className="extra-info">
            {product.deliveryInfo} • Tool-free assembly • ↺ {product.returnPolicy}
          </p>
          <p className="wishlist">
            <BsHeart /> Add to Wishlist
          </p>
        </div>

        <div className="product-images">
          <div className="main-image-container">
            <div className="image-controls-wrapper">
              <div className="image-counter">
                <span> {String(currentImageIndex + 1).padStart(2, '0')} </span> / {String(images.length).padStart(2, '0')}
              </div>
              <div className="arrow-controls">
                <button onClick={prevImage}>‹</button>
                <button onClick={nextImage}>›</button>
              </div>
            </div>

            <img
              src={images?.[currentImageIndex] ?? product.image}
              alt={`${product.name} view ${currentImageIndex + 1}`}
              className="main-image"
            />
            <div className='shadow-appealing'
              style={{
                background: `linear-gradient(to left, ${selectedColor}, transparent)`
              }}
            ></div>

          </div>
          <div className="thumbnail-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'selected' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
