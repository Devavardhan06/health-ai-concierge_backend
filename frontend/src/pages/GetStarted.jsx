import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '500px',
        animation: 'fadeIn 0.6s ease-in'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <i className='bx bxs-capsule' style={{ 
            fontSize: '4rem', 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}></i>
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          marginBottom: '16px',
          color: 'var(--text-main)',
          letterSpacing: '-0.025em'
        }}>
          Welcome to MediAI
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          AI-powered healthcare concierge platform
        </p>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          marginBottom: '32px'
        }}>
          {/* Continue as Patient */}
          <button
            onClick={() => navigate('/patient/login')}
            style={{
              padding: '16px 32px',
              fontSize: '1.125rem',
              fontWeight: '600',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
          >
            <i className='bx bx-user'></i>
            Continue as Patient
          </button>

          {/* Find Providers */}
          <button
            onClick={() => navigate('/doctors')}
            style={{
              padding: '16px 32px',
              fontSize: '1.125rem',
              fontWeight: '600',
              background: 'white',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.color = 'var(--primary)';
              e.target.style.background = 'var(--primary-light)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.color = 'var(--text-main)';
              e.target.style.background = 'white';
            }}
          >
            <i className='bx bx-search-alt'></i>
            Find Providers
          </button>

          {/* Admin Login */}
          <button
            onClick={() => navigate('/admin/login')}
            style={{
              padding: '16px 32px',
              fontSize: '1.125rem',
              fontWeight: '600',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--primary)';
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.background = 'var(--primary-light)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--text-muted)';
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.background = 'transparent';
            }}
          >
            <i className='bx bx-lock-alt'></i>
            Admin Login
          </button>
        </div>

        {/* Footer Text */}
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--text-light)',
          marginTop: '32px'
        }}>
          Or go to <button 
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              padding: 0,
              font: 'inherit'
            }}
          >
            homepage
          </button>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
