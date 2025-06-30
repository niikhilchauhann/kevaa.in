import React from "react";
import "../../css/userDashboard/recentorders.css";

const orders = [
  {
    id: 1,
    time: "11 minutes",
    amount: "₹203",
    dateTime: "08 Jun, 10:31 pm",
    images: [
      "https://m.media-amazon.com/images/I/91ZpjZkG+6L.jpg",
      "https://via.placeholder.com/60x80?text=Item"
    ]
  },
  {
    id: 2,
    time: "12 minutes",
    amount: "₹49",
    dateTime: "08 Jun, 12:03 pm",
    images: [
      "https://via.placeholder.com/60x80?text=1",
      "https://via.placeholder.com/60x80?text=2",
      "https://via.placeholder.com/60x80?text=3"
    ]
  }
];

const RecentOrders = () => {
  return (
    <div className="orders-container">
      <h2>Recent Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span className="check-icon">✅</span>
            <span>
              <strong>Arrived in {order.time}</strong>
              <br />
              <small>{order.amount} • {order.dateTime}</small>
            </span>
            <span className="arrow-icon">→</span>
          </div>
          <div className="order-items">
            {order.images.map((img, index) => (
              <div key={index} className="item-img">
                <img src={img} alt={`item-${index}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
