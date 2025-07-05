import React, {useState} from 'react';
import '../../css/userDashboard/profile.css';
import { Timestamp } from 'firebase/firestore'; // Import if needed

const Profile = ({ user }) => {
    const [imgError, setImgError] = useState(false);
  const displayName = user?.displayName || user?.firstName || "User";
  const email = user?.email || "";
  const userPhotoURL = user?.photoURL || user?.imageUrl;
  const gender = user?.gender || "Not specified";
  const phone = user?.phone || "Not specified";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || displayName;
  console.log(user)
  console.log(userPhotoURL)

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
          <button className="edit-btn">Edit</button>
        </div>

        <div className="form">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your First Name"
            value={fullName}
            readOnly
          />

          <label>Gender</label>
          <select value={gender} disabled>
            <option>{gender}</option>
          </select>

          <label>Phone</label>
          <select value={phone} disabled>
            <option>{phone}</option>
          </select>

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
