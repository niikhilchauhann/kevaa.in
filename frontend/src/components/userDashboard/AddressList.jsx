import React from "react";
import "../../css/userDashboard/addressList.css";

const addresses = [
  {
    type: "Home",
    address: "Nikhil Chauhan, 1063 Jawahar Colony, Block G, Jawahar Colony, Faridabad"
  },
  {
    type: "Hospital",
    address: "ORG Hospital 2nd floor room no. 1214, Sector 15A, Faridabad, Deliver fast don’t get it cold."
  },
  {
    type: "home",
    address: "739, Parvatiya Colony, Sector 52, Near Kumau Mandir, Sector 52, Faridabad"
  },
  {
    type: "Home",
    address: "Nikhil Chauhan, RK Bajaj Main Gate, Radha Valley, Mathura"
  }
];

const AddressList = () => {
  return (
    <div className="address-wrapper">
      <h2>Your Addresses</h2>
      <div className="address-box">
        <div className="address-header">
          <h3>My addresses</h3>
          <button className="add-address">➕ Add new address</button>
        </div>
        <div className="address-list">
          {addresses.map((item, index) => (
            <div key={index} className="address-item">
              <div className="icon">🏠</div>
              <div className="details">
                <strong>{item.type}</strong>
                <p>{item.address}</p>
              </div>
              <div className="options">⋮</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressList;
