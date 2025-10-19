import React, { useState, useEffect } from 'react';
import './signUp.css';
import Lottie from 'lottie-react';
import cartPacking from '../../assets/cart_packing.json';
import img from '../../assets/keva2.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const countryCodeMap = {
  India: '+91 ',
  "United States": '+1 ',
  Germany: '+49 ',
  France: '+33 '
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
    password: ''
  });

  const [phonePrefix, setPhonePrefix] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    if (name === 'phone' && phonePrefix && !value.startsWith(phonePrefix)) {
      setFormData(prev => ({
        ...prev,
        phone: phonePrefix
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        phone: formData.phone,
        createdAt: new Date()
      });
      console.log('User signed up and data saved:', user.uid);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email,
        phone: user.phoneNumber || '',
        country: '',
        createdAt: new Date()
      });
      console.log('User signed up and data saved:', user.uid);
      navigate('/');
    } catch (err) {
      console.error('Google sign-in error:', err);
    }
  };

  return (
    <div className="signup-container">
      <div className='header-bar'>
        <NavLink to='/'>
          <img src={img} alt="logo" className='keva-logo' />
        </NavLink>
      </div>
      <div className="signup-form-section">
        <div className="form-wrapper">
          <h1 className="signup-heading">Sign up to Kevaa.in</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
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
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input floating-input"
                placeholder="Password"
                required
              />
              <label className="floating-label">Password</label>
            </div>

            <div className="input-group floating-label-group">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input floating-input"
                placeholder="Confirm Password"
                required
              />
              <label className="floating-label">Confirm Password</label>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="button-group">
              <button type="submit" className="signup-btn">Sign Up</button>
              <button type="button" className="google-signup-btn" onClick={handleGoogleSignup}>
                <img src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png" alt="" />
                Sign up with Google
              </button>
              <NavLink to="/login">
                <button type="button" className="back-to-login-btn">BACK TO LOGIN</button>
              </NavLink>
            </div>

          </form>
        </div>

        <div className="footer-links">
          <a href="#" className="footer-link">Terms and conditions</a>
          <span className="separator">•</span>
          <a href="#" className="footer-link">Privacy policy</a>
        </div>
      </div>

      <div className="signup-image-section">
        <div className="image-container">
          <Lottie animationData={cartPacking} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
