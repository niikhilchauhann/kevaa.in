import React, { useState } from "react";
import "../../css/cart/shipment.css";

const Shipment = () => {
  const [selected, setSelected] = useState("free");

  return (
    <div className="shipment-method-container">
      <h2 className="shipment-title">Shipment Method</h2>

      <div
        className={`shipment-option ${selected === "free" ? "selected" : ""}`}
        onClick={() => setSelected("free")}
      >
        <div className="shipment-left">
          <input
            type="radio"
            checked={selected === "free"}
            readOnly
          />
          <span className="shipment-price free">Free</span>
          <span className="shipment-type">Regular Shipment</span>
        </div>
        <span className="shipment-date">01 Feb, 2023</span>
      </div>

      <div
        className={`shipment-option ${selected === "priority" ? "selected" : ""}`}
        onClick={() => setSelected("priority")}
      >
        <div className="shipment-left">
          <input
            type="radio"
            checked={selected === "priority"}
            readOnly
          />
          <span className="shipment-price">$8.50</span>
          <span className="shipment-type">Priority Shipping</span>
        </div>
        <span className="shipment-date">28 Jan, 2023</span>
      </div>
    </div>
  );
};

export default Shipment;
