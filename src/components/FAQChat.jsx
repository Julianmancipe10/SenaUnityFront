import React, { useState, useRef, useEffect } from "react";
import { preguntarFAQ } from "../services/faqService";
import "./FAQChat.css";

const MAX_CHARS = 500;
const STORAGE_KEY = 'chat_history';

const FAQChat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const chatEndRef = useRef(null);
  const remainingChars = MAX_CHARS - question.length;

  // Guardar historial en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Verificar conexión
  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  const handleAsk = async () => {
    if (!question.trim() || !isConnected) return;

    setIsLoading(true);
    setError(null);

    try {
      // Obtener el contexto de las últimas 3 interacciones
      const context = chatHistory
        .slice(-6)
        .map(msg => `${msg.type === 'question' ? 'Usuario' : 'Asistente'}: ${msg.content}`)
        .join('\n');

      const respuesta = await preguntarFAQ(question, context);
      
      const newMessages = [
        { type: 'question', content: question, timestamp: new Date() },
        { type: 'answer', content: respuesta, timestamp: new Date() }
      ];

      setChatHistory(prev => [...prev, ...newMessages]);
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

  const clearChat = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial del chat?')) {
      setChatHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="faq-chat-container">
      <div className="chat-header">
        <h3>Asistente SenaUnity</h3>
        {chatHistory.length > 0 && (
          <button onClick={clearChat} className="clear-chat-btn">
            Limpiar Chat
          </button>
        )}
      </div>

      <div className="connection-status">
        {!isConnected && (
          <div className="offline-warning">
            Sin conexión - El chat no está disponible
          </div>
        )}
      </div>

      <div className="chat-history">
        {chatHistory.length === 0 ? (
          <div className="empty-chat">
            ¡Hola! ¿En qué puedo ayudarte hoy?
          </div>
        ) : (
          chatHistory.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.type === 'question' ? 'Tú: ' : 'Asistente: '}
                {message.content}
              </div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
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
        <div className="textarea-wrapper">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value.slice(0, MAX_CHARS))}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta..."
            disabled={isLoading || !isConnected}
          />
          <div className="char-counter">
            {remainingChars} caracteres restantes
          </div>
        </div>
        <button 
          onClick={handleAsk} 
          disabled={isLoading || !question.trim() || !isConnected}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Enviando...' : 'Preguntar'}
        </button>
      </div>
    </div>
  );
};

export default FAQChat;
