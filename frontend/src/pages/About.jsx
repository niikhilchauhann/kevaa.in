// Updated About component with improved styling and responsiveness
import React from "react";
import "./about.css";
import ScrollToTop from "../components/global/ScrollTop";
import useAuthStore from "../store/authStore";

function About() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="about-container" style={{ marginTop: `${user ? "140px" : "140px"}` }}>
      <ScrollToTop />
      <h1 className="gradient-text">About Kevaa</h1>
      <p>
        Welcome to <strong>Kevaa</strong> – where tradition blends with authenticity. We bring you carefully curated
        pooja essentials that embody purity, devotion, and spiritual significance.
      </p>
      <p>
        Founded in 2025, Kevaa was built with a mission to make spiritual products accessible, genuine, and trustworthy.
        From lab-certified gemstones to sacred pooja items, every product reflects our commitment to quality and devotion.
      </p>

      <ul className="about-list">
        <li>✨ <strong>1000+ divine products</strong> curated from holy cities like Mathura, Jaipur, and Moradabad</li>
        <li>🔍 <strong>Lab-verified authenticity</strong> ensuring trust and purity</li>
        <li>📦 <strong>Self-delivered with care</strong> in the initial phase for local customers</li>
        <li>🤝 <strong>Dedicated support</strong> for every devotee and customer</li>
      </ul>

      <section className="why-us">
        <h2>Why Choose Kevaa?</h2>
        <div className="why-grid">
          <div className="why-card">
            <img
              src="https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670862/poshakKrishna_y61e5c.webp"
              alt="Premium Quality"
            />
            <h3>Authentic Quality</h3>
            <p>Our products are sourced from trusted artisans and verified to ensure spiritual sanctity.</p>
          </div>
          <div className="why-card">
            <img
              src="https://img.freepik.com/free-photo/online-shopping-concept_23-2148590846.jpg"
              alt="Affordable Pricing"
            />
            <h3>Affordable & Fair</h3>
            <p>Premium spiritual items at prices that respect devotion and affordability.</p>
          </div>
          <div className="why-card">
            <img
              src="https://imgs.search.brave.com/Lr8EDkciZwN3PiJqs8ZJO4CXbckIaj3ZvT5lEyuBWRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9zaHV0dGVy/c3RvY2svcGhvdG9z/LzE4ODc0NDYwOTgv/ZGlzcGxheV8xNTAw/L3N0b2NrLXZlY3Rv/ci1zaGlwcGluZy1m/YXN0LWRlbGl2ZXJ5/LXRydWNrLXdpdGgt/Y2xvY2stb25saW5l/LWRlbGl2ZXJ5LXNl/cnZpY2UtZXhwcmVz/cy1kZWxpdmVyeS1x/dWljay1tb3ZlLTE4/ODc0NDYwOTguanBn"
              alt="Fast Delivery"
            />
            <h3>Fast & Safe Delivery</h3>
            <p>We ensure timely delivery with secure and respectful packaging of sacred items.</p>
          </div>
        </div>
      </section>

      <p>
        At Kevaa, we are not just a store — we are a community of devotees. Every item you choose from us carries a
        blessing, a story, and a tradition passed through generations.
      </p>
      <p>
        <em>Thank you for being a part of the Kevaa family. Together, let's preserve and celebrate spirituality.</em>
      </p>
    </div>
  );
}

export default About;
