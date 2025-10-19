import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import AddressList from '../Dashboard/AddressList';
import "./addressAreas.css";
import { IoMdRefresh } from "react-icons/io";

const AddressArea = ({ userId, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    if (!userId) {
      setAddresses([]);
      setSelectedAddress(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const db = getFirestore();

    try {
      // Fetch user document to get addressIds
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        setAddresses([]);
        setSelectedAddress(null);
        setLoading(false);
        return;
      }
      const userData = userDoc.data();
      const addressIds = userData.addressIds || [];

      // Fetch addresses by IDs
      const addressesData = [];
      for (const addrId of addressIds) {
        const addrDoc = await getDoc(doc(db, 'addresses', addrId));
        if (addrDoc.exists()) {
          addressesData.push({ id: addrDoc.id, ...addrDoc.data() });
        }
      }
      setAddresses(addressesData);
      if (addressesData.length > 0) {
        setSelectedAddress(String(addressesData[0].id));
      } else {
        setSelectedAddress(null);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setAddresses([]);
      setSelectedAddress(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  useEffect(() => {
    if (selectedAddress && onSelectAddress) {
      onSelectAddress(String(selectedAddress));
    }
  }, [selectedAddress, onSelectAddress]);

  if (loading) return <div>Loading addresses...</div>;

  if (addresses.length === 0) {
    return (
      <div>
        <p>No saved addresses found. Please add atleast one below:</p>
        <AddressList userId={userId} />
        {/* When address added, call fetchAddresses again */}
        <button onClick={fetchAddresses} style={{ marginTop: "1rem", backgroundColor: '#700d37', color: 'white', display: 'flex', gap:'12px' }}><IoMdRefresh/>Refresh</button>
      </div>
    );
  }

  return (
    <div className="address-wrapper">
      {addresses.map((address) => (
        <div
          className={`address-card ${String(selectedAddress) === String(address.id) ? "selected" : ""}`}
          key={address.id}
        >
          <div className="address-info">
            <input
              type="radio"
              name="address"
              checked={String(selectedAddress) === String(address.id)}
              onChange={() => setSelectedAddress(String(address.id))}
            />
            <div>
              <div className="name-badge">
                <span className="name">{address.type || "Address"}</span>
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
        </div>
      ))}
    </div>
  );
};

export default AddressArea;
