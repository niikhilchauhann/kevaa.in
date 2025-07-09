import React, { useState } from 'react';
import '../../css/productDescription/reviewHeader.css';
import { FiSliders } from 'react-icons/fi';
import WriteReview from './WtiteReview';

export default function ReviewHeader({ count, filter, setFilter, onWriteReview }) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const product = {
    image: '/src/assets/poloWithTippingDetails.png',
    name: 'Men Comfort Relaxed Fit Buffalo Checked Spread Collar Cotton Casual Shirt',
    brand: 'HIGHLANDER',
    size: '40',
  };
  
  return (
    <div className="review-header-wrapper">
      <h2 className="review-title">All Reviews <span>({count})</span></h2>

      <div className="review-actions">
        <button className="filter-icon"><FiSliders /></button>

        <select
          className="review-sort"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>

        <button className="write-review-btn" onClick={()=> setIsReviewOpen(true)}>
          Write a Review
        </button>
      </div>
      {isReviewOpen && (
        <div className="review-overlay">
          <div className="modal-backdrop" onClick={() => setIsReviewOpen(false)} />
          <div className="review-modal-container">
            <WriteReview
              product={product}
              onClose={() => setIsReviewOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
