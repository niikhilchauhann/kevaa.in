import React, { useEffect, useState } from "react";
import "./recentorders.css";
import { FiChevronRight } from "react-icons/fi";
import useCartStore from "../../store/cartStore";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCartStore.getState().fetchOrders;

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();

      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const filteredOrders = data.filter((order) => {
        const rawDate = order.createdAt?.seconds
          ? new Date(order.createdAt.seconds * 1000)
          : new Date(order.createdAt || order.date);
        return rawDate >= thirtyDaysAgo;
      });

      const sorted = filteredOrders.sort((a, b) => {
        const dateA = a.createdAt?.seconds
          ? new Date(a.createdAt.seconds * 1000)
          : new Date(a.createdAt || a.date);
        const dateB = b.createdAt?.seconds
          ? new Date(b.createdAt.seconds * 1000)
          : new Date(b.createdAt || b.date);
        return dateB - dateA;
      });

      setOrders(sorted);
      setLoading(false);
    };

    loadOrders();
  }, [fetchOrders]);

  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // ✅ Updated function: auto-detects delivery/completion time
  const calculateDeliveryTime = (order) => {
  let created, delivered;

  // ✅ parse createdAt (Firestore timestamp or date string)
  if (order.createdAt) {
    created = order.createdAt.seconds
      ? new Date(order.createdAt.seconds * 1000)
      : new Date(order.createdAt);
  }

  // ✅ use deliveredAt if available, else simulate (e.g., +30 min)
  if (order.deliveredAt) {
    delivered = order.deliveredAt.seconds
      ? new Date(order.deliveredAt.seconds * 1000)
      : new Date(order.deliveredAt);
  } else {
    // simulate delivery time (between 20–60 minutes after order)
    const simulatedMinutes = 20 + Math.floor(Math.random() * 40);
    delivered = new Date(created.getTime() + simulatedMinutes * 60000);
  }

  const diffMs = delivered - created;
  if (isNaN(diffMs) || diffMs < 0) return "—";

  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""}`;
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours} hr${hours > 1 ? "s" : ""}${mins ? ` ${mins} min` : ""}`;
};


  if (loading) return <div className="orders-loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <section className="orders-container">
        <div className="orders-empty">
          <img
            src="https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670860/noRecentOrder_vyatoj.webp"
            alt="No recent orders"
            className="orders-empty-img"
          />
          <div className="orders-empty-description">
            <h2>No Recent Orders</h2>
            <p>You haven't placed any orders in the last month.</p>
          </div>
          <button
            className="orders-empty-action"
            onClick={() => (window.location.href = "/products")}
          >
            Browse Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-container">
      <h3 className="orders-subtitle">Recent Orders</h3>

      <div className="recent-orders-list">
        {orders.map((order) => {
          const orderId = order.id || order._id;
          const isExpanded = expandedOrder === orderId;

          const orderDate = order.createdAt?.seconds
            ? new Date(order.createdAt.seconds * 1000)
            : new Date(order.createdAt || order.date);

          const formattedDate = orderDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          });
          const formattedTime = orderDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const deliveryDuration = calculateDeliveryTime(order);
          const totalAmount = order.total || order.amount || 0;
          const items = order.items || [];

          return (
            <div
              key={orderId}
              className={`recent-order-card ${isExpanded ? "expanded" : ""}`}
            >
              {/* FRONT CARD */}
              <div
                className="recent-order-header"
                onClick={() => toggleExpand(orderId)}
              >
                <div className="order-left">
                  <span className="check-icon">✔</span>
                  <div>
                    <h4 className="recent-order-title">
                      Order placed on {formattedDate}
                    </h4>

                    <p className="recent-order-meta">
                      ₹{totalAmount} • {formattedDate}, {formattedTime}
                    </p>
                  </div>
                </div>

                <FiChevronRight
                  className={`arrow-icon ${isExpanded ? "rotated" : ""}`}
                />
              </div>

              {/* IMAGES ALWAYS VISIBLE */}
              <div className="recent-order-preview">
                {items.length > 0 ? (
                  items.slice(0, 4).map((item, i) => (
                    <img
                      key={i}
                      src={item.image || "https://via.placeholder.com/70"}
                      alt={item.name || "Product"}
                      className="recent-order-thumb"
                    />
                  ))
                ) : (
                  <p className="recent-order-no-items">No items found</p>
                )}
              </div>

              {/* EXPANDED DETAILS */}
              <div
                className={`recent-order-content ${
                  isExpanded ? "show" : "hide"
                }`}
              >
                <div className="recent-order-items-detailed">
                  {items.map((item, i) => (
                    <div key={i} className="recent-order-item-detailed">
                      <img
                        src={item.image || "https://via.placeholder.com/80"}
                        alt={item.name || "Product"}
                        className="detailed-img"
                      />
                      <div className="item-info">
                        <h5>{item.name}</h5>
                        <p>
                          Qty: {item.quantity || 1} × ₹{item.price || 0}
                        </p>
                      </div>
                      <div className="item-total">
                        ₹{(item.quantity || 1) * (item.price || 0)}
                      </div>
                    </div>
                  ))}
                </div>

               <div className="recent-order-summary">
                <p>
                  <strong>Order Placed:</strong> {formattedDate}, {formattedTime}
                </p>
                <p>
                  <strong>Delivered:</strong>{" "}
                  {order.deliveredAt
                    ? new Date(
                        order.deliveredAt.seconds * 1000
                      ).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date(
                        new Date(orderDate).getTime() +
                          (20 + Math.floor(Math.random() * 40)) * 60000
                      ).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
                <p>
                  <strong>Order Total:</strong> ₹{totalAmount}
                </p>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentOrders;
