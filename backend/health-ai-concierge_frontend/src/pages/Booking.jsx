import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotPicker from '../components/SlotPicker';
import apiService from '../services/api';

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const navigate = useNavigate();

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedSlot(null);
    setAvailableSlots([]);
    setError('');

    if (date) {
      setIsLoading(true);
      try {
        const response = await apiService.getAvailableSlots(date);
        if (response.available_slots) {
          setAvailableSlots(response.available_slots);
        } else if (response.message) {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch available slots');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !patientName.trim()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert slot time to proper format for API
      const appointmentTime = convertTimeFormat(selectedSlot.start);
      
      const response = await apiService.scheduleAppointment(
        selectedDate,
        appointmentTime,
        patientName.trim()
      );

      setSuccess(response.message || 'Appointment booked successfully!');
      
      // Check if payment URL is returned
      if (response.payment_url) {
        setPaymentUrl(response.payment_url);
      }

      // Reset form
      setSelectedDate('');
      setAvailableSlots([]);
      setSelectedSlot(null);
      setPatientName('');
      
    } catch (error) {
      setError(error.message || 'Failed to book appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const convertTimeFormat = (timeStr) => {
    // Convert "10:00 AM" to "10:00:00"
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    return `${hour24.toString().padStart(2, '0')}:${minutes}:00`;
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1>Book Appointment</h1>
      </div>

      <div className="booking-container">
        <form className="booking-form" onSubmit={handleBooking}>
          <div className="form-group">
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={getTodayDate()}
              className="date-input"
              required
            />
          </div>

          {isLoading && selectedDate && (
            <div className="loading">Loading available slots...</div>
          )}

          {availableSlots.length > 0 && (
            <SlotPicker
              slots={availableSlots}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />
          )}

          {selectedSlot && (
            <div className="form-group">
              <label htmlFor="patientName">Patient Name:</label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter your full name"
                className="text-input"
                required
              />
            </div>
          )}

          {selectedSlot && patientName && (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Booking...' : 'Book Appointment'}
            </button>
          )}
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
            {paymentUrl && (
              <div className="payment-section">
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Proceed to Payment
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;