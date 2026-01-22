import { useState } from 'react';

const ChatBubble = ({ message }) => {
  const isUser = message.type === 'user';
  const isEscalated = message.isEscalation;
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="bubble-content">
        <p style={{ margin: 0 }}>{message.text}</p>

        {/* Escalation Warning */}
        {isEscalated && !isUser && (
          <div style={{ marginTop: '8px', padding: '8px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fee2e2', color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className='bx bx-error-circle'></i>
            Case escalated to human staff.
          </div>
        )}

        {/* AI Confidence & Reasoning */}
        {!isUser && message.confidence && (
          <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: message.confidence > 0.8 ? '#16a34a' : '#d97706' }}>
                <i className={`bx ${message.confidence > 0.8 ? 'bxs-check-shield' : 'bx-error'}`}></i>
                {Math.round(message.confidence * 100)}% Confidence
              </div>
              {message.reasoning && (
                <button
                  onClick={() => setShowReasoning(!showReasoning)}
                  className="btn-ghost"
                  style={{ padding: '2px 6px', height: 'auto', fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'underline' }}
                >
                  {showReasoning ? 'Hide Logic' : 'Explain'}
                </button>
              )}
            </div>

            {showReasoning && message.reasoning && (
              <div className="animate-fade-in" style={{ marginTop: '8px', background: '#f8fafc', padding: '8px', borderRadius: '6px', fontSize: '0.8rem', color: '#475569', border: '1px solid var(--border-color)' }}>
                <strong>AI Reasoning:</strong><br />
                {message.reasoning}
              </div>
            )}
          </div>
        )}

        <div style={{ fontSize: '0.7rem', marginTop: '6px', textAlign: 'right', opacity: 0.7 }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;