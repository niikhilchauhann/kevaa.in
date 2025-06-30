import React from 'react';
import '../../css/cart/paymentTypes.css';

function PaymentType() {
  const types = [
    { id: 1, label: 'Free', method: 'Online Payments', date: '01 Feb, 2023', price: '$0.00' },
    { id: 2, label: '$8.50', method: 'Cash on delivery', date: '28 Jan, 2023', price: '$8.50' }
  ];

  return (
    <div className="payment-type-container">
      <h3>Payment Type</h3>
      {types.map((item) => (
        <div className="type-box" key={item.id}>
          <input type="radio" name="paymentType" />
          <div className="type-info">
            <div className="label">{item.label}</div>
            <div className="method">{item.method}</div>
          </div>
          <div className="date">{item.date}</div>
        </div>
      ))}
    </div>
  );
}

export default PaymentType;
