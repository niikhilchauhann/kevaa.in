import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';
import "../../css/userDashboard/addressList.css";

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
  });
  const [loading, setLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null); // for 3-dot menu
  const [editId, setEditId] = useState(null); // for editing

 const db = getFirestore();
  const userRef = doc(db, 'users', userId);
  // Fetch addresses from Firestore
 const fetchAddresses = async () => {
    if (!userId) return;
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setAddresses(Array.isArray(userData.addresses) ? userData.addresses : []);
      } else {
        setAddresses([]);
      }
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

  // Add or Update Address
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try {
      // Get current addresses array
      const userSnap = await getDoc(userRef);
      let currentAddresses = [];
      if (userSnap.exists()) {
        const userData = userSnap.data();
        currentAddresses = Array.isArray(userData.addresses) ? userData.addresses : [];
      }

      if (editId) {
        // Update existing address by id
        currentAddresses = currentAddresses.map(addr =>
          addr.id === editId ? { ...addr, ...form } : addr
        );
      } else {
        // Add new address with unique id
        const newAddress = {
          id: Date.now().toString(),
          ...form,
        };
        currentAddresses.push(newAddress);
      }

      // Update user document's addresses field
      await updateDoc(userRef, { addresses: currentAddresses });
      setAddresses(currentAddresses);
      setForm({
        type: 'Home',
        houseNo: '',
        streetName: '',
        streetName2: '',
        city: '',
        state: '',
        postalCode: '',
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
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;

      const userData = userSnap.data();
      const currentAddresses = Array.isArray(userData.addresses) ? userData.addresses : [];

      // Filter out the address to delete
      const filteredAddresses = currentAddresses.filter(addr => addr.id !== id);

      // Update user document with filtered addresses
      await updateDoc(userRef, { addresses: filteredAddresses });

      setAddresses(filteredAddresses);
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
      <h2>Your Addresses</h2>
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
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            <input name="houseNo" placeholder="House No." value={form.houseNo} onChange={handleChange} required />
            <input name="streetName" placeholder="Street Name" value={form.streetName} onChange={handleChange} required />
            <input name="streetName2" placeholder="Street Name 2" value={form.streetName2} onChange={handleChange} />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
            <input name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required />
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
                <strong>{item.type}</strong>
                <p>
                  {item.houseNo}, {item.streetName}
                  {item.streetName2 ? `, ${item.streetName2}` : ''}
                  , {item.city}, {item.state} - {item.postalCode}
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
