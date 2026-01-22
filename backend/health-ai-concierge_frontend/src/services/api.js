const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      
      // Provide more helpful error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the backend at http://localhost:8000');
      }
      
      throw error;
    }
  }

  // Chat API - EXACT endpoints from backend
  async sendMessage(message) {
    return this.request('/chat', {
      method: 'POST',
      body: { message }
    });
  }

  async getChatHistory() {
    return this.request('/chat');
  }

  // Booking API - EXACT endpoints from backend
  async getAvailableSlots(appointmentDate) {
    const params = new URLSearchParams({ appointment_date: appointmentDate });
    return this.request(`/booking/available-slots?${params}`);
  }

  async scheduleAppointment(appointmentDate, appointmentTime, patientName) {
    const params = new URLSearchParams({
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      patient_name: patientName
    });
    return this.request(`/booking/schedule?${params}`, {
      method: 'POST'
    });
  }

  // Auth API - EXACT endpoints from backend
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  }

  // Admin APIs - EXACT endpoints from backend
  async getAnalytics() {
    return this.request('/admin/analytics');
  }

  async getBookings() {
    return this.request('/admin/bookings');
  }

  async getChats() {
    return this.request('/admin/chats');
  }

  async getKnowledge() {
    return this.request('/admin/knowledge');
  }
}

export default new ApiService();