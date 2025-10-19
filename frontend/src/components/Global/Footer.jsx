import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css";
import { NavLink } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="footer">
            {/* <div className="newsletter">
                 <h2>Let’s Grow Together 🤝</h2>
                <p>Partner with Kevaa and bring authentic spiritual products to more people.</p>
                <div className="newsletter-form">
                    <NavLink to='/contact-us' style={{color: '#d9045a'}}><button>Join Now</button></NavLink>
                </div>
            </div> */}
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
                        <p><NavLink to='/about' style={{color: 'grey'}}>About </NavLink></p>
                        <p><NavLink to='/products' style={{color: 'grey'}}>Explore </NavLink></p>
                        <p><NavLink to='/products' style={{color: 'grey'}}>All Products </NavLink></p>
                         <p><NavLink to='/cart' style={{color: 'grey'}}>Cart </NavLink></p>
                    </div>

                    <div className="footer-column">
                        <h4>HELP</h4>
                        <p><NavLink to='/contact-us' style={{color: 'grey'}}>Customer Support </NavLink></p>
                        <p><NavLink to='/cancellations&refunds' style={{color: 'grey'}}>Cancellations & Refunds </NavLink></p>
                        <p><NavLink to='/termsandconditions' style={{color: 'grey'}}>Terms and Conditions</NavLink></p>
                        <p><NavLink to='/privacypolicy' style={{color: 'grey'}}>Policy Policy</NavLink></p>
                    </div>

                    <div className="footer-column">
                        <h4>FAQ</h4>
                        <p><NavLink to='/userDashboard' style={{color: 'grey'}}>Account </NavLink></p>
                        <p><NavLink to='/userDashboard' style={{color: 'grey'}}>Manage Deliveries </NavLink></p>
                        <p><NavLink to='/userDashboard' style={{color: 'grey'}}>Orders</NavLink></p>
                        <p><NavLink to='/userDashboard' style={{color: 'grey'}}>Payments</NavLink></p>
                    </div>

                    <div className="footer-column">
                        <h4>RESOURCES</h4>
                        
                        <p><NavLink to='/blogs' style={{color: 'grey'}}>Blogs </NavLink></p>
                        <p><NavLink to='/blogs' style={{color: 'grey'}}>Free e-books </NavLink></p>
                        <p><NavLink to='/blogs' style={{color: 'grey'}}>How to - Blog</NavLink></p>
                        <p><NavLink to='https://youtube.com/@radhakrishnabhajan12?si=hPY9DPMKGKEGQCv4' style={{color: 'grey'}}>Youtube Playlist</NavLink></p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Kevaa.in © 2025, All Rights Reserved</p>
                <div className="payments">
                    <img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670866/visa_e7bs4o.png' alt="Visa" />
                    <img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670860/paypal_uxgylf.webp' alt="Paypal" />
                    <img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670858/mastercard_syeo9y.webp' alt="MasterCard" />
                    <img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670854/applepay_k45sin.png' alt="Apple Pay" />
                    <img src='https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/googlepay_fqketn.png' alt="Google Pay" />
                </div>
            </div>
        </footer>
    );
}
