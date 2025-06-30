import React, { useState } from 'react';
import '../../css/Auth/SignUp.css';
import DeliveryGuy from "../../assets/DeliveryGuy.gif"
import SetPassword from './SetPassword';
import keva from "../../assets/keva2.png"

const SignUp = () => {
  const [Password, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    storeName: '',
    countryCode: '+91',
    phone: '',
    storeType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(true);
  };

  return (
    <div className="signup-container">
      {/* Left Section - Form */}
      <div className="signup-form-section">
        {!Password &&
        <div className="form-wrapper">

          {/* Heading */}
          {!Password && <h1 className="signup-heading">Sign up to Kevaa.in</h1>}

          {/* Form */}
            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="name-row">
                <div className="input-group floating-label-group">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input floating-input"
                    placeholder="First name"
                    required
                  />
                  <label className="floating-label">First name</label>
                </div>
                <div className="input-group floating-label-group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input floating-input"
                    placeholder="Last name"
                    required
                  />
                  <label className="floating-label">Last name</label>
                </div>
              </div>

              {/* Email */}
              <div className="input-group floating-label-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input floating-input"
                  placeholder="Email address"
                  required
                />
                <label className="floating-label">Email address</label>
              </div>

              {/* Store Name */}
              <div className="input-group floating-label-group">
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="form-input floating-input"
                  placeholder="Store name"
                  required
                />
                <label className="floating-label">Store name</label>
              </div>

              {/* Phone Number */}
              <div className="phone-row">
                <div className="input-group country-code">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+86">+86</option>
                  </select>
                </div>
                <div className="input-group phone-input floating-label-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input floating-input"
                    placeholder="Phone number"
                    required
                  />
                  <label className="floating-label">Phone number</label>
                </div>
              </div>

              {/* Store Type */}
              <div className="input-group floating-label-group">
                <select
                  name="storeType"
                  value={formData.storeType}
                  onChange={handleInputChange}
                  className="form-select floating-select"
                  required
                >
                  <option value="">Select store type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="grocery">Grocery Store</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="other">Other</option>
                </select>
                <label className="floating-label">Select store type</label>
              </div>

              {/* Buttons */}
              <button type="submit" className="signup-btn">
                SIGN UP
              </button>

              <button type="button" className="back-to-login-btn">
                BACK TO LOGIN
              </button>
            </form>
          

        </div>}
        {
          Password && <SetPassword />
        }
        <div className="footer-links">
          <a href="#" className="footer-link">Terms and conditions</a>
          <span className="separator">•</span>
          <a href="#"
            className="footer-link">Privacy policy</a>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="signup-image-section">
        <div className="image-container">
          <img
            src={DeliveryGuy}
            alt="Delivery person on red scooter"
            className="delivery-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
