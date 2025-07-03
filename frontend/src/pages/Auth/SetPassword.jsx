import React, { useState } from 'react';
import '../../css/Auth/SetPassword.css';
import { useNavigate } from 'react-router-dom'

const SetPassword = ({ onBack, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    if (onSubmit) {
      onSubmit(password);
      navigate('/login');
    }
  };

  return (
    <div>
      <div className="set-password-form">
        <h2>Set your password</h2>

        <form onSubmit={handleSubmit}>
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

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='register-buttons'>

            <button type="submit" className="spf-signup-btn">SIGN UP</button>
            <button type="button" className="spf-login-btn" onClick={onBack}>BACK TO LOGIN</button>
          </div>
        </form>
      </div>

      <div className='right-container'>

      </div>
    </div>
  );
};


export default SetPassword;
