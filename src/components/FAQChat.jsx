import React, { useState, useRef, useEffect } from "react";
import { preguntarFAQ } from "../services/faqService";
import "./FAQChat.css";

const FAQChat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const respuesta = await preguntarFAQ(question);
      setChatHistory(prev => [...prev, 
        { type: 'question', content: question, timestamp: new Date() },
        { type: 'answer', content: respuesta, timestamp: new Date() }
      ]);
      setQuestion("");
    } catch (err) {
      setError(err.message || "Error al obtener la respuesta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="faq-chat-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.type === 'question' ? 'Tú: ' : 'Asistente: '}
              {message.content}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="input-container">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu pregunta..."
          disabled={isLoading}
        />
        <button 
          onClick={handleAsk} 
          disabled={isLoading || !question.trim()}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Enviando...' : 'Preguntar'}
        </button>
      </div>
    </div>
  );
};

export default FAQChat;
