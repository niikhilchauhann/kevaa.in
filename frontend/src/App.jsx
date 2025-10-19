import {BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Global/Layout";
import Products from "./pages/Explore";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import ProductDetails from "./components/Explore/ProductDetails";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ForgotPage from "./components/Auth/ForgotPage";
import ResetPassword from "./components/Auth/ResetPassword";
import SetPassword from "./components/Auth/SetPassword";
import RecoveryEmail from "./components/Auth/RecoveryEmail";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import useCartStore from "./store/cartStore";
import useAuthStore from "./store/authStore";
import Loader from "./components/Global/Loader";
import PageNotFound from "./components/Policies/PageNotFound";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import TermsAndConditions from "./components/Policies/TermsAndConditions";
import CancellationsRefunds from "./components/Policies/CancellationsAndRefunds";


import Blog from "./pages/Blogs";
import BlogDetails from "./components/Blog/BlogDetails";



function App() {
   const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); // simulate loading
    return () => clearTimeout(timeout);
  }, [location]);

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        useCartStore.getState().loadCart();
      } else {
        // Reset cart when user logs out
        if (typeof useCartStore.getState().clearCart === 'function') {
          useCartStore.getState().clearCart();
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>

    {loading && <Loader />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/recoveryemail" element={<RecoveryEmail />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<Home />} />  
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetails/>} />
          <Route path="/cancellations&refunds" element={<CancellationsRefunds />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
    
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/products/product/:id" element={<ProductDetails />} />
          <Route path="protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
