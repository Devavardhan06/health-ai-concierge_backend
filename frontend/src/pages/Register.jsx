import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate registration success - save to localStorage
    setTimeout(() => {
      setIsLoading(false);
      // Save registration data to localStorage
      localStorage.setItem('patientProfile', JSON.stringify({
        name: formData.name,
        email: formData.email,
        registrationTime: new Date().toISOString()
      }));
      setSuccessMessage('Account created successfully! Redirecting to login...');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/patient/login');
      }, 2000);
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
        <h1 style={{ textAlign: 'center', marginBottom: '32px', marginTop: '-16px', fontSize: '1.75rem' }}>Create Account</h1>

        {successMessage && (
          <div className="success-message">
            <i className='bx bx-check-circle'></i> {successMessage}
          </div>
        )}

        {!successMessage && (
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="text-input"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 6 characters)"
                className="text-input"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="text-input"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>Already have an account? <Link to="/patient/login" className="link-primary">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
