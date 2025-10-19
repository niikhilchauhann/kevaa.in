import "./home.css";
import { NavLink, useNavigate } from "react-router-dom";
import DailyEssentials from "../components/Home/DailyEssentials";
import PoojaProducts from "../components/Home/PoojaProducts";
import PopularProducts from "../components/Home/PopularProducts";
import HeavenlyHaste from "../components/Home/HeavenlyHaste";
import CategoryGrid from "../components/Home/CategoryGrid";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Global/Footer";
import ServiceHighlights from "../components/Home/ServiceHighlights";
import useAuthStore from "../store/authStore";
import ScrollToTop from "../components/Global/ScrollTop";

export default function Home() {
  const navigate = useNavigate();


  // const handleLogin = () => {
  //   localStorage.setItem("auth", "true");
  //   navigate("/protected");
  // };

  const user = useAuthStore(state => state.user);

  return (
    <div className="home">
      <ScrollToTop />
      <main className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-card">
            <h1>The divine shop</h1>
            <p>
              Every prayer begins with us — Kevaa. Brings you authentic and soul-soothing pooja essentials.
            </p>
            <NavLink to="/products">
              <button className="cta-btn">Explore Collection</button>
            </NavLink>
            </div>
          </div>
        </div>
      </main>


      <div className="daily-essentials">
        <DailyEssentials />
        <PoojaProducts />
        <PopularProducts />
        <HeavenlyHaste />
        <CategoryGrid />
        <ServiceHighlights />
        <Testimonials />
      </div>
    </div>
  );
}