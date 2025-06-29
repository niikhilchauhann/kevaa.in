import React, { useState } from 'react';
import '../../css/Auth/SetPassword.css';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <div className="set-password-form">
      <h2>Set your password</h2>

      <div className={`spf-input-group ${password ? 'filled' : ''}`}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password</label>
      </div>

      <div className={`spf-input-group ${confirm ? 'filled' : ''}`}>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <label>Confirm password</label>
      </div>

      <button className="spf-signup-btn">SIGN UP</button>
      <button className="spf-login-btn">BACK TO LOGIN</button>
    </div>
  );
};


export default SetPassword;