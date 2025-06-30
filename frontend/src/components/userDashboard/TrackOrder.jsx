import React from "react";
import "../../css/userDashboard/trackOrder.css";

const trackingEvents = [
  {
    title: "Order Placed",
    date: "Sat, 8 Apr '24",
    logs: [
      { text: "Your order was placed on kevaa", time: "Sat, 8 Apr '24 - 17:17" },
      { text: "kevaa Arranged A Callback Request", time: "Sat, 8 Apr '24 - 17:42" }
    ]
  },
  {
    title: "Order Confirmed",
    date: "Sat, 8 Apr '24",
    logs: [
      { text: "Your order was confirmed by kevaa", time: "Sat, 8 Apr '24 - 17:17" }
    ]
  },
  {
    title: "Order Shipped",
    date: "Sat, 8 Apr '24",
    logs: [
      { text: "Your order was shipped with ShipRocket", time: "Sat, 8 Apr '24 - 17:50" },
      { text: "Your order arrived at kevaa Noida facility", time: "Sat, 8 Apr '24 - 16:50" },
      { text: "Your order arrived at final stoppage before delivery - kevaa, Mathura", time: "Sat, 8 Apr '24 - 20:50" }
    ]
  },
  {
    title: "Order Delivered",
    date: "Sat, 10 Apr '24",
    logs: [
      { text: "You received your order, by ShipRocket", time: "Sat, 10 Apr '24 - 17:51" }
    ]
  }
];

const orderedItems = {
  status: "Arrived in 11 minutes",
  amount: "₹203",
  dateTime: "08 Jun, 10:31 pm",
  items: [
    "https://m.media-amazon.com/images/I/91ZpjZkG+6L.jpg",
    "https://via.placeholder.com/60x80?text=Item"
  ]
};

const TrackOrder = () => {
  return (
    <div className="track-order-container">
      <h2>Track Order</h2>
      <div className="track-wrapper">
        {/* Left: Timeline */}
        <div className="timeline">
          {trackingEvents.map((event, index) => (
            <div key={index} className="timeline-event">
              <div className="dot" />
              <div className="event-details">
                <strong>{event.title}</strong> <span>{event.date}</span>
                {event.logs.map((log, idx) => (
                  <div key={idx} className="log-entry">
                    <p>{log.text}</p>
                    <small>{log.time}</small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary">
          <div className="summary-header">
            <span className="check-icon">✅</span>
            <div>
              <strong>{orderedItems.status}</strong>
              <p>{orderedItems.amount} • {orderedItems.dateTime}</p>
            </div>
          </div>
          <div className="summary-images">
            {orderedItems.items.map((src, idx) => (
              <img key={idx} src={src} alt={`item-${idx}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
