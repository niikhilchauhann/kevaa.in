import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase"; // Make sure you have this import
import "../../css/cart/addressAreas.css";

const AddressArea = ({ userId, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);


  // const addresses = [
  //   {
  //     id: 1,
  //     name: "Huzefa Bagwala",
  //     badge: "HOME",
  //     text: "1131 Dusty Townline, Jacksonville, TX 40322",
  //     contact: "(936) 361-0310",
  //   },
  //   {
  //     id: 2,
  //     name: "IndiaTech",
  //     badge: "OFFICE",
  //     text: "1219 Harvest Path, Jacksonville, TX 40326",
  //     contact: "(936) 361-0310",
  //   }
  // ];
    useEffect(() => {
    if (selectedAddress && onSelectAddress) {
      const addrObj = addresses.find(a => a.id === selectedAddress);
      onSelectAddress(addrObj);
    }
  }, [selectedAddress, addresses, onSelectAddress]);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const db = getFirestore();
        const q = query(collection(db, "addresses"), where("userId", "==", userId));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAddresses(data);
        if (data.length > 0) setSelectedAddress(data[0].id); // Default select first address
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
      setLoading(false);
    };

    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  if (loading) return <div>Loading addresses...</div>;
  if (addresses.length === 0) return <div>No saved addresses found.</div>;
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
                  <span className="name">{address.streetName || "No Name"}</span>
                  <span className="badge">{address.type || "HOME"}</span>
                </div>
                <div className="address-text">
                  {address.houseNo}, {address.streetName}
                  {address.streetName2 ? `, ${address.streetName2}` : ""}
                  , {address.city}, {address.state} - {address.postalCode}
                </div>
                {address.contact && <div className="contact">Contact - {address.contact}</div>}
              </div>
            </div>
            {/* <div className="actions">
              <button className="edit">Edit</button>
              <button className="remove">Remove</button>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressArea;
