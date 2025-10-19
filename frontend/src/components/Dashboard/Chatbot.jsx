import React, { useState, useRef, useEffect } from 'react';
import { findMatchingQuestion } from '../../data/chatbotQuestions';
import { FiSend, FiMail, FiMessageSquare } from 'react-icons/fi';
import './chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your customer support assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      const matchedQuestion = findMatchingQuestion(inputValue);

      let botResponse;

      if (matchedQuestion) {
        botResponse = {
          id: messages.length + 2,
          text: matchedQuestion.answer,
          sender: 'bot',
          timestamp: new Date()
        };
      } else {
        // Fallback response with email redirect
        botResponse = {
          id: messages.length + 2,
          text: "I'm sorry, I couldn't find a specific answer to your question. For more detailed assistance, please email us at support@kevaa.in and our team will get back to you within 24 hours.",
          sender: 'bot',
          timestamp: new Date(),
          hasEmailLink: true
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmailRedirect = () => {
    window.location.href = 'mailto:support@kevaa.in?subject=Customer Support Inquiry';
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-header-icon">
          <FiMessageSquare />
        </div>
        <div className="chatbot-header-info">
          <h3>Customer Support</h3>
          <span className="chatbot-status">Online</span>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              {message.hasEmailLink && (
                <button
                  className="email-button"
                  onClick={handleEmailRedirect}
                >
                  <FiMail /> Email Support
                </button>
              )}
            </div>
            <span className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message typing">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input-area">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="send-button"
          >
            <FiSend />
          </button>
        </div>
        <div className="input-hint">
          <small>Ask me about orders, shipping, returns, or any other questions!</small>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
