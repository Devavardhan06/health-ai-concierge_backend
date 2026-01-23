import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Doctors from './pages/Doctors';
import Layout from './components/Layout';
import './styles/app.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient/login" element={<Login />} />
          <Route path="/patient/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/portal/dashboard" element={<PatientDashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          {/* Temporary direct access for demo */}
          <Route path="/demo" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;