import React from 'react';
import '../../css/cart/discountBanners.css';

const DiscountBanner = () => {
  return (
    <div className="discount-banner">
      <div className="discount-content">
        <div className="icon-wrapper">
          <div className="icon-circle">
            <span className="percent-symbol">%</span>
          </div>
        </div>
        <p className="discount-text">
          <span className="highlight">10% Instant Discount</span> with Federal Bank Debit Cards on a min spend of $150. TCA
        </p>
      </div>
    </div>
  );
};

export default DiscountBanner;
