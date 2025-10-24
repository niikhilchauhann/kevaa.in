// import React, { useEffect, useState } from "react";
// import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
// import AddressList from '../Dashboard/AddressList';
// import "./addressAreas.css";
// import { IoMdRefresh } from "react-icons/io";

// const AddressArea = ({ userId, onSelectAddress }) => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchAddresses = async () => {
//     if (!userId) {
//       setAddresses([]);
//       setSelectedAddress(null);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     const db = getFirestore();

//     try {
//       // Fetch user document to get addressIds
//       const userRef = doc(db, 'users', userId);
//       const userDoc = await getDoc(userRef);
//       if (!userDoc.exists()) {
//         setAddresses([]);
//         setSelectedAddress(null);
//         setLoading(false);
//         return;
//       }
//       const userData = userDoc.data();
//       const addressIds = userData.addressIds || [];

//       // Fetch addresses by IDs
//       const addressesData = [];
//       for (const addrId of addressIds) {
//         const addrDoc = await getDoc(doc(db, 'addresses', addrId));
//         if (addrDoc.exists()) {
//           addressesData.push({ id: addrDoc.id, ...addrDoc.data() });
//         }
//       }
//       setAddresses(addressesData);
//       if (addressesData.length > 0) {
//         setSelectedAddress(String(addressesData[0].id));
//       } else {
//         setSelectedAddress(null);
//       }
//     } catch (err) {
//       console.error("Error fetching addresses:", err);
//       setAddresses([]);
//       setSelectedAddress(null);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, [userId]);

//   useEffect(() => {
//     if (selectedAddress && onSelectAddress) {
//       onSelectAddress(String(selectedAddress));
//     }
//   }, [selectedAddress, onSelectAddress]);

//   if (loading) return <div>Loading addresses...</div>;

//   if (addresses.length === 0) {
//     return (
//       <div>
//         <p>No saved addresses found. Please add atleast one below:</p>
//         <AddressList userId={userId} />
//         {/* When address added, call fetchAddresses again */}
//         <button onClick={fetchAddresses} style={{ marginTop: "1rem", backgroundColor: '#700d37', color: 'white', display: 'flex', gap:'12px' }}><IoMdRefresh/>Refresh</button>
//       </div>
//     );
//   }

//   return (
//     <div className="address-wrapper">
//       {addresses.map((address) => (
//         <div
//           className={`address-card ${String(selectedAddress) === String(address.id) ? "selected" : ""}`}
//           key={address.id}
//         >
//           <div className="address-info">
//             <input
//               type="radio"
//               name="address"
//               checked={String(selectedAddress) === String(address.id)}
//               onChange={() => setSelectedAddress(String(address.id))}
//             />
//             <div>
//               <div className="name-badge">
//                 <span className="name">{address.type || "Address"}</span>
//                 <span className="badge">{address.type || "HOME"}</span>
//               </div>
//               <div className="address-text">
//                 {address.houseNo}, {address.streetName}
//                 {address.streetName2 ? `, ${address.streetName2}` : ""}
//                 , {address.city}, {address.state} - {address.postalCode}
//               </div>
//               {address.contact && <div className="contact">Contact - {address.contact}</div>}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AddressArea;










import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  runTransaction,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./addressAreas.css";
import { arrayRemove } from "firebase/firestore";
import { clearIndexedDbPersistence } from "firebase/firestore";

const AddressArea = ({ userId, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({});
  const [showNewForm, setShowNewForm] = useState(false); 



useEffect(() => {
  const clearCache = async () => {
    try {
      await clearIndexedDbPersistence(db);
      console.log("🧹 Firestore cache cleared");
    } catch (err) {
      console.warn("⚠️ Cache not cleared (probably persistence disabled):", err);
    }
  };
  clearCache();
  fetchAddresses();
}, [userId]);

  
const fetchAddresses = async () => {
  if (!userId) return;

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef, { source: "server" });

    if (!userSnap.exists()) {
      setAddresses([]);
      return;
    }

    const userData = userSnap.data();
    const addressIds = userData.addressIds || [];
    const addressesData = [];

    for (const addrId of addressIds) {
      const addrRef = doc(db, "addresses", addrId);
      const addrSnap = await getDoc(addrRef, { source: "server" });
      if (addrSnap.exists()) {
        addressesData.push({ id: addrSnap.id, ...addrSnap.data() });
      } else {
        console.warn(`🧹 Missing address doc for: ${addrId}`);
      }
    }

    const validIds = addressesData.map(addr => addr.id);
    if (JSON.stringify(validIds.sort()) !== JSON.stringify(addressIds.sort())) {
      await updateDoc(userRef, { addressIds: validIds });
      console.log("✅ Synced user.addressIds with valid docs");
    }

    setAddresses(addressesData);
    setSelectedAddress(addressesData[0] || null);
  } catch (error) {
    console.error("❌ fetchAddresses error:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAddresses();
  }, [userId]);

    useEffect(() => {
      if (selectedAddress && onSelectAddress) {
        onSelectAddress(selectedAddress); 
      }
    }, [selectedAddress, onSelectAddress]);


    const handleEdit = (address) => {
      setEditingAddress(address);
      setFormData({
        type: address.type || "Home",
        houseNo: address.houseNo || "",
        streetName: address.streetName || "",
        streetName2: address.streetName2 || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postalCode || "",
        contact: address.contact || "",
      });
    };


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

const handleSaveEdit = async () => {
  if (!editingAddress) return;
  try {
    const addressRef = doc(db, "addresses", editingAddress.id);

    const updatedData = {
      type: formData.type || "Home",
      houseNo: formData.houseNo || "",
      streetName: formData.streetName || "",
      streetName2: formData.streetName2 || "",
      city: formData.city || "",
      state: formData.state || "",
      postalCode: formData.postalCode || "",
      contact: formData.contact || "",
      name: formData.name || "",
    };

    await updateDoc(addressRef, updatedData);

    // update local state quickly
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...updatedData } : addr))
    );

    if (selectedAddress?.id === editingAddress.id) {
      setSelectedAddress((prev) => ({ ...prev, ...updatedData }));
      if (onSelectAddress) onSelectAddress({ ...selectedAddress, ...updatedData });
    }

    setEditingAddress(null);
    setFormData({});

    // refresh from server to be safe
    await fetchAddresses();
  } catch (error) {
    console.error("❌ Error updating address:", error);
  }
};

const handleRemove = async (addressId) => {
  if (!userId || !addressId) return;

  const userRef = doc(db, "users", userId);
  const addressRef = doc(db, "addresses", addressId);

  try {
    console.log("🟡 Removing address:", addressId);
    setLoading(true);

    // 1️⃣ Delete address doc
    await deleteDoc(addressRef);
    console.log("🗑️ Address doc deleted");

    // 2️⃣ Remove from user.addressIds array
    await updateDoc(userRef, { addressIds: arrayRemove(addressId) });
    console.log("✅ User document updated (arrayRemove)");

    // 3️⃣ Update UI immediately
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));

    // 4️⃣ If deleted one was selected
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(null);
      onSelectAddress?.(null);
    }

    // 5️⃣ Force refresh from Firestore (server)
    await fetchAddresses();
  } catch (err) {
    console.error("❌ handleRemove error:", err);
  } finally {
    setLoading(false);
  }
};


  // 🔹 NEW — Save new address
const handleSaveNew = async () => {
  if (!userId) return;
  if (!formData.houseNo || !formData.city || !formData.state || !formData.contact) {
    return alert("Please fill required fields");
  }

  try {
    const addressesRef = collection(db, "addresses");
    const newAddressDoc = await addDoc(addressesRef, {
      ...formData,
      createdAt: new Date(),
    });

    const newId = newAddressDoc.id;
    const userRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userRef, { source: "server" });

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedIds = Array.isArray(userData.addressIds)
        ? [...userData.addressIds, newId]
        : [newId];
      await updateDoc(userRef, { addressIds: updatedIds });
    } else {
      // create or set user doc with this address id
      await setDoc(userRef, { addressIds: [newId] }, { merge: true });
    }

    // refresh local UI
    await fetchAddresses();
    setShowNewForm(false);
    setFormData({});
  } catch (error) {
    console.error("Error adding new address:", error);
  }
};

  if (loading) return <div>Loading addresses...</div>;

  return (
    <div className="address-wrapper">
      {addresses.map((address) =>
        editingAddress && editingAddress.id === address.id ? (
          <div className="edit-centered" key={address.id}>
            <div className="edit-card">
              <h3>Edit Address</h3>
              <div className="edit-grid">
                <div>
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type || "Home"}
                    onChange={handleChange}
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label>House No.</label>
                  <input
                    name="houseNo"
                    value={formData.houseNo || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Street Name / Colony</label>
                  <input
                    name="streetName"
                    value={formData.streetName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Street Name 2</label>
                  <input
                    name="streetName2"
                    value={formData.streetName2 || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>State</label>
                  <input
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Postal Code</label>
                  <input
                    name="postalCode"
                    value={formData.postalCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    name="contact"
                    value={formData.contact || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSaveEdit}>
                  Save Address
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setEditingAddress(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`address-card ${ selectedAddress?.id === address.id ? "selected" : "" }`}
            key={address.id}
          >
            <div className="address-info">
              <input
              type="radio"
              name="address"
              checked={selectedAddress?.id === address.id}
              onChange={() => {
                setSelectedAddress(address);
                onSelectAddress(address);;
              }}
            />

              <div>
                <div className="name-badge">
                  <span className="name">{address.name || "Name"}</span>
                  <span className="badge">{address.type || "HOME"}</span>
                </div>
                <div className="address-text">
                  {address.houseNo}, {address.streetName}
                  {address.streetName2 ? `, ${address.streetName2}` : ""},{" "}
                  {address.city}, {address.state} - {address.postalCode}
                </div>
                <div className="contact">
                  Contact: {address.contact || "N/A"}
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="edit" onClick={() => handleEdit(address)}>
                Edit
              </button>
              <div className="separator"></div>
              <button className="remove" onClick={() => handleRemove(address.id)}>
                Remove
              </button>
            </div>
          </div>
        )
      )}

      {/* 🔹 NEW FORM FOR ADDING ADDRESS */}
      {showNewForm && (
        <div className="edit-centered">
          <div className="edit-card">
            <h3>Add New Address</h3>
            <div className="edit-grid">
              <div>
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type || "Home"}
                  onChange={handleChange}
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label>House No.</label>
                <input
                  name="houseNo"
                  value={formData.houseNo || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Street Name / Colony</label>
                <input
                  name="streetName"
                  value={formData.streetName || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Street Name 2</label>
                <input
                  name="streetName2"
                  value={formData.streetName2 || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>State</label>
                <input
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Postal Code</label>
                <input
                  name="postalCode"
                  value={formData.postalCode || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  name="contact"
                  value={formData.contact || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSaveNew}>
                Save Address
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowNewForm(false);
                  setFormData({});
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!showNewForm && !editingAddress && (
        <button
          className="add-new"
          onClick={() => {
            setFormData({});       
            setShowNewForm(true);  
          }}
        >
          <FaPlus style={{ marginRight: "6px" }} /> Add New Address
        </button>

      )}
    </div>
  );
};

export default AddressArea;
