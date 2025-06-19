import "../css/home/home.css";
import logo from "../assets/logo1.png";
import mobilelogo from "../assets/mobilelogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DailyEssentials from "../components/dailyEssentials";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/protected");
  };

  return (
    <div className="home">
      <header className="top-bar">
        <p>
          Sign up and get 20% off your first order. <a href="#">Sign Up Now</a>
        </p>
      </header>
      <nav className="navbar">
        <div className="logo"><img src={logo} alt="" /></div>
        <ul>
          <li>Discovery <IoIosArrowDown /></li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
        <div className="icons">
          <span><IoSearch /></span>
          <span><BsCart2 /></span>
          <span><CgProfile /></span>
        </div>
      </nav>
      <main className="hero-section">
        <div className="overlay">
          <div className="hero-card">
            <div className="hero-logo"><img src={mobilelogo} alt="" /></div>
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
      </div>
    </div>
  );
}
