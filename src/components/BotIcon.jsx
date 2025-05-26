import React from "react";
import "./BotIcon.css";

const BotIcon = ({ onClick }) => (
  <div className="bot-icon-float" onClick={onClick} title="Abrir chat de ayuda">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#007bff" />
      <path d="M13 25C13 22.2386 15.2386 20 18 20H22C24.7614 20 27 22.2386 27 25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="2" fill="white"/>
      <circle cx="24" cy="16" r="2" fill="white"/>
    </svg>
  </div>
);

export default BotIcon; 