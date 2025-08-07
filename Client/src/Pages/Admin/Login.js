import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyles.css'; // instead of AdminStyles.css

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard'); 
      } else {
        setErrorMsg(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default Login;
