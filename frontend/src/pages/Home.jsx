import "../css/home/home.css";

import mobilelogo from "../assets/mobilelogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DailyEssentials from "../components/dailyEssentials";
import PoojaProducts from "../components/PoojaProducts";
import PopularProducts from "../components/popularProducts";
import HeavenlyHaste from "../components/HeavenlyHaste";
import CategoryGrid from "../components/CategoryGrid";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/protected");
  };


  return (
    <div className="home">

      <main className="hero-section">
        <div className="overlay">
          <div className="hero-card">
            <div className="hero-logo"><img src={mobilelogo} alt="Mobile Logo" /></div>
            <h2>The divine shop</h2>
            <p>
              Crafted with devotion, Kevaa brings you authentic, soul-soothing essentials for every sacred moment.
            </p>
            <button onClick={handleLogin}>Discover our collection</button>
          </div>
        </div>
      </main>
      <div className="daily-essentials">
        <DailyEssentials />
        <PoojaProducts />
        <PopularProducts />
        <HeavenlyHaste />
        <CategoryGrid />
        <div className="service-highlights">
          <div className="service-box">
            <i className="fas fa-box-open"></i>
            <div>
              <h4>Free Shipping</h4>
              <p>Free Shipping for orders over £130</p>
            </div>
          </div>
          <div className="service-box">
            <i className="fas fa-dollar-sign"></i>
            <div>
              <h4>Money Guarantee</h4>
              <p>Within 30 days for an exchange.</p>
            </div>
          </div>
          <div className="service-box">
            <i className="fas fa-headset"></i>
            <div>
              <h4>Online Support</h4>
              <p>24 hours a day, 7 days a week</p>
            </div>
          </div>
          <div className="service-box">
            <i className="fas fa-credit-card"></i>
            <div>
              <h4>Flexible Payment</h4>
              <p>Pay with Multiple Credit Cards</p>
            </div>
          </div>
        </div>

        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
