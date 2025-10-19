import React from "react";
import "./cancellationsAndRefunds.css"

const CancellationsRefunds = () => {
  return (
    <div className="refunds-container">
      {/* Page Header */}
      <section className="refunds-header">
        <div className="refunds-header-content">
          <h1>Cancellation & Refund Policy</h1>
          <p>
            At Kevaa, we value your satisfaction and aim to make your shopping experience smooth and reliable.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="refunds-main">
        <div className="refunds-card">
          <h2>1. Order Cancellations</h2>
          <p>
            You may cancel your order within 24 hours of placing it. Please contact our customer support team as soon as possible for cancellation requests.
          </p>
        </div>

        <div className="refunds-card">
          <h2>2. Refund Eligibility</h2>
          <p>
            Refunds are applicable if:
          </p>
          <ul>
            <li>The product is damaged or defective upon arrival.</li>
            <li>You received an incorrect item.</li>
            <li>Your order was cancelled before shipment.</li>
          </ul>
        </div>

        <div className="refunds-card">
          <h2>3. Non-Refundable Items</h2>
          <p>
            Certain items such as opened incense packs, used pooja items, and custom-made products are non-refundable.
          </p>
        </div>

        <div className="refunds-card">
          <h2>4. Refund Process</h2>
          <p>
            Once your return is received and inspected, we will notify you regarding the approval or rejection of your refund. Approved refunds will be processed within 7–10 business days.
          </p>
        </div>

        <div className="refunds-card">
          <h2>5. Return Shipping</h2>
          <p>
            Customers are responsible for paying the return shipping costs unless the return is due to our error (e.g., wrong or damaged product).
          </p>
        </div>

        <div className="refunds-card">
          <h2>6. Contact Us</h2>
          <p>
            For any questions about our cancellation & refund policy, please email us at{" "}
            <a href="mailto:support@kevaa.in" className="refunds-link">
              support@kevaa.in
            </a>.
          </p>
        </div>
      </main>

    </div>
  );
};

export default CancellationsRefunds;
