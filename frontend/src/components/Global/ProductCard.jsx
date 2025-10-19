import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import './productCard.css';

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="#f6b01e" />
      ))}
      {halfStar && <FaStarHalfAlt color="#f6b01e" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="#f6b01e" />
      ))}
    </>
  );
};

const getLabelClass = (label) => {
  if (!label) return '';
  const lower = label.toLowerCase();
  if (lower.includes('hot')) return 'hot';
  if (lower.includes('sale')) return 'sale';
  if (lower.includes('new')) return 'new';
  if (lower === 'save' || lower.includes('%')) return 'discount';
  return '';
};

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleAddToCart = (proditem) => {
    if (user) addToCart(proditem);
    else navigate('/login');
  };

  return (
    <Link to={`/products/product/${product.id}`} className="product-card-link">
      <div className="product-card" key={product.id}>
        {product.label && (
          <div className={`product-label ${getLabelClass(product.label)}`}>
            {product.label.toLowerCase() === 'save'
              ? `Save ${product.discount}%`
              : product.label}
          </div>
        )}

        <img src={product.image} alt={product.name} className="product-image" />
        <p className="product-category">{product.category}</p>
        <h4 className="product-title">{product.name}</h4>

        <p className="rates">
          <span className="rating">{getStars(product.rating)}</span>
          <span>({product.rating})</span>
        </p>

        <p className="product-brand">
          By <span>{product.brand}</span>
        </p>

        <div className="cart">
          <div className="price">
            <span className="current">₹{product.price}</span>
            <span className="original">₹{product.originalPrice}</span>
          </div>

          <button
            className="add-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(product);
            }}
          >
            <BsCart3 /> Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
