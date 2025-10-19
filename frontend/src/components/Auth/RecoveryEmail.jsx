import React from 'react';
import './RecoveryEmail.css';

const RecoveryEmail = () => {
  return (
    <div className="reset-wrapper">
      <div className="reset-box">
        <h2>Recovery Email Sent!</h2>
        <p>Please check your email for next steps to reset your password.</p>

        <button className="next-btn">CONTACT SUPPORT</button>
        <button className="back-btn">BACK TO LOGIN</button>
      </div>
    </div>
  );
};

export default RecoveryEmail;
