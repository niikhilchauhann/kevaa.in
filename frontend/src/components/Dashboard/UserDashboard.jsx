import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import useAuthStore from '../../store/authStore';
import Profile from './Profile';
import RecentOrders from './RecentOrders';
import AddressList from './AddressList';
import TrackOrder from './TrackOrder';
import Faqs from './Faqs';
import kevaaLogo from '../../assets/keva2.png';
import './userdashboard.css';
import {
  FaUser, FaBox, FaAddressBook, FaTruck, FaQuestionCircle,
  FaHireAHelper,
} from 'react-icons/fa';
import ScrollToTop from '../Global/ScrollTop';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HelpCenter from './HelpCenter';

function UserDashboard() {
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultTab = queryParams.get('tab') || 'profile'; // fallback to profile

  const [activeComponent, setActiveComponent] = useState(defaultTab);
  // const [activeComponent, setActiveComponent] = useState("profile");

  useEffect(() => {
    const queryTab = new URLSearchParams(location.search).get('tab');
    if (queryTab && queryTab !== activeComponent) {
      setActiveComponent(queryTab);
    }
  }, [location.search]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const firestoreUser = { uid: user.uid, ...userDoc.data() };
          setUserData(firestoreUser);
          useAuthStore.getState().setUser(firestoreUser);
        } else {
          // Create user document if it doesn't exist
          const newUserData = {
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            email: user.email || "",
            addressIds: [],
            createdAt: new Date(),
          };
          await setDoc(userRef, newUserData);
          const firestoreUser = { uid: user.uid, ...newUserData };
          setUserData(firestoreUser);
          useAuthStore.getState().setUser(firestoreUser);
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
      case "help":
        return <HelpCenter />;
      default:
        return null;
    }
  };

  return (
    <div className='main-user-dashboard-container'>
      <ScrollToTop />
      <NavLink to='/'><h3 className='dashboard-heading'><img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670855/keva2_n60etz.png' alt="" /><span>Dashboard</span></h3></NavLink>
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
            <li className={activeComponent === "help" ? "active" : ""} onClick={() => setActiveComponent("help")}>
              <FaHireAHelper /> <span>Help Center</span>
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
