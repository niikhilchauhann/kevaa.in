import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "../css/home/footer.css";
import visa from "../assets/visa.png";
import mastercard from "../assets/mastercard.webp";
import paypal from "../assets/paypal.webp";
import applepay from "../assets/applepay.png";
import googlepay from "../assets/googlepay.png";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="newsletter">
        <h2>STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS</h2>
        <div className="newsletter-form">
          <div className="input-box">
            <MdOutlineEmail />
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button>Subscribe to Newsletter</button>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-column brand">
          <h3>Kevaa.in</h3>
          <p>We have products that suits your religion and which you're proud to belief.</p>
          <div className="social-icons">
            <FaTwitter />
            <FaFacebookF />
            <FaInstagram />
            <FaGithub/>
          </div>
        </div>

        <div className="footer-column">
          <h4>COMPANY</h4>
          <p>About</p>
          <p>Features</p>
          <p>Works</p>
          <p>Career</p>
        </div>

        <div className="footer-column">
          <h4>HELP</h4>
          <p>Customer Support</p>
          <p>Delivery Details</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-column">
          <h4>FAQ</h4>
          <p>Account</p>
          <p>Manage Deliveries</p>
          <p>Orders</p>
          <p>Payments</p>
        </div>

        <div className="footer-column">
          <h4>RESOURCES</h4>
          <p>Free eBooks</p>
          <p>Development Tutorial</p>
          <p>How to - Blog</p>
          <p>Youtube Playlist</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Kevaa.in © 2000–2023, All Rights Reserved</p>
        <div className="payments">
          <img src={visa} alt="Visa" />
          <img src={paypal} alt="Paypal" />
          <img src={mastercard} alt="MasterCard" />
          <img src={applepay} alt="Apple Pay" />
          <img src={googlepay} alt="Google Pay" />
        </div>
      </div>
    </footer>
  );
}
