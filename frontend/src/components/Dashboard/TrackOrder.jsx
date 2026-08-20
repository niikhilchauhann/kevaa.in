import React, { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore";
import "./trackOrder.css";
import { format } from "date-fns";

const STATUS_STEPS = [
  { step: "Ordered", label: "Order Placed" },
  { step: "Confirmed", label: "Order Confirmed" },
  { step: "Shipped", label: "Order Shipped" },
  { step: "Delivered", label: "Order Delivered" },
];

const TrackOrder = () => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchOrders = useCartStore((state) => state.fetchOrders);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        let fetchedOrders = await fetchOrders();
        if (!Array.isArray(fetchedOrders)) fetchedOrders = [];

        // Sort orders by date (newest first)
        fetchedOrders.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB - dateA;
        });

        // Find the latest in-progress order
        const ongoing = fetchedOrders.find(
          (order) =>
            order.items?.some((item) => item.status?.currentStep !== "Delivered")
        );

        setCurrentOrder(ongoing || null);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [fetchOrders]);

  if (loading) return <p>Loading...</p>;

  if (!currentOrder) {
    return (
      <div className="no-progress">
        <img
          src="https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670860/noRecentOrder_vyatoj.webp"
          alt="No ongoing order"
        />
        <h3>No Order in Progress</h3>
        <p>All your orders have been delivered successfully.</p>
      </div>
    );
  }

  // Build timeline
  const timeline = STATUS_STEPS.map(({ step, label }) => {
    const log = currentOrder?.statusLogs?.find((l) => l.step === step);
    return {
      label,
      time: log?.time || null,
      isActive: !!log,
    };
  });

  return (
    <div className="track-container">
      <h2>Track Order</h2>

      <div className="track-content">
        {/* Timeline */}
        <div className="timeline">
          {timeline.map(({ label, time, isActive }, idx) => (
            <div key={idx} className={`timeline-step ${isActive ? "active" : ""}`}>
              {idx > 0 && <div className={`line ${timeline[idx - 1].isActive ? "filled" : ""}`} />}
              <div className={`dot ${isActive ? "filled" : ""}`} />
              <div className="step-details">
                <strong>{label}</strong>
                <small>
                  {time ? format(new Date(time), "EEE, d MMM '‘'yy • h:mm a") : "Pending"}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <div className="summary-header">
            <span className="check-icon">✅</span>
            <div>
              <h3>
                {currentOrder.items?.[0]?.status?.currentStep === "Delivered"
                  ? "Delivered"
                  : "Arriving Soon"}
              </h3>
              <p>
                ₹{currentOrder.amount} •{" "}
                {format(
                  currentOrder.createdAt?.toDate
                    ? currentOrder.createdAt.toDate()
                    : new Date(currentOrder.createdAt),
                  "dd MMM, h:mm a"
                )}
              </p>
            </div>
          </div>

          <div className="summary-images">
            {currentOrder.items?.map((item, idx) => (
              <img
                key={idx}
                src={item.image || "https://via.placeholder.com/60"}
                alt={item.name || "Item"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
