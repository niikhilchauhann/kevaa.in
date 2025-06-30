import React, { useState, useEffect } from 'react';
import '../../css/Auth/SignUp.css';
import DeliveryGuy from "../../assets/DeliveryGuy.gif"
import SetPassword from './SetPassword';
import keva from "../../assets/keva2.png"
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const countryCodeMap = {
  India: '+91 ',
  "United States": '+1 ',
  Germany: '+49 ',
  France: '+33 '
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    country: '',
    phone: '',
    timezone: '',
    password: ''
  });

  const [phonePrefix, setPhonePrefix] = useState('');

  useEffect(() => {
    if (formData.country && countryCodeMap[formData.country]) {
      setPhonePrefix(countryCodeMap[formData.country]);
      if (!formData.phone.startsWith(countryCodeMap[formData.country])) {
        setFormData(prev => ({
          ...prev,
          phone: countryCodeMap[formData.country]
        }));
      }
    } else {
      setPhonePrefix('');
    }
  }, [formData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (phonePrefix && !value.startsWith(phonePrefix)) {
        setFormData(prev => ({
          ...prev,
          phone: phonePrefix
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinalSubmit = async (password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
      const user = userCredential.user;
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        companyName: formData.companyName,
        country: formData.country,
        phone: formData.phone,
        timezone: formData.timezone,
        createdAt: new Date()
      });
      console.log('User signed up and data saved:', user.uid);
      // Optionally reset form or redirect user here
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error display to user as needed
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-section">
        {step === 1 && (
          <div className="form-wrapper">
            <h1 className="signup-heading">Sign up to Kevaa.in</h1>
            <form className="signup-form" onSubmit={handleNext}>
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
                <label className="floating-label">Email Address</label>
              </div>
              <div className="input-group floating-label-group">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="form-input floating-input"
                  placeholder="Company Name"
                  required
                />
                <label className="floating-label">Company Name</label>
              </div>
              <div className="phone-row">
                <div className="input-group floating-label-group">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="form-select floating-select"
                    required
                  >
                    <option value="">Select country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                  <label className="floating-label">Country</label>
                </div>

                <div className="input-group floating-label-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input floating-input phone-input"
                    placeholder="Phone number"
                    required
                  />
                  <label className="floating-label">Phone #</label>
                </div>

              </div>

              <div className="input-group floating-label-group">
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="form-select floating-select"
                  required
                >
                  <option value="">Select timezone</option>
                  <option value="GMT+5:30">GMT+5:30 (India)</option>
                  <option value="GMT+2">GMT+2</option>
                  <option value="GMT">GMT</option>
                  <option value="GMT-5">GMT-5</option>
                </select>
                <label className="floating-label">Default timezone</label>
              </div>
              <button type="submit" className="signup-btn">
                Next
              </button>
              <button type="button" className="back-to-login-btn">
                BACK TO LOGIN
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <SetPassword onBack={handleBack} onSubmit={handleFinalSubmit} />
        )}
        <div className="footer-links">
          <a href="#" className="footer-link">Terms and conditions</a>
          <span className="separator">•</span>
          <a href="#"
            className="footer-link">Privacy policy</a>
        </div>
      </div>
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
