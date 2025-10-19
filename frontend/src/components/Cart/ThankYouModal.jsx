import React from "react";
import './thankYouModal.css'

const ThankYouModal = ({ onClose }) => {
  return (
    <div className="thank-you-modal-overlay">
      <div className="thank-you-modal">
        <h2>Thank You!</h2>
        <p>Your order has been placed successfully using Cash on Delivery.</p>
        <button onClick={onClose} className="modal-close-btn" >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThankYouModal;
