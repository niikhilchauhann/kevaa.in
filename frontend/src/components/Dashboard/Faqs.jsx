import React, { useState } from "react";
import "./faqs.css";

const faqData = [
  {
    question: "Are your products authentic?",
    answer:
      "Absolutely, we design and curate our products in India only, and they are 100% authentic."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, as well as digital wallets like Google Pay, Apple Pay, and PayPal."
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location. Typically, orders are delivered within 5-7 business days."
  },
  {
    question: "Can I return or exchange items?",
    answer:
      "Yes, we have a hassle-free return and exchange policy. Please contact our customer support for assistance."
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to many countries. Shipping rates and times may vary."
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website."
  }
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>FAQs</h2>
      <div className="faq-box">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <strong>{item.question}</strong>
              <span className="toggle-icon">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
