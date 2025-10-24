// import React, { useState } from 'react';
// import './orderSummary.css';

// const OrderSummary = ({ subtotal, discount, shipping, couponApplied, onProceedToCheckout }) => {
//   const [couponCode, setCouponCode] = useState('');
//   const total = subtotal - discount + shipping - couponApplied;

//   return (
//     <div className="cart-summary">
//       <h2 className="summary-heading">Order Summary</h2>

//       {/* Price Breakdown */}
//       <div className="summary-breakdown">
//         <div className="summary-row">
//           <span>Price</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>
//         <div className="summary-row">
//           <span>Discount</span>
//           <span>₹{discount.toFixed(1)}</span>
//         </div>
//         <div className="summary-row">
//           <span>Shipping</span>
//           <span className={shipping === 0 ? 'shipping-free' : ''}>
//             {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
//           </span>
//         </div>
//         <div className="summary-row">
//           <span>Coupon Applied</span>
//           <span>₹{couponApplied.toFixed(2)}</span>
//         </div>
//         <hr className="summary-divider" />
//         <div className="summary-total">
//           <span>TOTAL</span>
//           <span>₹{total.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Delivery Info */}
//       <div className="summary-delivery">
//         <div className="summary-row-sm">
//           <span>Estimated Delivery by</span>
//           <span className="summary-date">01 Feb, 2023</span>
//         </div>
//       </div>

//       {/* Coupon Input */}
//       <div className="summary-coupon">
//         {/* <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="Coupon Code"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)}
//             className="coupon-input"
//           />
//           <div className="input-icon">
//             <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </div>
//         </div> */}
//       </div>


//     </div>
//   );
// };

// export default OrderSummary;

















import React, { useState } from 'react';
import './orderSummary.css';

const OrderSummary = ({
  subtotal,
  discount,
  shipping,
  couponApplied,
  currentStep,
  onProceedToCheckout,
  onReviewOrder,
  payLoading
}) => {
  const [couponCode, setCouponCode] = useState('');
  const total = subtotal - discount + shipping - couponApplied;

  return (
    <div className="cart-summary">
      <h2 className="summary-heading">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="summary-breakdown">
        <div className="summary-row">
          <span>Price</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span>₹{discount.toFixed(1)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'shipping-free' : ''}>
            {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="summary-row">
          <span>Coupon Applied</span>
          <span>₹{couponApplied.toFixed(2)}</span>
        </div>
        <hr className="summary-divider" />
        <div className="summary-total">
          <span>TOTAL</span>
          <span>₹{total.toFixed(2)}</span>
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

      {/* Step Buttons */}
      {(currentStep === 1 || currentStep === 2) && (
        <button
          className="checkout-btn"
          onClick={onProceedToCheckout}
          style={{ marginTop: '20px', width: '100%' }}
        >
          {currentStep === 1 ? 'Proceed to Checkout' : 'Continue to Shipping'}
        </button>
      )}

      {currentStep === 3 && (
        <button
          className="pink-btn"
          onClick={onReviewOrder}
          disabled={payLoading}
          style={{ marginTop: '20px', width: '100%' }}
        >
          {payLoading ? 'Placing Order...' : 'Review & Place Order'}
        </button>
      )}
    </div>
  );
};

export default OrderSummary;

