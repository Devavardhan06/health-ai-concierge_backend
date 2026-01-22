import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">AI Healthcare Concierge</h1>
          <p className="landing-subtitle">
            Your intelligent healthcare assistant for consultations and appointments
          </p>
          
          <div className="landing-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/chat')}
            >
              Chat with Assistant
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/booking')}
            >
              Book Appointment
            </button>
          </div>
          
          <div className="admin-link">
            <button 
              className="btn btn-link"
              onClick={() => navigate('/admin/login')}
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;