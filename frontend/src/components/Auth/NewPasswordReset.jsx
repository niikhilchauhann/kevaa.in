import React from 'react';
import "./newPasswordReset.css"
const NewPasswordReset = () => {
  return (
    <div className="reset-wrapper">
      <div className="reset-box">
        <h2>Reset your password</h2>
        <p>Type in your new password</p>

        <input type="password" placeholder="New password *" required />
        <input type="password" placeholder="Retry new password *" required />

        <button className="next-btn">
          RESET <span className="arrow">→</span>
        </button>

        <button className="back-btn">BACK TO LOGIN</button>
      </div>
    </div>
  );
};

export default NewPasswordReset;
