import React, { useState } from "react";
import "../../css/cart/addressArea.css";

const AddressArea = () => {
  const [selectedAddress, setSelectedAddress] = useState(1); // default selected id

  const addresses = [
    {
      id: 1,
      name: "Huzefa Bagwala",
      badge: "HOME",
      text: "1131 Dusty Townline, Jacksonville, TX 40322",
      contact: "(936) 361-0310",
    },
    {
      id: 2,
      name: "IndiaTech",
      badge: "OFFICE",
      text: "1219 Harvest Path, Jacksonville, TX 40326",
      contact: "(936) 361-0310",
    }
  ];

  return (
    <>
      <div className="address-wrapper">
        {addresses.map((address) => (
          <div
            className={`address-card ${selectedAddress === address.id ? "selected" : ""}`}
            key={address.id}
          >
            <div className="address-info">
              <input
                type="radio"
                name="address"
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
              />
              <div>
                <div className="name-badge">
                  <span className="name">{address.name}</span>
                  <span className="badge">{address.badge}</span>
                </div>
                <div className="address-text">{address.text}</div>
                <div className="contact">Contact - {address.contact}</div>
              </div>
            </div>
            <div className="actions">
              <button className="edit">Edit</button>
              <button className="remove">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="add-new">+ Add New Address</button>
      </div>
    </>
  );
};

export default AddressArea;
