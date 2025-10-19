import React, { useState } from "react";
import "./contactUs.css";
import ScrollToTop from "../components/global/ScrollTop";
import useAuthStore from "../store/authStore";

function ContactUs() {
  const user = useAuthStore(state => state.user);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("https://kevaa-ecommerce-backend-url.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };


  return (
    <div className="contactus-container" style={{ marginTop: `${user ? '140px' : ' 140px'} ` }}>
      <ScrollToTop/>
      <h1>Contact Us</h1>
      <p>Have a question, feedback, or need support? Fill out the form below or email us at <a href="mailto:support@kevaa.in">support@kevaa.in</a>.</p>
      {submitted ? (
        <div className="contactus-success">
          <h3>Thank you!</h3>
          <p>Your message has been sent. We’ll get back to you soon.</p>
        </div>
      ) : (
        <form className="contactus-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}

export default ContactUs;
