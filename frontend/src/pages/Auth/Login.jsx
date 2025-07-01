import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import '../../css/Auth/login.css';
import keva from "../../assets/keva2.png"
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
  const { login, error } = useAuthStore();
  const googleLogin = useAuthStore(state => state.googleLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgot, setForgot] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (res) alert("Login Success ✅"), navigate('/');

  };

  const handleGoogleLogin = async () => {
    const res = await googleLogin();
    if (res) {
      alert("Google Login Successfully ✅");
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="header-bar"></div>
      <div className="logo">
        <img src={keva} alt="Kevaa" className="logo-image" />
      </div>
      <div className="main-content">
        <div className="login-section">
          <div className="login-form-container">
            <h2 className="login-title">Sign In</h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className='login-btn'>
                <button type="submit" className="login-button">
                  LOGIN ➜
                </button>

                <a href="/resetpassword" className="forgot-password">
                  Forgot your password?
                </a>
              </div>


              <span >Or</span>
              <button className='signin-with-google' onClick={handleGoogleLogin}> <img src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png" alt="" />Sign in with Google</button>

              <NavLink to='/signup'>
                <button type="button" className="create-account-button">
                  CREATE NEW ACCOUNT
                </button>
              </NavLink>
            </form>
          </div>

          <div className="footer-links">
            <a href="/terms-condition">Terms and conditions</a>
            <span>•</span>
            <a href="/privacy-policy">Privacy policy</a>
          </div>
        </div>

        <div className="marketing-section">
          <div className="marketing-content">
            <div className="squiggle squiggle-1">~~~~~</div>
            <div className="diamond diamond-1">◊</div>
            <div className="diamond diamond-2">◊</div>

            <div className="main-text-container">
              <div className="pink-block"></div>
              <h1 className="main-text">
                <span className="text-line">India's</span>
                <span className="text-line highlighted">Best in class</span>
                <span className="text-line highlighted">Divine</span>
                <span className="text-line">Store</span>
              </h1>
            </div>

            <div className="squiggle squiggle-2">∼∼∼</div>
            <div className="triangle">▲</div>

            <div className="cta-container">
              <div className="pink-line"></div>
              <a href="/signup" className="try-now-button">
                Try now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
