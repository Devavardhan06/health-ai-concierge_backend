import { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/ChatBubble';
import apiService from '../services/api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeThread, setActiveThread] = useState('new');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mock Threads
  const threads = [
    { id: 'new', name: 'New Symptom Check', time: 'Now', preview: 'Started triage...' },
    { id: '1', name: 'Dr. Smith Follow-up', time: '2d ago', preview: 'Appointment confirmed.' },
    { id: '2', name: 'Billing Question', time: '1w ago', preview: 'Invoice #402 paid.' },
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Initial welcome message
    setMessages([
      { text: "Hello, I'm your AI Medical Assistant. How can I verify your health today?", type: 'assistant' }
    ]);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage = { text: inputMessage, type: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await apiService.sendMessage(inputMessage);
      // Backend returns [UserMsg, AiMsg]
      const aiResponse = response[response.length - 1];

      if (aiResponse) {
        const newBotMessage = {
          text: aiResponse.message,
          type: 'assistant',
          isEscalation: aiResponse.message.toLowerCase().includes('escalat')
        };
        setMessages(prev => [...prev, newBotMessage]);
        speakText(aiResponse.message); // Speak AI response
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble connecting right now. Please try again or call our support line.",
        type: 'assistant',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsLoading(true);
      recognition.onend = () => setIsLoading(false);
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setInputMessage(prev => prev + ' ' + text);
      };
      recognition.start();
    } else {
      alert('Voice input not supported in this browser.');
    }
  };

  const handleFileUpload = () => {
    // Simulate file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,.pdf';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMessages(prev => [...prev, {
          text: `[Attachment: ${file.name}]`,
          type: 'user'
        }]);
        // Simulate AI analysis of file
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: `I've analyzed the uploaded file (${file.name}). It appears to be a clinical report. I've noted the values.`,
            type: 'assistant',
            confidence: 0.95,
            reasoning: "Vision model detected standard lab report format."
          }]);
        }, 1500);
      }
    };
    fileInput.click();
  };

  return (
    <div className="chat-container">
      {/* Left Column: Threads */}
      <div className="chat-sidebar">
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Conversations</h3>
          <button className="btn-ghost" style={{ padding: '8px', borderRadius: '50%' }}><i className='bx bx-edit'></i></button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {threads.map(thread => (
            <div
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                background: activeThread === thread.id ? 'var(--primary-light)' : 'transparent',
                borderLeft: activeThread === thread.id ? '4px solid var(--primary)' : '4px solid transparent',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: activeThread === thread.id ? '600' : '500', color: activeThread === thread.id ? 'var(--primary)' : 'var(--text-main)' }}>{thread.name}</span>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>{thread.time}</span>
              </div>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{thread.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <i className='bx bx-bot' style={{ fontSize: '20px' }}></i>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>AI Medical Assistant</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Online
              </p>
            </div>
          </div>
          <button className="btn-ghost"><i className='bx bx-dots-vertical-rounded'></i></button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="chat-bubble assistant">
              <div className="bubble-content" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '16px' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'bounce 1s infinite 0.1s' }}></div>
                <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <form onSubmit={handleSendMessage}>
            <div className="chat-input-wrapper">
              <button
                type="button"
                className="btn-ghost"
                style={{ padding: '8px' }}
                onClick={handleFileUpload}
                title="Upload Image/PDF"
              >
                <i className='bx bx-paperclip'></i>
              </button>
              <button
                type="button"
                className="btn-ghost"
                style={{ padding: '8px' }}
                onClick={startVoiceInput}
                title="Voice Input"
              >
                <i className='bx bx-microphone'></i>
              </button>
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Describe your symptoms..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                style={{
                  background: !inputMessage.trim() || isLoading ? '#e2e8f0' : 'var(--primary)',
                  color: !inputMessage.trim() || isLoading ? '#94a3b8' : 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: !inputMessage.trim() || isLoading ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                disabled={!inputMessage.trim() || isLoading}
              >
                <i className='bx bx-send' style={{ fontSize: '20px' }}></i>
              </button>
            </div>
          </form>
          <div className="text-center mt-2">
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              AI can make mistakes. For medical emergencies, call 911 immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;