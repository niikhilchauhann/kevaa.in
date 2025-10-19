import React from "react";
import "./about.css"; 
import ScrollToTop from "../components/global/ScrollTop";
import useAuthStore from "../store/authStore";

function About() {
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className="about-container"
      style={{ marginTop: `${user ? "140px" : "140px"}` }}
    >
      <ScrollToTop />
      <h1>About Kevaa</h1>
      <p>
        Welcome to <strong>Kevaa</strong> – where style meets authenticity.  
        We are your trusted destination for discovering thoughtfully curated fashion that blends 
        quality, comfort, and affordability.  
      </p>
      <p>
        Founded in 2025, Kevaa was built on the belief that fashion should be accessible, inspiring, 
        and sustainable. From the latest trends to timeless classics, we are dedicated to offering 
        collections that make you look good and feel confident.  
      </p>

      <ul>
        <li>🌟 Over <strong>1000+ curated products</strong> across styles</li>
        <li>🌱 <strong>Ethically sourced</strong> with a focus on sustainability</li>
        <li>🚚 <strong>Fast & reliable shipping</strong> across India</li>
        <li>💬 <strong>Dedicated customer support</strong>, always ready to help</li>
      </ul>

      {/* Why Us Section */}
      <section className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-card">
            <img
              src="https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/poshakKrishna_y61e5c.webp"
              alt="Quality Products"
            />
            <h3>Unmatched Quality</h3> 
            <p>
              Every product is carefully sourced and tested to meet the highest standards.
            </p>
          </div>
          <div className="why-card">
            <img
              src="https://img.freepik.com/free-photo/online-shopping-concept_23-2148590846.jpg"
              alt="Affordable Pricing"
            />
            <h3>Affordable Pricing</h3>
            <p>
              Trendy, stylish, and budget-friendly – we make fashion accessible for everyone.
            </p>
          </div>
          <div className="why-card">
            <img
              src="https://imgs.search.brave.com/Lr8EDkciZwN3PiJqs8ZJO4CXbckIaj3ZvT5lEyuBWRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9zaHV0dGVy/c3RvY2svcGhvdG9z/LzE4ODc0NDYwOTgv/ZGlzcGxheV8xNTAw/L3N0b2NrLXZlY3Rv/ci1zaGlwcGluZy1m/YXN0LWRlbGl2ZXJ5/LXRydWNrLXdpdGgt/Y2xvY2stb25saW5l/LWRlbGl2ZXJ5LXNl/cnZpY2UtZXhwcmVz/cy1kZWxpdmVyeS1x/dWljay1tb3ZlLTE4/ODc0NDYwOTguanBn"
              alt="Fast Delivery"
            />
            <h3>Fast Delivery</h3>
            <p>
              Quick, reliable, and hassle-free delivery right at your doorstep.
            </p>
          </div>
        </div>
      </section>

      <p>
        At Kevaa, we are more than just a brand—we are a community.  
        Every piece you choose reflects not only your personal style but also our shared 
        commitment to mindful fashion.  
      </p>
      <p>
        <em>
          Thank you for being part of the Kevaa family. Together, let’s make fashion more meaningful.
        </em>
      </p>
    </div>
  );
}

export default About;
