// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/Layout"; // Import the Layout component
import Products from "./pages/Products";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgotPage from "./pages/Auth/ForgotPage";
import ResetPassword from "./pages/Auth/forgotPassword/ResetPassword";
import SetPassword from "./pages/Auth/SetPassword";
import RecoveryEmail from "./pages/Auth/forgotPassword/RecoveryEmail";
import UserDashboard from "./pages/UserDashboard";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import useCartStore from './store/cartStore';
import PageNotFound from "./pages/PageNotFound";
import useAuthStore from "./store/authStore";
function App() {
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
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/recoveryemail" element={<RecoveryEmail />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<PageNotFound />} />
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/product/:id" element={<ProductDetails />} />
          <Route path="protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
