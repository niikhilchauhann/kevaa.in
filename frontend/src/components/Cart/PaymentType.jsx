import React from 'react';
import './paymentTypes.css';

function PaymentType({ selectedPaymentType, setSelectedPaymentType }) {
  const types = [
    { id: 1, label: '₹49 - Shipping Charges', method: 'Online Payment', date: '01 Feb, 2023', price: '$0.00', value: 'online' },
    { id: 2, label: '₹99 ', method: 'Cash on delivery', date: '28 Jan, 2023', price: '₹59', value: 'cod' }
  ];

  return (
    <div className="payment-type-container">
      <h3>Payment Type</h3>
      {types.map((item) => (
        <div className="type-box" key={item.id}>
          <input
            type="radio"
            name="paymentType"
            value={item.value}
            checked={selectedPaymentType === item?.value}
            onChange={() => setSelectedPaymentType(item?.value)}
          />
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
