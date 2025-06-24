import React from 'react';
import '../../css/productDescription/reviewHeader.css';
import { FiSliders } from 'react-icons/fi';

export default function ReviewHeader({ count, filter, setFilter, onWriteReview }) {
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

        <button className="write-review-btn" onClick={onWriteReview}>
          Write a Review
        </button>
      </div>
    </div>
  );
}
