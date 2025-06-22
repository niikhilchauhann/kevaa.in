import "../css/home/home.css";

import mobilelogo from "../assets/mobilelogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DailyEssentials from "../components/dailyEssentials";
import PoojaProducts from "../components/PoojaProducts";
import PopularProducts from "../components/PopularProducts";
import HeavenlyHaste from "../components/HeavenlyHaste";
import CategoryGrid from "../components/CategoryGrid";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { useState } from "react";
import ServiceHighlights from "../components/ServiceHighlights";

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
        <ServiceHighlights/>
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
