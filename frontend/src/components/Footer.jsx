import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
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
                <h2>WANT TO COLLAB WITH US<br />JOIN KEVAA NOW..!!</h2>
                <div className="newsletter-form">
                    <button>Join Now</button>
                </div>
            </div>

            <div className="footer-content">
                <div className="footer-company">
                    <div className="footer-column brand">
                        <h3>Kevaa.in</h3>
                        <p>We have products that suit your religion and which you're proud to believe.</p>
                        <div className="social-icons">
                            <FaTwitter />
                            <FaFacebookF />
                            <FaInstagram />
                        </div>
                    </div>
                </div>
                <div className="footer-navigations">
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
                        <p>YouTube Playlist</p>
                    </div>
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
