import React, { useState, useEffect } from 'react';
import './profile.css';
import useAuthStore from '../../store/authStore';
import { Timestamp } from 'firebase/firestore'; // Import if needed

const COUNTRY_OPTIONS = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  // Add more as needed
];

const Profile = ({ user }) => {
  const [imgError, setImgError] = useState(false);
  const { loading, error } = useAuthStore();
  const displayName = user?.displayName || user?.firstName || "User";
  const email = user?.email || "";
  const userPhotoURL = user?.photoURL || user?.imageUrl;

  // Initial country code
  const [editCountryCode, setEditCountryCode] = useState(user?.countryCode || "+91");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.displayName ||
    ""
  );
  const [editGender, setEditGender] = useState(user?.gender || "Not specified");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const updateProfile = useAuthStore(state => state.updateProfile);

  // Update local state when user prop changes
  useEffect(() => {
    setEditName(
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.displayName ||
      ""
    );
  }, [user?.firstName, user?.lastName, user?.displayName]);

  useEffect(() => {
    setEditGender(user?.gender || "Not specified");
  }, [user?.gender]);

  useEffect(() => {
    setEditPhone(user?.phone || "");
  }, [user?.phone]);

  useEffect(() => {
    setEditCountryCode(user?.countryCode || "+91");
  }, [user?.countryCode]);

  const handleSave = async () => {
    const [firstName, ...rest] = editName.split(" ");
    const lastName = rest.join(" ");

    try {
      const success = await updateProfile({
        firstName,
        lastName,
        gender: editGender,
        phone: editPhone,
        countryCode: editCountryCode,
      });

      if (success) setEditMode(false);
      else alert("Profile update failed. Check console for details.");
    } catch (err) {
      alert("Error: " + err.message);
      console.error("Save error:", err);
    }
  };

  let createdAtDisplay = "";
  if (user?.createdAt) {
    if (user.createdAt?.seconds) {
      // Firestore timestamp
      const date = new Date(user.createdAt.seconds * 1000);
      createdAtDisplay = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else if (user.createdAt instanceof Date || !isNaN(new Date(user.createdAt).getTime())) {
      // Date or valid date string
      const date = new Date(user.createdAt);
      createdAtDisplay = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else {
      // Fallback
      createdAtDisplay = user.createdAt.toString();
    }
  }

  const initial = displayName[0] || "U";

  // Find the selected country for displaying flag and name in view mode
  const selectedCountry = COUNTRY_OPTIONS.find(c => c.code === (user?.countryCode || "+91")) || COUNTRY_OPTIONS[0];

  return (
    <div className="profile-container">
      <h2>Welcome, {displayName}</h2>
      <p className="date">
        {new Date().toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>

      <div className="profile-card">
        <div className="profile-header"></div>
        <div className="profile-content">
          {userPhotoURL && !imgError ? (
            <img
              className="avatar"
              src={userPhotoURL}
              alt={displayName}
              onError={() => setImgError(true)}
            />
          ) : (
            <h1 className="avatar-initial">{initial}</h1>
          )}
          <div className="user-info">
            <h3>{displayName}</h3>
            <p>{email}</p>
          </div>
          <button className="edit-btn"
            onClick={editMode ? handleSave : () => setEditMode(true)}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        <div className="form">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your First Name"
            value={editMode ? editName : ([user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.displayName || "")}
            onChange={e => setEditName(e.target.value)}
            readOnly={!editMode}
          />

          <label>Gender</label>
          <select
            value={editMode ? editGender : (user?.gender || "Not specified")}
            onChange={e => setEditGender(e.target.value)}
            disabled={!editMode}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Not specified">Not specified</option>
          </select>

          <label>Phone</label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select
              value={editCountryCode}
              onChange={e => setEditCountryCode(e.target.value)}
              disabled={!editMode}
              style={{ width: "180px" }}
            >
              {COUNTRY_OPTIONS.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code} ({country.name})
                </option>
              ))}
            </select>
            <input
              type="text"
              value={editMode ? editPhone : (user?.phone || "")}
              onChange={e => setEditPhone(e.target.value)}
              readOnly={!editMode}
              placeholder="Phone Number"
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ marginTop: 4, color: "#555" }}>
            Country Code: <b>
              {editMode
                ? editCountryCode
                : (user?.countryCode || selectedCountry.code)
              }
            </b>
          </div>

          <label>My email Address</label>
          <div className="email-box">
            <span className="email-icon">📧</span>
            <div>
              <p>{email}</p>
              <small>{createdAtDisplay}</small>
            </div>
          </div>

          <button className="add-btn">+ Add Email Address</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
