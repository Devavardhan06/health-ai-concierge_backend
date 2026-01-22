# 🏥 AI Healthcare Concierge - Frontend

> A modern, responsive React frontend for the AI Healthcare Concierge Platform. Built with healthcare compliance and user experience as core principles.

## 🎯 Overview

This is the frontend application for the AI Healthcare Concierge system - an intelligent healthcare assistant that provides:

- **AI-powered patient conversations** with safety escalation
- **Appointment booking system** with real-time availability
- **Admin dashboard** for monitoring and management
- **Compliance-focused design** for healthcare environments

## ✨ Features

### 🏠 **Landing Page**
- Professional healthcare branding
- Clear navigation to main features
- Responsive design for all devices

### 💬 **Chat Interface**
- Real-time AI conversations
- Safety escalation detection
- Clean, accessible chat UI
- Auto-scroll and typing indicators

### 📅 **Booking System**
- Date picker with validation
- Real-time slot availability
- Patient information collection
- Appointment confirmation

### 🔐 **Admin Dashboard**
- **Metrics**: System analytics and KPIs
- **Bookings**: Complete appointment management
- **Chats**: Conversation history and monitoring
- **Knowledge**: AI knowledge base management
- Secure authentication
- Responsive admin interface

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Plain CSS with healthcare-focused design
- **API**: Fetch API for backend communication
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite for fast development and building

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend server running on http://localhost:8000

### Installation

1. **Clone and navigate to frontend**
   ```bash
   cd health-ai-concierge_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatBubble.jsx  # Individual chat message
│   └── SlotPicker.jsx  # Time slot selection
├── pages/              # Main application pages
│   ├── Landing.jsx     # Home page
│   ├── Chat.jsx        # AI chat interface
│   ├── Booking.jsx     # Appointment booking
│   ├── AdminLogin.jsx  # Admin authentication
│   └── AdminDashboard.jsx # Admin management panel
├── services/           # API and external services
│   └── api.js         # Backend API client
├── styles/            # CSS styling
│   └── app.css        # Main stylesheet
├── App.jsx            # Main app component with routing
└── main.jsx           # React entry point
```

## 🔌 API Integration

The frontend connects to the FastAPI backend with these endpoints:

### **Chat API**
- `POST /chat` - Send message to AI
- `GET /chat` - Get conversation history

### **Booking API**
- `GET /booking/available-slots?appointment_date=YYYY-MM-DD`
- `POST /booking/schedule` - Create appointment

### **Auth API**
- `POST /auth/login` - Admin authentication

### **Admin API**
- `GET /admin/analytics` - System metrics
- `GET /admin/bookings` - All appointments
- `GET /admin/chats` - Chat history
- `GET /admin/knowledge` - Knowledge base

## 🎨 Design System

### **Colors**
- Primary: Healthcare blue (#007bff)
- Secondary: Professional gray (#6c757d)
- Background: Gradient purple (#667eea to #764ba2)
- Success: Green (#28a745)
- Warning: Yellow (#ffc107)
- Error: Red (#dc3545)

### **Typography**
- Font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- Headings: 600 weight, appropriate sizing
- Body: 400 weight, 1.4 line height

### **Components**
- Rounded corners (8px, 16px)
- Subtle shadows for depth
- Consistent spacing (8px grid)
- Accessible color contrast
- Mobile-first responsive design

## 🧪 Demo Mode

For testing without backend connection:

**Visit: http://localhost:3000/demo**

This provides:
- Full admin dashboard access
- Mock healthcare data
- All UI functionality
- No authentication required

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Adapted for tablets (768px+)
- **Desktop**: Full experience (1024px+)
- **Touch-friendly**: Large tap targets
- **Accessible**: WCAG 2.1 compliant

## 🔧 Configuration

### **Environment Variables**
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

### **Build Commands**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```

### **Deploy Options**
- **Netlify**: Drag & drop `dist` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload `dist` contents
- **Docker**: Use provided Dockerfile

## 🧑‍💻 Development

### **Code Style**
- ES6+ JavaScript
- Functional components with hooks
- Consistent naming conventions
- Clean, readable code structure

### **Best Practices**
- Component-based architecture
- Separation of concerns
- Error boundary handling
- Loading states
- Responsive design
- Accessibility compliance

## 🔒 Security

- **CORS**: Configured for localhost development
- **Input Validation**: Client-side validation
- **XSS Protection**: Proper data sanitization
- **Authentication**: JWT token storage
- **HTTPS**: Ready for production SSL

## 🐛 Troubleshooting

### **Common Issues**

**Backend Connection Error**
```
Solution: Ensure backend is running on http://localhost:8000
Check: CORS is enabled in backend
```

**Build Errors**
```
Solution: Delete node_modules and reinstall
npm rm -rf node_modules package-lock.json
npm install
```

**Styling Issues**
```
Solution: Clear browser cache
Check: CSS imports are correct
```

## 📞 Support

For issues or questions:
1. Check this README
2. Review backend connection
3. Check browser console for errors
4. Verify all dependencies are installed

## 🎯 Next Steps

1. **Connect to Production Backend**: Update API URL
2. **Add Authentication**: Implement proper login flow
3. **Enhanced Features**: Add more admin capabilities
4. **Testing**: Add unit and integration tests
5. **Performance**: Optimize for production

---

**Built with ❤️ for healthcare professionals**