import { useNavigate } from 'react-router-dom';
import HeroChatWidget from '../components/HeroChatWidget';
import LiveMetricsTicker from '../components/LiveMetricsTicker';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 1. HERO SECTION: Live AI Triage */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '40px' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Left Content */}
            <div className="hero-content">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '32px' }}>
                <span style={{ display: 'flex', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
                🚀 Now Live in Bengaluru
              </div>
              <h1 className="mb-4">
                Healthcare that <br />
                <span className="text-gradient">Understands</span> You.
              </h1>
              <p className="mb-8" style={{ fontSize: '1.25rem', maxWidth: '540px' }}>
                Instant AI triage, smart doctor matching, and 24/7 care coordination. Experience the future of medical assistance today.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate('/booking')}>
                  Find a Doctor
                </button>
                <button className="btn btn-ghost btn-lg">
                  <i className='bx bx-play-circle'></i> Watch Demo
                </button>
              </div>

              <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex' }}>
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white' }} />
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: '-12px' }} />
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: '-12px' }} />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>10,000+</strong> patients trusted us this month.
                </div>
              </div>
            </div>

            {/* Right: Interactive AI Widget */}
            <div className="hero-visual flex-center" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }}></div>
              <HeroChatWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE SYSTEM METRICS */}
      <section className="section bg-light" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <LiveMetricsTicker />
      </section>

      {/* 3. SECURITY & COMPLIANCE (New Section) */}
      <section className="section bg-white">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', background: 'linear-gradient(to right, #f8fafc, #fff)' }}>
            <div>
              <h3 style={{ marginBottom: '16px' }}>Enterprise-Grade Security</h3>
              <p className="text-muted" style={{ maxWidth: '500px', margin: 0 }}>
                Your health data is sensitive. We treat it with the highest level of protection, exceeding industry standards with end-to-end encryption.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '48px' }}>
              <div style={{ textAlign: 'center' }}>
                <i className='bx bx-shield-quarter' style={{ fontSize: '48px', color: '#334155' }}></i>
                <div style={{ fontWeight: '700', marginTop: '12px', fontSize: '1.1rem' }}>HIPAA Ready</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <i className='bx bx-lock' style={{ fontSize: '48px', color: '#334155' }}></i>
                <div style={{ fontWeight: '700', marginTop: '12px', fontSize: '1.1rem' }}>AES-256</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <i className='bx bx-server' style={{ fontSize: '48px', color: '#334155' }}></i>
                <div style={{ fontWeight: '700', marginTop: '12px', fontSize: '1.1rem' }}>SOC2 Type II</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES GRID SECTION */}
      <section id="services" className="section section-bg">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 80px' }}>
            <h2 className="mb-4">Complete Care Coordination</h2>
            <p>From the first symptom to full recovery, our platform manages every step of your healthcare journey.</p>
          </div>

          <div className="grid-3">
            {/* Card 1 */}
            <div className="card hover:scale-105 transition duration-300">
              <div style={{ width: '64px', height: '64px', background: 'var(--primary-light)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'var(--primary)', marginBottom: '24px' }}>
                <i className='bx bx-pulse'></i>
              </div>
              <h3>AI Symptom Triage</h3>
              <p>Not sure if it's serious? Our advanced AI analyzes 5,000+ conditions to give you instant guidance.</p>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className='bx bxs-check-shield text-primary'></i> Clinical Protocols
              </div>
            </div>

            {/* Card 2 */}
            <div className="card">
              <div style={{ width: '64px', height: '64px', background: '#eef2ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#4f46e5', marginBottom: '24px' }}>
                <i className='bx bx-calendar-event'></i>
              </div>
              <h3>Smart Scheduling</h3>
              <p>Book appointments in real-time. We sync directly with hospital calendars to find slots anywhere.</p>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className='bx bxs-map text-primary'></i> Geo-Spatial Search
              </div>
            </div>

            {/* Card 3 */}
            <div className="card">
              <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#16a34a', marginBottom: '24px' }}>
                <i className='bx bx-shield-quarter'></i>
              </div>
              <h3>Unified Records</h3>
              <p>All your history, labs, and prescriptions in one secure place. Share easily with any provider.</p>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className='bx bxs-lock text-primary'></i> End-to-End Encrypted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FLOW */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-8">Intelligent Care Flow</h2>
          <div className="grid-3">
            <div className="text-center">
              <div className="step-number" style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontWeight: 'bold', fontSize: '1.25rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>1</div>
              <h4 className="mb-4">Describe Symptoms</h4>
              <p>Type "I have a migraine" or "My child has a fever". Our AI understands medical context and urgency immediately.</p>
            </div>
            <div className="text-center">
              <div className="step-number" style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontWeight: 'bold', fontSize: '1.25rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>2</div>
              <h4 className="mb-4">Live Doctor Match</h4>
              <p>We instantly scan availability of 50+ facilities to find a specialist who accepts your insurance nearby.</p>
            </div>
            <div className="text-center">
              <div className="step-number" style={{ width: '48px', height: '48px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontWeight: 'bold', fontSize: '1.25rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>3</div>
              <h4 className="mb-4">Instant Booking</h4>
              <p>Secure the slot with one click. Receive digital prescriptions and AI follow-ups automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="section bg-light" style={{ padding: '120px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center">
          <h2 className="mb-4">Ready to simplify your healthcare?</h2>
          <p className="mb-8" style={{ fontSize: '1.25rem' }}>Join the platform trusted by healthcare leaders and patients alike.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/booking')}>Get Your Account Now</button>
          <p className="text-muted mt-4" style={{ fontSize: '0.875rem' }}>No credit card required for basic account creation.</p>
        </div>
      </section>

    </div>
  );
};

export default Landing;