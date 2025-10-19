import React from "react";
import "./orderCards.css";

const OrderCard = ({ order }) => {
  return (
    <article className="order-card">
      <header className="order-header">
        <div className="order-meta">
          <strong>Order ID: {order.id}</strong>
          <br />
          <small>
            ₹{order.amount.toFixed(2)} •{" "}
            {order.createdAt?.seconds
              ? new Date(order.createdAt.seconds * 1000).toLocaleString()
              : new Date(order.createdAt).toLocaleString()}
          </small>
        </div>
        <span className="arrow-icon">❯</span>
      </header>

      <div className="address">
        <strong>Shipping to:</strong> <br />
        {order.address?.type} – {order.address?.streetName2},{" "}
        {order.address?.city}, {order.address?.state} –{" "}
        {order.address?.postalCode}
      </div>

      <div className="items-list">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name || 'Product'} className="item-image" />
            <div className="item-details">
              <h4>{item.name || 'Product Name'}</h4>
              <p>Brand: {item.brand || 'N/A'}</p>
              <p>Color: {item.color || 'N/A'}</p>
              <p>Size: {item.size || 'N/A'}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price ? item.price.toFixed(2) : 'N/A'}</p>
              <p className="delivery-info">{item.deliveryInfo || 'Standard Delivery'}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default OrderCard;
