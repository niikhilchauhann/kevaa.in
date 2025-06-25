import React, { useState } from 'react';
import '../../css/cart/OrderSummary.css';

const OrderSummary = ({ subtotal, discount, shipping, couponApplied }) => {
  const [couponCode, setCouponCode] = useState('');
  const total = subtotal - discount + shipping - couponApplied;

  return (
    <div className="cart-summary">
      <h2 className="summary-heading">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="summary-breakdown">
        <div className="summary-row">
          <span>Price</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span>${discount.toFixed(1)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'shipping-free' : ''}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="summary-row">
          <span>Coupon Applied</span>
          <span>${couponApplied.toFixed(2)}</span>
        </div>
        <hr className="summary-divider" />
        <div className="summary-total">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="summary-delivery">
        <div className="summary-row-sm">
          <span>Estimated Delivery by</span>
          <span className="summary-date">01 Feb, 2023</span>
        </div>
      </div>

      {/* Coupon Input */}
      <div className="summary-coupon">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="coupon-input"
          />
          <div className="input-icon">
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="checkout-btn">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
