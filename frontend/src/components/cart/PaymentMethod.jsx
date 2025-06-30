import React from 'react';
import '../../css/cart/paymentMethods.css';

function PaymentMethod() {
  const cards = [
    { id: 1, last4: '6754', expires: '06/2021' },
    { id: 2, last4: '5643', expires: '11/2025' }
  ];

  return (
    <div className="payment-method-container">
      <h3>Payment Method</h3>
      {cards.map((card, index) => (
        <div className="card-box" key={card.id}>
          <input type="radio" name="card" />
          <span className="card-info">**** **** **** {card.last4}</span>
          <span className="expiry">Expires {card.expires}</span>
          <button className="remove-btn">Remove</button>
        </div>
      ))}
      <button className="add-payment-btn">Add Payment method</button>
    </div>
  );
}

export default PaymentMethod;
