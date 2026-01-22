import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import PaymentModal from '../components/PaymentModal';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    serviceType: '',
    providerId: '',
    date: '',
    slot: null,
    patientName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    insuranceProvider: '',
    insuranceMemberId: '',
    symptoms: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  // Mock Providers Data
  const providers = [
    { id: 'dr-smith', name: 'Dr. Sarah Smith', specialty: 'General Practice', image: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 4.9 },
    { id: 'dr-chen', name: 'Dr. Michael Chen', specialty: 'Cardiology', image: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 4.8 },
    { id: 'dr-wilson', name: 'Dr. Emily Wilson', specialty: 'Pediatrics', image: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 4.9 },
    { id: 'dr-patel', name: 'Dr. Raj Patel', specialty: 'Dermatology', image: 'https://randomuser.me/api/portraits/men/62.jpg', rating: 4.7 }
  ];

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setFormData(prev => ({ ...prev, date, slot: null }));
    setError('');

    if (date) {
      setIsLoading(true);
      try {
        const response = await apiService.getAvailableSlots(date);
        if (response.available_slots) {
          setAvailableSlots(response.available_slots);
        } else {
          setAvailableSlots([
            { id: '1', start: '09:00 AM', end: '09:30 AM' },
            { id: '2', start: '10:00 AM', end: '10:30 AM' },
            { id: '3', start: '11:30 AM', end: '12:00 PM' },
            { id: '4', start: '02:00 PM', end: '02:30 PM' },
          ]);
        }
      } catch (error) {
        console.error(error);
        setAvailableSlots([
          { id: '1', start: '09:00 AM', end: '09:30 AM' },
          { id: '2', start: '10:00 AM', end: '10:30 AM' },
          { id: '3', start: '11:30 AM', end: '12:00 PM' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSlotSelect = (slot) => {
    setFormData(prev => ({ ...prev, slot }));
  };

  const handleInitiatePayment = () => {
    // If insurance is provided, skip payment
    if (formData.insuranceProvider && formData.insuranceProvider !== 'none') {
      handleSubmit();
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    handleSubmit();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      await apiService.scheduleAppointment(formData.date, formData.slot.start, formData.patientName);
      setSuccess('Appointment confirmed successfully!');
    } catch (err) {
      setError(err.message || 'Booking failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
      {/* Connector Line */}
      <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border-color)', transform: 'translateY(-50%)', zIndex: 0 }}></div>

      {['Triage', 'Provider', 'Schedule', 'Details', 'Confirm'].map((label, idx) => {
        const stepNum = idx + 1;
        let isActive = step === stepNum;
        let isCompleted = step > stepNum;
        let color = isActive || isCompleted ? 'var(--primary)' : 'var(--text-muted)';
        let bgColor = isActive || isCompleted ? 'var(--primary)' : '#e2e8f0';

        return (
          <div key={label} style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'var(--bg-body)', padding: '0 10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: bgColor, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '14px', transition: 'all 0.3s'
            }}>
              {isCompleted ? <i className='bx bx-check'></i> : stepNum}
            </div>
            <span style={{ fontSize: '0.875rem', color: isActive ? 'var(--primary)' : 'var(--text-muted)', fontWeight: isActive ? '600' : '400' }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {showPayment && (
        <PaymentModal
          amount={150}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <div className="mb-8 text-center">
        <h2 className="mb-2">New Appointment</h2>
        <p className="text-muted">Follow the steps below to schedule your visit.</p>
      </div>

      {renderStepIndicator()}

      <div className="card">
        {success ? (
          <div className="text-center" style={{ padding: '40px 0' }}>
            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#16a34a' }}>
              <i className='bx bx-check' style={{ fontSize: '40px' }}></i>
            </div>
            <h2 className="mb-4">Booking Confirmed!</h2>
            <p className="text-muted mb-8" style={{ fontSize: '1.1rem' }}>
              Your appointment with {providers.find(p => p.id === formData.providerId)?.name} has been scheduled.
              <br />A confirmation email has been sent to {formData.email}.
            </p>
            <div className="flex-center" style={{ gap: '16px' }}>
              <button onClick={() => navigate('/')} className="btn btn-secondary">Return Home</button>
              <button onClick={() => navigate('/chat')} className="btn btn-primary">Go to Portal</button>
            </div>
          </div>
        ) : (
          <>
            {/* Step 1: Service Type */}
            {step === 1 && (
              <div>
                <h3 className="mb-4">What brings you in today?</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {['General Consultation', 'Specialist Referral', 'Annual Physical', 'Vaccination', 'Urgent Care', 'Follow-up'].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, serviceType: type }));
                        nextStep();
                      }}
                      style={{
                        padding: '24px',
                        border: `1px solid ${formData.serviceType === type ? 'var(--primary)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        background: formData.serviceType === type ? 'var(--primary-light)' : 'white',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                      className="hover:shadow-sm"
                    >
                      <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '1.1rem' }}>{type}</div>
                      <div className="text-muted" style={{ fontSize: '0.875rem' }}>Select this if you need a {type.toLowerCase()}.</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Provider Selection */}
            {step === 2 && (
              <div>
                <h3 className="mb-4">Choose a Provider</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {providers.map(provider => (
                    <div
                      key={provider.id}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, providerId: provider.id }));
                        nextStep();
                      }}
                      style={{
                        display: 'flex', gap: '16px', padding: '20px',
                        border: `1px solid ${formData.providerId === provider.id ? 'var(--primary)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-md)',
                        background: formData.providerId === provider.id ? 'var(--primary-light)' : 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={provider.image} alt={provider.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{provider.name}</h4>
                        <p className="text-primary mb-1" style={{ fontSize: '0.9rem' }}>{provider.specialty}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#f59e0b' }}>
                          <i className='bx bxs-star'></i> {provider.rating} (120+ reviews)
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={prevStep} className="btn btn-secondary">Back</button>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div>
                <h3 className="mb-4">Select a Time</h3>
                <div style={{ maxWidth: '300px', marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {isLoading && <div className="text-center text-muted p-4">Loading slots...</div>}

                {!isLoading && formData.date && (
                  <div className="mb-8">
                    <label style={{ display: 'block', marginBottom: '16px', fontWeight: '500' }}>Available Slots</label>
                    {availableSlots.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        {availableSlots.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot)}
                            style={{
                              padding: '12px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-color)',
                              background: formData.slot?.id === slot.id ? 'var(--primary)' : 'white',
                              color: formData.slot?.id === slot.id ? 'white' : 'var(--text-main)',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            {slot.start}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No slots available for this date.</p>
                    )}
                  </div>
                )}

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={prevStep} className="btn btn-secondary">Back</button>
                  <button
                    onClick={nextStep}
                    className="btn btn-primary"
                    disabled={!formData.date || !formData.slot}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Patient Details */}
            {step === 4 && (
              <div>
                <h3 className="mb-6">Patient Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={e => setFormData(pre => ({ ...pre, patientName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={e => setFormData(pre => ({ ...pre, dob: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(pre => ({ ...pre, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData(pre => ({ ...pre, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Insurance Provider</label>
                    <select
                      value={formData.insuranceProvider}
                      onChange={e => setFormData(pre => ({ ...pre, insuranceProvider: e.target.value }))}
                    >
                      <option value="">Select Provider</option>
                      <option value="bluecross">Blue Cross Blue Shield</option>
                      <option value="aetna">Aetna</option>
                      <option value="united">UnitedHealthcare</option>
                      <option value="cigna">Cigna</option>
                      <option value="medicare">Medicare</option>
                      <option value="none">Self Pay</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Member ID</label>
                    <input
                      type="text"
                      value={formData.insuranceMemberId}
                      onChange={e => setFormData(pre => ({ ...pre, insuranceMemberId: e.target.value }))}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Reason for Visit / Symptoms</label>
                    <textarea
                      rows="3"
                      value={formData.symptoms}
                      onChange={e => setFormData(pre => ({ ...pre, symptoms: e.target.value }))}
                    ></textarea>
                  </div>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={prevStep} className="btn btn-secondary">Back</button>
                  <button
                    onClick={nextStep}
                    className="btn btn-primary"
                    disabled={!formData.patientName || !formData.email || !formData.phone}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div>
                <h3 className="mb-6">Review & Confirm</h3>

                <div style={{ background: 'var(--bg-body)', padding: '24px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifySelf: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', justifyContent: 'space-between' }}>
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Service</div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{formData.serviceType}</div>
                    </div>
                    <button onClick={() => setStep(1)} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                  </div>

                  <div style={{ display: 'flex', justifySelf: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', justifyContent: 'space-between' }}>
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Provider</div>
                      <div style={{ fontWeight: '600' }}>{providers.find(p => p.id === formData.providerId)?.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.9rem' }}>{providers.find(p => p.id === formData.providerId)?.specialty}</div>
                    </div>
                    <button onClick={() => setStep(2)} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                  </div>

                  <div style={{ display: 'flex', justifySelf: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', justifyContent: 'space-between' }}>
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Date & Time</div>
                      <div style={{ fontWeight: '600' }}>{formData.date} at {formData.slot?.start}</div>
                    </div>
                    <button onClick={() => setStep(3)} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                  </div>

                  <div style={{ display: 'flex', justifySelf: 'space-between', justifyContent: 'space-between' }}>
                    <div>
                      <div className="text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Patient</div>
                      <div style={{ fontWeight: '600' }}>{formData.patientName}</div>
                      <div className="text-muted" style={{ fontSize: '0.9rem' }}>{formData.email} • {formData.phone}</div>
                    </div>
                    <button onClick={() => setStep(4)} className="text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Edit Details</button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#fffbeb', color: '#92400e', borderRadius: 'var(--radius-md)', marginBottom: '32px', fontSize: '0.9rem' }}>
                  <i className='bx bx-info-circle' style={{ fontSize: '1.2rem' }}></i>
                  <p style={{ margin: 0 }}>
                    By clicking Confirm, you agree to our cancellation policy (24h notice required).
                    Your card will not be charged until the time of service.
                  </p>
                </div>

                {error && <div style={{ marginBottom: '24px', padding: '16px', background: '#fef2f2', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>{error}</div>}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={prevStep} className="btn btn-secondary">Back</button>
                  <button
                    onClick={handleInitiatePayment}
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : (formData.insuranceProvider && formData.insuranceProvider !== 'none' ? 'Confirm Booking' : 'Proceed to Payment')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;