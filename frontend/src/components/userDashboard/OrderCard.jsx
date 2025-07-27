import React from "react";
import "../../css/userDashboard/orderCards.css"; // Optional: separate styles

const OrderCard = ({ order }) => {
  return (
    <article className="order-card">
      <header className="order-header">
        <div>
          <strong>Order ID: {order.id}</strong>
          <br />
          <small>
            ₹{order.amount.toFixed(2)} •{" "}
            {new Date(order.createdAt.seconds * 1000).toLocaleString()}
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
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>Brand: {item.brand}</p>
              <p>Color: {item.color}</p>
              <p>Size: {item.size}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              <p className="delivery-info">{item.deliveryInfo}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default OrderCard;
