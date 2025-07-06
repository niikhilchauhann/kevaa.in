import React, { useEffect, useState } from "react";
import "../../css/userDashboard/recentorders.css";
import useCartStore from "../../store/cartStore";


const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCartStore.getState().fetchOrders;

  useEffect(() => {
    const loadOrders = async()=>{
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);
  
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
          {/* make sure img is provided in orders store */}
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
