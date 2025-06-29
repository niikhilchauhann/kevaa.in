import React from 'react';
import '../../../css/Auth/ResetPassword.css';

const ResetPassword = () => {
  return (
    <div className="reset-wrapper">
      <div className="reset-box">
        <h2>Reset your password</h2>
        <p>Type in your registered email address to reset password</p>

        <input type="email" placeholder="Email Address *" required />

        <button className="next-btn">
          NEXT <span className="arrow">→</span>
        </button>

        <button className="back-btn">BACK TO LOGIN</button>
      </div>
    </div>
  );
};

export default ResetPassword;
