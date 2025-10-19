import React from "react";
import "./privacyPolicy.css"; // Import CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      {/* Page Header */}
      <section className="privacy-header">
        <div className="privacy-header-content">
          <h1>Privacy Policy</h1>
          <p>
            Your privacy is important to us at Kevaa. This policy explains how
            we handle your data.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <main className="privacy-main">
        <div className="privacy-card">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal details such as your name, email address,
            contact number, and delivery address when you use our services or
            make a purchase.
          </p>
        </div>

        <div className="privacy-card">
          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used for order processing, delivery,
            communication, and personalized offers. We do not sell or share
            your data with third parties without consent.
          </p>
        </div>

        <div className="privacy-card">
          <h2>3. Data Security</h2>
          <p>
            We implement advanced security measures to protect your personal
            data from unauthorized access or misuse.
          </p>
        </div>

        <div className="privacy-card">
          <h2>4. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience, analyze site
            traffic, and personalize content. You can choose to disable cookies
            in your browser settings.
          </p>
        </div>

        <div className="privacy-card">
          <h2>5. Contact Us</h2>
          <p>
            If you have questions about our privacy practices, please contact us
            at{" "}
            <a href="mailto:support@kevaa.in" className="privacy-link">
              support@kevaa.in
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
