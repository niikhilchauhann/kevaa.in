import React, { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore"; // adjust path as needed
import "../../css/userDashboard/trackOrder.css";
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
        <p>You have no orders placed yet.</p>
      )}

      {!loading && orders.length > 0 && (
        <div className="track-wrapper">
          {/* Left: Orders List */}
          <div className="orders-list" style={{ width: '35%', borderRight: '1px solid #ddd', paddingRight: 16 }}>
            <h3>Select an Order</h3>
            <ul className="order-list-ul" style={{ listStyle: 'none', padding: 0 }}>
              {orders.map(order => (
                <li
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  style={{
                    cursor: "pointer",
                    padding: "12px 10px",
                    marginBottom: 8,
                    borderRadius: 6,
                    backgroundColor: selectedOrderId === order.id ? "#9a155a33" : "#fff",
                    border: selectedOrderId === order.id ? "2px solid #9a155a" : "1px solid #ccc",
                    userSelect: 'none'
                  }}
                  title={`Total Amount: ₹${order.amount}`}
                >
                  <div style={{ fontWeight: "600", marginBottom: 5 }}>
                    Order #{order.id.slice(-6)}
                  </div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    Placed on:{" "}
                    {order.createdAt?.toDate
                      ? format(order.createdAt.toDate(), "dd MMM yyyy, h:mm a")
                      : new Date(order.createdAt).toLocaleString()}
                  </div>
                  <div style={{ marginTop: 5, fontSize: 14, color: "#9a155a", fontWeight: "600" }}>
                    Status: {selectedOrder?.items?.[0]?.status?.currentStep || "Ordered"}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Timeline & Order Summary */}
          <div className="timeline-and-summary" style={{ marginLeft: 20, flex: 1 }}>
            {selectedOrder ? (
              <>
                {/* Timeline */}
                <div className="timeline" style={{ marginBottom: 24 }}>
                  {timeline.map(({ label, time, isActive }, idx) => (
                    <div key={idx} className={`timeline-event ${isActive ? 'active' : ''}`} style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
                      <div
                        className="dot"
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          backgroundColor: isActive ? "#9a155a" : "#ccc",
                          marginTop: 5,
                        }}
                      />
                      <div className="event-details" style={{ color: isActive ? '#333' : '#bbb' }}>
                        <strong>{label}</strong>
                        <br />
                        <small>{time ? format(new Date(time), "dd MMM yyyy, h:mm a") : "Pending"}</small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="order-summary" style={{border: '1px solid #ccc', padding: 16, borderRadius: 10}}>
                  <div className="summary-header" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <span className="check-icon" style={{ fontSize: 24, color: "#22c55e", marginRight: 10 }}>
                      ✅
                    </span>
                    <div>
                      <strong>{selectedOrder?.items?.[0]?.status?.currentStep || "Ordered"}</strong>
                      <p style={{ margin: 0 }}>
                        ₹{selectedOrder.amount} •{" "}
                        {selectedOrder.createdAt?.toDate
                          ? format(selectedOrder.createdAt.toDate(), "dd MMM yyyy, h:mm a")
                          : new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="summary-images" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {selectedOrder.items.map((item, idx) => (
                      <img
                        key={item.id || idx}
                        src={item.image || "https://via.placeholder.com/60x80?text=Item"}
                        alt={item.name || "ordered item"}
                        style={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 8 }}
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
