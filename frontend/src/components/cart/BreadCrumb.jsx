import React from 'react';
import '../../css/cart/breadcrumb.css';

function Breadcrumb() {
  return (
    <div className="breadcrumb-container">
      <span className="step active">Address</span>
      <span className="separator">{'>'}</span>
      <span className="step">Shipping</span>
      <span className="separator">{'>'}</span>
      <span className="step">Payment</span>
    </div>
  );
}

export default Breadcrumb;
