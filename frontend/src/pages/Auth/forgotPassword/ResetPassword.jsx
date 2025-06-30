import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import '../../../css/Auth/ResetPassword.css';

const ResetPassword = () => {
  const { resetPassword, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    const res = await resetPassword(email);
    if (res) setSuccess(true);
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-box">
        <h2>Reset your password</h2>
        <p>Type in your registered email address to reset password</p>

        <input
          type="email"
          placeholder="Email Address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button onClick={handleReset} className="next-btn">
          NEXT <span className="arrow">→</span>
        </button>

        <button className="back-btn" onClick={() => navigate('/login')}>
          BACK TO LOGIN
        </button>

        {success && <p style={{ color: 'green' }}>Reset email sent ✅</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
