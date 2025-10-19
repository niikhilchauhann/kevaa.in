import React from "react";
import "./termsAndConditions.css"; // Import CSS file

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* Page Header */}
      <section className="terms-header">
        <div className="terms-header-content">
          <h1>Terms & Conditions</h1>
          <p>
            Welcome to Kevaa. By using our website, you agree to the following terms and conditions.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <main className="terms-main">
        <div className="terms-card">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our website, you agree to be bound by these Terms & Conditions and our Privacy Policy.
          </p>
        </div>

        <div className="terms-card">
          <h2>2. Use of Our Website</h2>
          <p>
            You agree to use our website only for lawful purposes and not to engage in activities that could damage or impair the website.
          </p>
        </div>

        <div className="terms-card">
          <h2>3. Product Information</h2>
          <p>
            We strive to ensure all product descriptions and prices are accurate. However, errors may occur, and we reserve the right to correct them.
          </p>
        </div>

        <div className="terms-card">
          <h2>4. Payment & Orders</h2>
          <p>
            All orders must be paid in full before shipment. We reserve the right to refuse or cancel any order at our discretion.
          </p>
        </div>

        <div className="terms-card">
          <h2>5. Shipping & Delivery</h2>
          <p>
            Delivery times are estimates and may vary. We are not responsible for delays outside our control.
          </p>
        </div>

        <div className="terms-card">
          <h2>6. Limitation of Liability</h2>
          <p>
            Kevaa shall not be held liable for any damages arising from the use or inability to use our products or website.
          </p>
        </div>

        <div className="terms-card">
          <h2>7. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of our site means you accept the updated terms.
          </p>
        </div>

        <div className="terms-card">
          <h2>8. Contact Us</h2>
          <p>
            For any questions about these Terms & Conditions, contact us at{" "}
            <a href="mailto:support@kevaa.in" className="terms-link">
              support@kevaa.in
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
