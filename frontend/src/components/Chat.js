import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  // ... existing state and functions ...

  // Add this function to determine if message is from current user
  const isCurrentUser = (messageUserId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.userId === messageUserId;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat App</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <ul className="messages-list">
        {messages.map((msg) => (
          <li
            key={msg._id}
            className={`message-item ${
              isCurrentUser(msg.userId?._id) ? "sent" : "received"
            }`}
          >
            <div className="message-meta">
              <span className="message-sender">
                {msg.userId?.name || "Anonymous"}
              </span>
              <span className="message-time">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="message-text">{msg.text}</div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="message-input"
        />
        <button onClick={sendMessage} className="send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
