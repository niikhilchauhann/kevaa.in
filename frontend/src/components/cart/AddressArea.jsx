import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { auth } from "../../firebase"; // Make sure you have this import
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

  // const db = getFirestore();
  // const userRef = doc(db, "users", userId);

  // Fetch addresses from user's document inside "addresses" field
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) {
      setAddresses([]);
      setSelectedAddress(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const db = getFirestore();
    const userRef = doc(db, "users", userId);

      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const userAddresses = Array.isArray(userData.addresses) ? userData.addresses : [];
          setAddresses(userAddresses);
          if (userAddresses.length > 0 && userAddresses[0].id != null) {
            setSelectedAddress(String(userAddresses[0].id));
          }
          else {
            setSelectedAddress(null);
          }
        } else {
          setAddresses([]);
          setSelectedAddress(null);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
      setLoading(false);
    };

    fetchAddresses();

  }, [userId]); // refetch on userId change

  // Notify parent about selected address change
  useEffect(() => {
    if (selectedAddress && onSelectAddress) {
      const addrObj = addresses.find((a) => a.id === String(selectedAddress));
      onSelectAddress(addrObj);
    }
  }, [selectedAddress, addresses, onSelectAddress]);

  if (loading) return <div>Loading addresses...</div>;
  if (addresses.length === 0) return <div>No saved addresses found.</div>;
  return (
    <>
      <div className="address-wrapper">
        {addresses.map((address) => (
          <div
            className={`address-card ${String(selectedAddress)=== String(address.id)? "selected" : ""}`}
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
