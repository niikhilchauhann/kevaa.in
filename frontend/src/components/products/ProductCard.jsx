import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/products/productCard.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="#f6b01e" />)}
      {halfStar && <FaStarHalfAlt color="#f6b01e" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="#f6b01e" />)}
    </>
  );
};

const ProductCard = ({ product }) => (
  <Link to={`/products/product/${product.id}`} className="product-card-link">
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <div className="rating">
        {getStars(product.rating)}
        <span className="rating-text">{product.rating}/5</span>
      </div>
      <p className="price">${product.price}</p>
    </div>
  </Link>
);

export default ProductCard;
