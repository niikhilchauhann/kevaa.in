import React, { useEffect, useState } from "react";
import "../../css/userDashboard/recentorders.css";
import useCartStore from "../../store/cartStore";
import OrderCard from "./OrderCard"; // Importing the new card component

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = useCartStore.getState().fetchOrders;

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      console.log("Fetched Orders:", data);
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) return <div className="orders-loading">Loading orders...</div>;

  return (
    <section className="orders-container">
      <h2 className="orders-title">All orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No recent orders found.</p>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </section>
  );
};

export default RecentOrders;
