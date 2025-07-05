import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import Profile from '../components/userDashboard/Profile';
import RecentOrders from '../components/userDashboard/RecentOrders';
import AddressList from '../components/userDashboard/AddressList';
import TrackOrder from '../components/userDashboard/TrackOrder';
import Faqs from '../components/userDashboard/Faqs';
import '../css/userDashboard/userdashboard.css';
import {
  FaUser, FaBox, FaAddressBook, FaTruck, FaQuestionCircle,
} from 'react-icons/fa';

function UserDashboard() {
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState("profile");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const firestoreUser = { uid: user.uid, ...userDoc.data() };
          setUserData(firestoreUser);
          useAuthStore.getState().setUser(firestoreUser); // <-- Put this here!
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <Profile user={userData} />;
      case "orders":
        return <RecentOrders userId={user?.uid} />;
      case "addresses":
        return <AddressList userId={user?.uid} />;
      case "track":
        return <TrackOrder userId={user?.uid} />;
      case "faqs":
        return <Faqs />;
      default:
        return null;
    }
  };

  return (
    <div className='main-user-dashboard-container'>
      <h3 className='dashboard-heading'>Dashboard</h3>
      <div className='user-dashboard-container'>
        <div className="sidebar">
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
    </div>
  );
}

export default UserDashboard;
