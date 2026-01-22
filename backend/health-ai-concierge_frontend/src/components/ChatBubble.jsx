const ChatBubble = ({ message, sender, timestamp }) => {
  const isUser = sender === 'user';
  const isEscalated = message.includes('escalated') || message.includes('human follow-up') || message.includes('clinic staff') || message.includes('staff member will contact you');

  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="bubble-content">
        <p className="bubble-text">{message}</p>
        {isEscalated && !isUser && (
          <div className="escalation-notice">
            This query has been escalated to clinic staff for safety.
          </div>
        )}
        <span className="bubble-time">
          {new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;