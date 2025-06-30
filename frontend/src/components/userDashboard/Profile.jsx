import React from 'react';
import '../../css/userDashboard/profile.css';

const Profile = () => {
  const user = {
    name: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    phone: "+91 87560 60559",
    gender: "Female",
    createdAt: "1 month ago",
    imageUrl: "https://i.pravatar.cc/100?img=65"
  };

  return (
    <div className="profile-container">
      <h2>Welcome, Amanda</h2>
      <p className="date">Tue, 07 June 2022</p>

      <div className="profile-card">
        <div className="profile-header"></div>
        <div className="profile-content">
          <img className="avatar" src={user.imageUrl} alt="User" />
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <button className="edit-btn">Edit</button>
        </div>

        <div className="form">
          <label>Full Name</label>
          <input type="text" placeholder="Your First Name" />

          <label>Gender</label>
          <select>
            <option>{user.gender}</option>
          </select>

          <label>Phone</label>
          <select>
            <option>{user.phone}</option>
          </select>

          <label>My email Address</label>
          <div className="email-box">
            <span className="email-icon">📧</span>
            <div>
              <p>{user.email}</p>
              <small>{user.createdAt}</small>
            </div>
          </div>

          <button className="add-btn">+ Add Email Address</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
