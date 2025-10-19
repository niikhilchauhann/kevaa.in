import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc, updateDoc, collection, getDocs, addDoc, deleteDoc, query, where, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import "./addressList.css";

const AddressList = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'Home',
    houseNo: '',
    streetName: '',
    streetName2: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNo: ''
  });
  const [loading, setLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null); // for 3-dot menu
  const [editId, setEditId] = useState(null); // for editing

  const db = getFirestore();
const addressesCol = collection(db, 'addresses');
// Fetch addresses from Firestore global collection, filtered by userId
const fetchAddresses = async () => {
  if (!userId) return;
  try {
    // Fetch user document to get addressIds array
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      setAddresses([]);
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
  } catch (error) {
    console.error("Error fetching user's addresses:", error);
    alert("Failed to fetch addresses.");
  }
};


  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line
  }, [userId]);

  // Form change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add this helper function
  const isValidForm = () => {
    if (!form.houseNo.trim() || !form.streetName.trim() || !form.city.trim() || !form.state.trim() || !form.postalCode.trim() || !form.phoneNo.trim()) {
      alert("Please fill in all required fields.");
      return false;
    }

    if (!/^\d{5,6}$/.test(form.postalCode)) {
      alert("Please enter a valid postal code (5 or 6 digits).");
      return false;
    }

    return true;
  };

  // Add or Update Address
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !isValidForm()) return;
    setLoading(true);
    try {
      if (editId) {
        // Update existing address
        const addressRef = doc(db, 'addresses', editId);
        await updateDoc(addressRef, form);
      } else {
        // Add new address
        const newAddressRef = await addDoc(addressesCol, { ...form, userId });
        // Update user's addressIds array
        const userRef = doc(db, 'users', userId);
        try {
          // First try to get the user document to see if addressIds exists
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const currentAddressIds = userData.addressIds || [];
            await updateDoc(userRef, {
              addressIds: arrayUnion(newAddressRef.id)
            });
          } else {
            // If user document doesn't exist, create it with addressIds array
            await setDoc(userRef, { addressIds: [newAddressRef.id] }, { merge: true });
          }
        } catch (error) {
          console.error("Error updating user addressIds:", error);
          throw error;
        }
      }

      setForm({
        type: 'Home',
        houseNo: '',
        streetName: '',
        streetName2: '',
        city: '',
        state: '',
        postalCode: '',
        phoneNo: '',
      });
      setShowForm(false);
      setEditId(null);
      fetchAddresses();
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Error saving address: " + err.message);
    }
    setLoading(false);
  };

  // Remove Address
  const handleRemove = async (id) => {
    if (!userId || !id) return;
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const addressRef = doc(db, 'addresses', id);
      await deleteDoc(addressRef);
      // Remove addressId from user's addressIds array
      const userRef = doc(db, 'users', userId);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const currentAddressIds = userData.addressIds || [];
          const updatedAddressIds = currentAddressIds.filter(addrId => addrId !== id);
          await updateDoc(userRef, {
            addressIds: arrayRemove(id)
          });
        }
      } catch (error) {
        console.warn("Could not remove addressId from user document:", error.message);
      }
      setAddresses(addresses.filter(addr => addr.id !== id));
      setMenuOpenId(null);
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address: " + error.message);
    }
  };

  // Edit Address
  const handleEdit = (address) => {
    setForm({
      type: address.type || 'Home',
      houseNo: address.houseNo || '',
      streetName: address.streetName || '',
      streetName2: address.streetName2 || '',
      city: address.city || '',
      state: address.state || '',
      postalCode: address.postalCode || '',
      phoneNo: address.phoneNo || '',
    });
    setEditId(address.id);
    setShowForm(true);
    setMenuOpenId(null);
  };

  // Open Add Form
  const handleAddNew = () => {
    setForm({
      type: 'Home',
      houseNo: '',
      streetName: '',
      streetName2: '',
      city: '',
      state: '',
      postalCode: '',
      phoneNo: '',
    });
    setEditId(null);
    setShowForm(prev => !prev);
  };

  // Close form
  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
  };

  return (
    <div className="address-wrapper">
      {/* <h2>Your Addresses</h2> */}
      <div className="address-box">
        <div className="address-header">
          <h3>My Address</h3>
          <button className="add-address" onClick={handleAddNew}>
            ➕ Add new address
          </button>
        </div>

        {/* Address Form */}
        {showForm && (
          <form className="address-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select name="type" id="type" value={form.type} onChange={handleChange}>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="houseNo">House No.</label>
              <input id="houseNo" name="houseNo" value={form.houseNo} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="streetName">Street Name / Colony</label>
              <input id="streetName" name="streetName" value={form.streetName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="streetName2">Street Name 2</label>
              <input id="streetName2" name="streetName2" value={form.streetName2} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input id="state" name="state" value={form.state} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input id="phoneNo" name="phoneNo" value={form.phoneNo} onChange={handleChange} required />
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button type="submit" disabled={loading}>
                {loading ? (editId ? "Updating..." : "Saving...") : (editId ? "Update" : "Save Address")}
              </button>
              <button type="button" onClick={handleCancel} style={{ background: '#eee', color: '#333' }}>Cancel</button>
            </div>
          </form>

        )}

        {/* Address List */}
        <div className="address-list">
          {addresses.map((item) => (
            <div key={item.id} className="address-item" style={{ position: "relative" }}>
              <div className="icon">🏠</div>
              <div className="details">
                <strong>{item.type} (ID: {item.id})</strong>
                <p>
                  House No - {item.houseNo} <br />
                  Colony / Street Name - {item.streetName} <br />
                  Street Name - {item.streetName2 ? ` ${item.streetName2}` : ''} <br />
                  City - {item.city} <br />
                  State - {item.state} <br />
                  Postal Code - {item.postalCode} <br />
                  Phone Number - {item.phoneNo}
                </p>
              </div>
              <div className="options" onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}>⋮</div>

              {/* Slide-in menu */}
              <div
                className={`address-actions-menu${menuOpenId === item.id ? " open" : ""}`}
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button onClick={() => handleRemove(item.id)} style={{ color: "red" }}>🗑️ Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressList;
