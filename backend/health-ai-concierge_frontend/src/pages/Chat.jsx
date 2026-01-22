import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import apiService from '../services/api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await apiService.getChatHistory();
      setMessages(history || []);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setError('Failed to load chat history');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      // The backend returns an array with [userMessage, aiMessage]
      const response = await apiService.sendMessage(inputMessage.trim());
      
      if (Array.isArray(response)) {
        // Add both messages to the chat
        setMessages(prev => [...prev, ...response]);
      } else {
        // Fallback if response format is different
        setMessages(prev => [...prev, response]);
      }
      
      setInputMessage('');
    } catch (error) {
      setError(error.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1>AI Healthcare Concierge</h1>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && !isLoading && (
            <div className="welcome-message">
              <p>Welcome! I'm your AI Healthcare Concierge. How can I help you today?</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your health question..."
              className="chat-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!inputMessage.trim() || isLoading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;