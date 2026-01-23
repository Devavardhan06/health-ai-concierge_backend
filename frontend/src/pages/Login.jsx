import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate login success - save to localStorage
    setTimeout(() => {
      setIsLoading(false);
      // Save patient session to localStorage
      localStorage.setItem('patientSession', JSON.stringify({
        role: 'patient',
        email: email,
        loginTime: new Date().toISOString()
      }));
      navigate('/patient/dashboard');
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="login-container glass-panel animate-fade-in">
        <div className="login-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className='bx bx-arrow-back'></i> Back
          </button>
        </div>
        <h1 style={{ textAlign: 'center', marginBottom: '32px', marginTop: '-16px', fontSize: '1.75rem' }}>Patient Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="text-input"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="text-input"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/patient/register" className="link-primary">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
