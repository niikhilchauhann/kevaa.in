import React, { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore"; // adjust path as needed
import "./trackOrder.css";
import noRecentOrder from '../../assets/noRecentOrder.webp';
import { format } from "date-fns";

const STATUS_STEPS = [
  { step: "Ordered", label: "Order Placed" },
  { step: "Confirmed", label: "Order Confirmed" },
  { step: "Shipped", label: "Order Shipped" },
  { step: "Delivered", label: "Order Delivered" },
  { step: "Received", label: "Order Received" },
];

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchOrders = useCartStore((state) => state.fetchOrders);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        let fetchedOrders = await fetchOrders();
        console.log("Fetched Orders:", fetchedOrders); // ✅ check what is fetched

        if (!Array.isArray(fetchedOrders)) {
          console.error("fetchOrders did not return an array!");
          fetchedOrders = [];
        }

        // Defensive: sort clone (slice) by createdAt descending (newest first)
        fetchedOrders = fetchedOrders.slice().sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB - dateA; // descending order
        });

        setOrders(fetchedOrders);

        if (fetchedOrders.length > 0) setSelectedOrderId(fetchedOrders[0].id);
      } catch (err) {
        console.error("Error occurred while fetching orders:", err);
        setOrders([]);
      }
      setLoading(false);
    };
    loadOrders();
  }, [fetchOrders]);


  // Find selected order
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  // Build timeline based on order.statusLogs or fallback
  const timeline = STATUS_STEPS.map(({ step, label }) => {
    const log = selectedOrder?.statusLogs?.find((l) => l.step === step);
    return {
      step,
      label,
      time: log?.time || null,
      isActive: !!log,
    };
  });

  return (
    <div className="track-order-container">
      <h2>Your Orders</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <div className="empty-orders-state">
          <img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670860/noRecentOrder_vyatoj.webp' alt="No orders found" className="empty-orders-image" />
          <div className="empty-orders-info">
            <h2>Nothing Ordered Yet</h2>
            <p>It looks like you haven’t made any purchases. Browse our catalog to get started!</p>
          </div>
          <button className="empty-orders-button" onClick={() => window.location.href = '/products'}>
            Shop Now
          </button>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="track-wrapper">
          {/* Left: Orders List */}
          <div className="orders-list">
            <h3>Select an Order</h3>
            <ul className="order-list-ul">
              {orders.map(order => (
                <li
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`order-list-item ${selectedOrderId === order.id ? 'active' : ''}`}
                  title={`Total Amount: ₹${order.amount}`}
                >
                  <div className="order-id">Order #{order.id.slice(-6)}</div>
                  <div className="order-date">
                    Placed on:{" "}
                    {order.createdAt?.toDate
                      ? format(order.createdAt.toDate(), "dd MMM yyyy, h:mm a")
                      : new Date(order.createdAt).toLocaleString()}
                  </div>
                  <div className="order-status">
                    Status: {selectedOrder?.items?.[0]?.status?.currentStep || "Shipped"}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Timeline & Order Summary */}
          <div className="timeline-and-summary">
            {selectedOrder ? (
              <>
                <div className="timeline">
                  {timeline.map(({ label, time, isActive }, idx) => (
                    <div key={idx} className={`timeline-event ${isActive ? 'active' : ''}`}>
                      {/* Connecting line (skip first one) */}
                      {idx > 0 && <div className={`line ${timeline[idx-1].isActive ? 'line-active' : 'line-pending'}`} />}

                      <div className={`dot ${isActive ? 'dot-active' : 'dot-pending'}`} />
                      <div className="event-details">
                        <strong>{label}</strong>
                        <small>{time ? format(new Date(time), "dd MMM yyyy, h:mm a") : "Pending"}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-header">
                    <span className="check-icon">✅</span>
                    <div>
                      <strong>{selectedOrder?.items?.[0]?.status?.currentStep || "Ordered"}</strong>
                      <p>
                        ₹{selectedOrder.amount} •{" "}
                        {selectedOrder.createdAt?.toDate
                          ? format(selectedOrder.createdAt.toDate(), "dd MMM yyyy, h:mm a")
                          : new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="summary-images">
                    {selectedOrder.items.map((item, idx) => (
                      <img
                        key={item.id || idx}
                        src={item.image || "https://via.placeholder.com/60x80?text=Item"}
                        alt={item.name || "ordered item"}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p>Select an order to see its status timeline</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
