import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Booking from './pages/Booking';
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
          <Route path="/chat" element={<Chat />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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