import React, { useState } from 'react';
import Profile from '../components/userDashboard/Profile';
import RecentOrders from '../components/userDashboard/RecentOrders';
import AddressList from '../components/userDashboard/AddressList';
import TrackOrder from '../components/userDashboard/TrackOrder';
import Faqs from '../components/userDashboard/Faqs';
import '../css/userDashboard/userdashboard.css';
import {
  FaUser,
  FaBox,
  FaAddressBook,
  FaTruck,
  FaQuestionCircle,
} from 'react-icons/fa';

function UserDashboard() {
  const [activeComponent, setActiveComponent] = useState("profile");

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile />;
      case "orders":
        return <RecentOrders />;
      case "addresses":
        return <AddressList />;
      case "track":
        return <TrackOrder />;
      case "faqs":
        return <Faqs />;
      default:
        return null;
    }
  };

  return (
    <div className='user-dashboard-container'>
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li className={activeComponent === "profile" ? "active" : ""} onClick={() => setActiveComponent("profile")}>
            <FaUser /> <span>Profile</span>
          </li>
          <li className={activeComponent === "orders" ? "active" : ""} onClick={() => setActiveComponent("orders")}>
            <FaBox /> <span>Recent Orders</span>
          </li>
          <li className={activeComponent === "addresses" ? "active" : ""} onClick={() => setActiveComponent("addresses")}>
            <FaAddressBook /> <span>Addresses</span>
          </li>
          <li className={activeComponent === "track" ? "active" : ""} onClick={() => setActiveComponent("track")}>
            <FaTruck /> <span>Track Order</span>
          </li>
          <li className={activeComponent === "faqs" ? "active" : ""} onClick={() => setActiveComponent("faqs")}>
            <FaQuestionCircle /> <span>FAQs</span>
          </li>
        </ul>
      </div>

      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default UserDashboard;
