import React, { useState } from 'react';
import '../../css/productDescription/reviewHeader.css';
import { FiSliders } from 'react-icons/fi';
import WriteReview from './WtiteReview';

export default function ReviewHeader({ count, filter, setFilter, product, onSubmitReview, onWriteReview }) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // const product = {
  //   image: '/src/assets/poloWithTippingDetails.png',
  //   name: 'Men Comfort Relaxed Fit Buffalo Checked Spread Collar Cotton Casual Shirt',
  //   brand: 'HIGHLANDER',
  //   size: '40',
  // };
  const openReviewModal = () => {
    setIsReviewOpen(true);
    if (onWriteReview) onWriteReview();
  };

  const closeReviewModal = () => {
    setIsReviewOpen(false);
  };

  const handleSubmitFromModal = async (reviewText, rating, photo) => {
    if (onSubmitReview) {
      await onSubmitReview(reviewText, rating, photo);
    }
    closeReviewModal();
  };
  
  return (
    <div className="review-header-wrapper">
      <h2 className="review-title">All Reviews <span>({count})</span></h2>

      <div className="review-actions">
        <button className="filter-icon" aria-label="Filter Reviews"><FiSliders /></button>

        <select
          className="review-sort"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>

        <button className="write-review-btn" onClick={openReviewModal}>
          Write a Review
        </button>
      </div>
      {isReviewOpen && (
        <div className="review-overlay">
          <div className="modal-backdrop" onClick={closeReviewModal} />
          <div className="review-modal-container">
            <WriteReview
              product={product}
              onClose={closeReviewModal}
              onSubmit={handleSubmitFromModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
