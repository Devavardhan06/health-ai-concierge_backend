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

  // Chat API
  async sendMessage(message) {
    return this.request('/chat', {
      method: 'POST',
      body: { message }
    });
  }

  async getChatHistory() {
    return this.request('/chat');
  }

  async uploadFile(file, message = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (message) formData.append('message', message);

    // Custom fetch for multipart to avoid Content-Type header conflict
    const token = localStorage.getItem('token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const response = await fetch(`${this.baseURL}/chat/upload`, {
      method: 'POST',
      body: formData,
      headers
    });

    return await response.json();
  }

  // Booking API
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

  // Auth API
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  }

  // Admin APIs
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

  async getMetrics() {
    return this.request('/admin/metrics');
  }

  // Phase 1: Live Features
  async getSystemMetrics() {
    return this.request('/metrics/system');
  }

  async sendTriageMessage(symptom) {
    return this.request('/triage/chat', {
      method: 'POST',
      body: { symptom }
    });
  }

  // Phase 2: Core Features
  async getPatientDashboard() {
    return this.request('/patient/dashboard');
  }

  async getDoctors() {
    return this.request('/doctors');
  }
}

export default new ApiService();