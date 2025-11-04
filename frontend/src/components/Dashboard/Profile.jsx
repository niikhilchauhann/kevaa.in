import React, { useState, useEffect } from 'react';
import './profile.css';
import useAuthStore from '../../store/authStore';

const COUNTRY_OPTIONS = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
];

const Profile = ({ user }) => {
  const [imgError, setImgError] = useState(false);
  const { loading, error } = useAuthStore();

  const displayName = user?.displayName || user?.firstName || "User";
  const email = user?.email || "";
  const userPhotoURL = user?.photoURL || user?.imageUrl;

  // Editable fields
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.displayName ||
    ""
  );
  const [editGender, setEditGender] = useState(user?.gender || "Not specified");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editCountryCode, setEditCountryCode] = useState(user?.countryCode || "+91");

  // Email management
  const [emails, setEmails] = useState([email]);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const updateProfile = useAuthStore((state) => state.updateProfile);

  // Sync updates
  useEffect(() => {
    setEditName(
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      user?.displayName ||
      ""
    );
    setEditGender(user?.gender || "Not specified");
    setEditPhone(user?.phone || "");
    setEditCountryCode(user?.countryCode || "+91");
    if (user?.email) setEmails([user.email]);
  }, [user]);

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

  const handleAddEmail = () => {
    setShowEmailInput(true);
  };

  const handleSaveEmail = () => {
    if (newEmail.trim() !== "") {
      setEmails([...emails, newEmail.trim()]);
      setNewEmail("");
      setShowEmailInput(false);
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((e) => e !== emailToRemove));
  };

  const createdAtDisplay = user?.createdAt
    ? new Date(
        user.createdAt?.seconds
          ? user.createdAt.seconds * 1000
          : user.createdAt
      ).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : "";

  const initial = displayName[0] || "U";

  return (
    <div className="profile-container">
      <h2>Welcome, {displayName}</h2>
      <p className="date">
        {new Date().toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
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

          <button
            className="edit-btn"
            onClick={editMode ? handleSave : () => setEditMode(true)}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        <div className="form">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            readOnly={!editMode}
          />

          <label>Gender</label>
          <select
            value={editGender}
            onChange={(e) => setEditGender(e.target.value)}
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
              onChange={(e) => setEditCountryCode(e.target.value)}
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
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              readOnly={!editMode}
              placeholder="Phone Number"
              style={{ flex: 1 }}
            />
          </div>

          {/* 📧 Email Section */}
          <label>My Email Address</label>
          {emails.map((mail, index) => (
            <div key={index} className="email-box">
              <div className="email-left">
                <span className="email-icon">📧</span>
                <div>
                  <p>{mail}</p>
                  <small>{createdAtDisplay}</small>
                </div>
              </div>
              {emails.length > 0 && (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveEmail(mail)}
                  title="Remove Email"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {showEmailInput ? (
            <div className="add-email-box">
              <input
                type="email"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button onClick={handleSaveEmail}>Save</button>
            </div>
          ) : (
            <button className="add-btn" onClick={handleAddEmail}>
              + Add Email Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
