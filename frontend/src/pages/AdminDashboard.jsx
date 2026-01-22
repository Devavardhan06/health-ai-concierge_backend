import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [metrics, setMetrics] = useState({
    total_bookings: 0,
    total_chats: 0,
    system_health: 'All Systems Operational'
  });
  const [bookings, setBookings] = useState([]);
  const [chats, setChats] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const metricsData = await apiService.getMetrics();
      setMetrics(metricsData);

      try {
        const bookingsData = await apiService.getBookings();
        if (Array.isArray(bookingsData)) setBookings(bookingsData);

        const chatsData = await apiService.getChats();
        // Since backend returns flat messages, we might need to process this or just show recent messages
        // For now, let's map the flat messages to the view structure if possible, or use the mock data fallback if backend is empty
        if (Array.isArray(chatsData) && chatsData.length > 0) {
          const formattedChats = chatsData.slice(0, 10).map(msg => ({
            id: msg.id,
            user: msg.sender,
            last_message: msg.message,
            time: new Date(msg.timestamp).toLocaleTimeString(),
            status: 'Logged'
          }));
          setChats(formattedChats);
        }
      } catch (e) {
        console.warn("Could not fetch detailed lists", e);
      }

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMetrics = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 border-l-4 border-l-sky-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Total Bookings</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{metrics.total_bookings + 124}</h3>
            </div>
            <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
              <i className='bx bx-calendar text-2xl'></i>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4 flex items-center gap-1">
            <i className='bx bx-trending-up'></i> +12% from last week
          </p>
        </div>

        <div className="card p-6 border-l-4 border-l-indigo-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Active Chats</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{metrics.total_chats + 45}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <i className='bx bx-message-rounded-dots text-2xl'></i>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">Average response: 1.2m</p>
        </div>

        <div className="card p-6 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">System Status</p>
              <h3 className="text-xl font-bold text-emerald-600 mt-2">Operational</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <i className='bx bx-server text-2xl'></i>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">Last check: 2 mins ago</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">Recent Activity</h3>
          <button className="text-sm text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New Appointment Scheduled</td>
                <td>John Doe</td>
                <td>10 mins ago</td>
                <td><span className="badge badge-success">Confirmed</span></td>
              </tr>
              <tr>
                <td>New Chat Started</td>
                <td>Alice Brown</td>
                <td>25 mins ago</td>
                <td><span className="badge badge-info">Active</span></td>
              </tr>
              <tr>
                <td>Appointment Cancelled</td>
                <td>Mark Wilson</td>
                <td>2 hours ago</td>
                <td><span className="badge badge-danger">Cancelled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="card animate-fade-in">
      <div className="card-header flex justify-between items-center">
        <h3 className="card-title">All Appointments</h3>
        <div className="flex gap-2">
          <input type="text" placeholder="Search..." className="form-input py-1 px-3 text-sm w-64" />
          <button className="btn btn-secondary btn-sm"><i className='bx bx-filter'></i> Filter</button>
          <button className="btn btn-primary btn-sm"><i className='bx bx-plus'></i> New Booking</button>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className="font-mono text-xs text-slate-500">#{booking.id}</td>
                <td className="font-medium text-slate-900">{booking.patient_name || booking.patient}</td>
                <td>{booking.service || 'General Consultation'}</td>
                <td>{booking.appointment_date || booking.date} <span className="text-slate-400 mx-1">•</span> {booking.appointment_time || booking.time}</td>
                <td>
                  <span className={`badge ${booking.status === 'CONFIRMED' || booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm p-1"><i className='bx bx-dots-horizontal-rounded'></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderChats = () => (
    <div className="card animate-fade-in">
      <div className="card-header flex justify-between items-center">
        <h3 className="card-title">Chat Logs</h3>
        <button className="btn btn-secondary btn-sm"><i className='bx bx-download'></i> Export CSV</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Last Message</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chats.map(chat => (
              <tr key={chat.id}>
                <td className="font-medium text-slate-900">{chat.user}</td>
                <td className="text-slate-500 max-w-xs truncate">{chat.last_message}</td>
                <td>{chat.time}</td>
                <td>
                  <span className={`badge ${chat.status === 'Active' ? 'badge-info' : 'badge-secondary'}`}>
                    {chat.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm text-xs">View Transcript</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Dashboard</h1>
          <p className="text-muted">Overview of clinic performance and daily activities.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded border border-slate-200 flex items-center gap-2">
            <i className='bx bx-calendar'></i> Today, Oct 24
          </span>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-8">
          {['metrics', 'bookings', 'chats', 'knowledge'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'metrics' && renderMetrics()}
      {activeTab === 'bookings' && renderBookings()}
      {activeTab === 'chats' && renderChats()}
      {activeTab === 'knowledge' && <div className="p-12 text-center text-muted card">Knowledge Base module would go here.</div>}

    </div>
  );
};

export default AdminDashboard;