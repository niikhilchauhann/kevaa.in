import React, { useEffect, useState } from "react";
import "./recentorders.css";
import useCartStore from "../../store/cartStore";
import noRecentOrder from "../../assets/noRecentOrder.webp";
import OrderCard from "./OrderCard";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      setSelectedOrder(sorted[0] || null);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) return <div className="orders-loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <section className="orders-container">
        <div className="orders-empty">
          <img
            src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670860/noRecentOrder_vyatoj.webp'
            alt="No recent orders"
            className="orders-empty-img"
          />
          <div className="orders-empty-description">
            <h2>No Recent Orders</h2>
            <p>
              You haven't placed any orders in the last month.
              Start exploring our collection and find something you love!
            </p>
          </div>
          <button
            className="orders-empty-action"
            onClick={() => window.location.href = "/products"}
          >
            Browse Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-container two-column-layout">
      <aside className="orders-list">
        <h3 className="orders-subtitle">Your Orders (Last 30 Days)</h3>
        <ul>
          {orders.map((order) => {
            const orderDate = order.createdAt?.seconds
              ? new Date(order.createdAt.seconds * 1000)
              : new Date(order.createdAt || order.date);
            return (
              <li
                key={order.id || order._id}
                className={`order-item-compact ${
                  selectedOrder?.id === order.id ? "active" : ""
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div><strong>ID:</strong> {order.id || order._id}</div>
                <div className="order-date">
                  {orderDate.toLocaleDateString()}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="orders-detail-view">
        {selectedOrder && <OrderCard order={selectedOrder} />}
      </main>
    </section>
  );
};

export default RecentOrders;
