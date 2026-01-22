import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [data, setData] = useState({
    metrics: [],
    bookings: [],
    chats: [],
    knowledge: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // TEMPORARY: Skip authentication check for demo
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   navigate('/admin/login');
    //   return;
    // }

    loadData(activeTab);
  }, [activeTab, navigate]);

  const loadData = async (tab) => {
    setIsLoading(true);
    setError('');

    try {
      let response;
      
      // Try to get real data from backend, but fallback to mock data
      try {
        switch (tab) {
          case 'metrics':
            response = await apiService.getAnalytics();
            break;
          case 'bookings':
            response = await apiService.getBookings();
            break;
          case 'chats':
            response = await apiService.getChats();
            break;
          case 'knowledge':
            response = await apiService.getKnowledge();
            break;
          default:
            response = [];
        }
      } catch (apiError) {
        // If backend fails, use mock data for demo
        response = getMockData(tab);
        setError(`Using demo data (Backend: ${apiError.message})`);
      }

      setData(prev => ({
        ...prev,
        [tab]: response || []
      }));
    } catch (error) {
      setError(error.message || `Failed to load ${tab}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for demo purposes
  const getMockData = (tab) => {
    switch (tab) {
      case 'metrics':
        return [
          {
            event_type: "Chat Interactions",
            details: "Total conversations: 45",
            created_at: new Date().toISOString()
          },
          {
            event_type: "Booking Requests",
            details: "Appointments scheduled: 12",
            created_at: new Date().toISOString()
          },
          {
            event_type: "Safety Escalations",
            details: "Cases escalated to staff: 3",
            created_at: new Date().toISOString()
          },
          {
            event_type: "Payment Success",
            details: "Successful payments: 8",
            created_at: new Date().toISOString()
          }
        ];
      
      case 'bookings':
        return [
          {
            id: 1,
            patient_name: "John Smith",
            appointment_date: "2026-01-05",
            appointment_time: "10:00:00",
            status: "SCHEDULED"
          },
          {
            id: 2,
            patient_name: "Sarah Johnson",
            appointment_date: "2026-01-05",
            appointment_time: "14:30:00",
            status: "CONFIRMED"
          },
          {
            id: 3,
            patient_name: "Mike Wilson",
            appointment_date: "2026-01-06",
            appointment_time: "09:00:00",
            status: "PENDING"
          },
          {
            id: 4,
            patient_name: "Emily Davis",
            appointment_date: "2026-01-04",
            appointment_time: "16:00:00",
            status: "CANCELLED"
          }
        ];
      
      case 'chats':
        return [
          {
            id: 1,
            sender: "user",
            message: "I have a headache and fever. What should I do?",
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 2,
            sender: "concierge",
            message: "I understand you're experiencing headache and fever. For your safety, a staff member will contact you shortly to provide proper medical guidance.",
            timestamp: new Date(Date.now() - 3500000).toISOString()
          },
          {
            id: 3,
            sender: "user",
            message: "I'd like to book an appointment for a routine checkup.",
            timestamp: new Date(Date.now() - 1800000).toISOString()
          },
          {
            id: 4,
            sender: "concierge",
            message: "I'd be happy to help you book a routine checkup appointment. Let me show you our available time slots.",
            timestamp: new Date(Date.now() - 1700000).toISOString()
          }
        ];
      
      case 'knowledge':
        return [
          {
            title: "Clinic Operating Hours",
            content: "Monday-Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM, Sunday: Closed"
          },
          {
            title: "Emergency Procedures",
            content: "For medical emergencies, patients should call 911 immediately. Non-emergency urgent care is available during business hours."
          },
          {
            title: "Appointment Policies",
            content: "Appointments can be cancelled up to 24 hours in advance. Late cancellations may incur a fee."
          },
          {
            title: "Payment Information",
            content: "We accept all major insurance plans, credit cards, and cash payments. Payment is due at time of service."
          }
        ];
      
      default:
        return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderMetrics = () => (
    <div className="metrics-section">
      <h2>Analytics</h2>
      {data.metrics.length === 0 ? (
        <p>No analytics data available</p>
      ) : (
        <div className="metrics-grid">
          {data.metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <h3>{metric.event_type}</h3>
              <p>{metric.details}</p>
              <span className="metric-date">
                {new Date(metric.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBookings = () => (
    <div className="bookings-section">
      <h2>Bookings</h2>
      {data.bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.patient_name}</td>
                  <td>{booking.appointment_date}</td>
                  <td>{booking.appointment_time}</td>
                  <td>
                    <span className={`status ${booking.status?.toLowerCase()}`}>
                      {booking.status || 'SCHEDULED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderChats = () => (
    <div className="chats-section">
      <h2>Chat History</h2>
      {data.chats.length === 0 ? (
        <p>No chat messages found</p>
      ) : (
        <div className="chat-list">
          {data.chats.map((chat) => (
            <div key={chat.id} className={`chat-item ${chat.sender}`}>
              <div className="chat-header">
                <span className="sender">{chat.sender}</span>
                <span className="timestamp">
                  {new Date(chat.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="chat-message">{chat.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderKnowledge = () => (
    <div className="knowledge-section">
      <h2>Knowledge Base</h2>
      {data.knowledge.length === 0 ? (
        <p>No knowledge base data available</p>
      ) : (
        <div className="knowledge-list">
          {data.knowledge.map((item, index) => (
            <div key={index} className="knowledge-item">
              <h3>{item.title || `Item ${index + 1}`}</h3>
              <p>{item.content || JSON.stringify(item)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          Metrics
        </button>
        <button
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button
          className={`tab-btn ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          Chats
        </button>
        <button
          className={`tab-btn ${activeTab === 'knowledge' ? 'active' : ''}`}
          onClick={() => setActiveTab('knowledge')}
        >
          Knowledge
        </button>
      </div>

      <div className="dashboard-content">
        {isLoading && <div className="loading">Loading...</div>}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            {activeTab === 'metrics' && renderMetrics()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'chats' && renderChats()}
            {activeTab === 'knowledge' && renderKnowledge()}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;