import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { products as allProducts } from '../../data/realProducts.js';
import ReviewHeader from './ReviewHeader.jsx';
import './productDetails.css';
// import ReactImageMagnify from 'react-image-magnify';
import InnerImageZoom from 'react-inner-image-zoom';
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import './reviewProducts.css';


import { MdArrowBack, MdArrowBackIosNew, MdKeyboardArrowRight } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsHeart } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import Testimonials from '../home/Testimonials.jsx';
import useCartStore from '../../store/cartStore.js';
import useReviewStore from '../../store/reviewStore.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from 'firebase/auth';
import { storage, auth } from "../../firebase.js";
import useAuthStore from '../../store/authStore.js';
import ScrollToTop from '../global/ScrollTop.jsx';
import ProductCard from './../Global/ProductCard';


export default function ProductDetails() {
  const addToCart = useCartStore(state => state.addToCart);
  const { id } = useParams();
  const product =
    allProducts.normal.find(p => p.id === parseInt(id)) ||
    allProducts.dailyEssentials.find(p => p.id === parseInt(id)) ||
    allProducts.havenlyHaste.find(p => p.id === parseInt(id)) ||
    allProducts.popularProducts.find(p => p.id === parseInt(id)) ||
    allProducts.categoryProducts.find(p => p.id === parseInt(id));

  const productId = product?.id;
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  // at the top with other state
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
      const touch =
        (typeof window !== "undefined" &&
          (window.matchMedia?.("(hover: none)").matches || "ontouchstart" in window));
      setIsTouch(!!touch);
    }, []);


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [quantity, setQuantity] = useState(1);

  const reviews = useReviewStore(state => state.reviews[productId]) ?? [];
  const subscribeToProductReviews = useReviewStore(state => state.subscribeToProductReviews);
  const addReview = useReviewStore(state => state.addReview);
  const [filter, setFilter] = useState('latest');

  useEffect(() => {
    if (productId) {
      const unsubscribe = subscribeToProductReviews(productId);
      return () => unsubscribe();
    }
  }, [productId, subscribeToProductReviews]);

  const handleSubmitReview = async (reviewText, rating, photo) => {
    const reviewObj = {
      message: reviewText.trim(),
      rating,
      name: (user.firstName || user.lastName) || user.displayName || user.email,
      publishedAt: new Date().toISOString(),
      photoURL: null,
    };

    if (photo) {
      try {
        const storageRef = ref(storage, `reviews/${productId}/${Date.now()}_${photo.name}`);
        const snapshot = await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(snapshot.ref);
        reviewObj.photoURL = downloadURL;
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }

    await addReview(productId, reviewObj);
  };

  if (!product) return <p>Product not found!</p>;

  const filteredReviews = [...reviews].sort((a, b) => {
    if (filter === 'highest') return b.rating - a.rating;
    if (filter === 'lowest') return a.rating - b.rating;
    return 0;
  });

  // const handleWriteReview = () => {
  //   alert("Redirect to review form or open modal.");
  // };

  const relatedProducts = [
    ...allProducts.normal,
    ...allProducts.dailyEssentials,
    ...allProducts.havenlyHaste,
    ...allProducts.popularProducts,
    ...allProducts.categoryProducts
  ]
    .filter(p =>
      p.id !== product.id &&
      (p.category === product.category || p.dressStyle === product.dressStyle)
    )
    .slice(0, 10);

  const images = Array.isArray(product?.variants?.[selectedColor]?.images)
    ? product.variants[selectedColor].images
    : Array.isArray(product.images) ? product.images : [product.image].filter(Boolean);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  const handleColorSelect = (color) => setSelectedColor(color);
  const prevImage = () => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  const nextImage = () => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} color="#f6b01e" />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" color="#f6b01e" />);
    while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} color="#f6b01e" />);
    return stars;
  };


  const navigate = useNavigate();
  const handleAddToCart = (proditem) => {
    if (user) {
      addToCart(proditem);
    } else {
      navigate('/login');
    }
  };


  const renderReviews = () => (
    <div className='main-review-container'>
      <ReviewHeader
        count={reviews.length}
        filter={filter}
        setFilter={setFilter}
        product={product}
        onSubmitReview={handleSubmitReview}
      // onWriteReview={handleWriteReview}
      />
      <div className="reviews-container">
        {filteredReviews.length === 0 ? (
          <p>No reviews yet for this product.</p>
        ) : (
          filteredReviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <div className="review-stars">{renderStars(review.rating)}</div>
                <strong>{review.name.split('@')[0]}</strong> <span className="verified"><GoVerified /></span>
              </div>
              <p className="review-message">"{review.message}"</p>
              {review.publishedAt && (
                <p className="review-date">Posted on {review.publishedAt}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderRelatedProducts = () => (
    
    <div className="related-products-section">
      <h2 className="related-title">You might also like</h2>
      <div className="related-products-list">
        {relatedProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
      </div>
    </div>
  );

  
  return (
    <div className='main-product-details-container' style={{ marginTop: `${user ? '120px' : '120px'}` }}>
      <ScrollToTop />
       
      <div className='main-product-details-header'>
        <p> {product.category} &gt; {product.dressStyle}</p>
        
         <div className="image-controls-wrapper">
              <div className="image-counter">
                <span>{String(currentImageIndex + 1).padStart(2, '0') + ' '}</span> / { ' ' + String(images.length).padStart(2, '0')}
              </div>
              <div className="arrow-controls">
                <button onClick={prevImage}>{'<'}</button>
                <button onClick={nextImage}>{'>'}</button>
              </div>
            </div>
      </div>

      <div className="product-details-container">
        
        <div className="product-info">
          <h1>{product.name}</h1>

          <div className="product-price-rating">
            <p className="price">₹{product.price}</p>
            <div className="rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-number">
                {product.rating} / 5.0 ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <p className="desc">{product.description}</p>

          <div className="color-options">
            {product?.availableColors?.map((color, index) => ( 
              <button
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color, color: color }}
                title={color}
              />

            ))}
          </div>

          <div className='quantity-add-to-cart'>
            <div className="quantity-selector">
              <button onClick={decrement} className="decrement-button">-</button>
              <span>{quantity}</span>
              <button onClick={increment} className="increment-button">+</button>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart({ ...product, quantity })}
            >
              Add to Cart
            </button>
          </div>

          <p className="extra-info">
            {product.deliveryInfo} • Tool-free assembly • ↺ {product.returnPolicy}
          </p>
          {/* <p className="wishlist"><BsHeart /> Add to Wishlist</p> */}
        </div>
        <div className="product-images">
          <div className="main-image-container">
            <div
              className="shadow-appealing"
              style={{
                background: `linear-gradient(to left, color-mix(in srgb, ${selectedColor} 25%, white 75%), transparent)`
              }}
            />

            <div className="main-image">
              <InnerImageZoom
                src={images?.[currentImageIndex] ?? product.image}
                zoomSrc={images?.[currentImageIndex] ?? product.image}
                zoomScale={1.5}
                zoomType={isTouch ? "click" : "hover"}
                className="zoom-image"
              />

            </div>
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
      
      
      {renderReviews()}
      {renderRelatedProducts()}
    </div>
  );
}

