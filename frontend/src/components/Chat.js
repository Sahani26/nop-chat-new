import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/messages`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Auto-refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!text.trim()) {
      alert("Enter a message before sending");
      return;
    }

    if (!user || !user.userId) {
      alert("User not logged in. Please login first.");
      navigate("/");
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/api/messages/send`, { 
        userId: user.userId, 
        text 
      });

      if (res.data && res.data.newMessage) {
        setMessages((prevMessages) => [...prevMessages, res.data.newMessage]);
      }

      setText(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to home/login page
  };

  return (
    <div className="chat-container">
      <div className="header">
        <h2>Chat</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <ul className="messages-list">
        {messages.map((msg) => (
          <li key={msg._id} className="message-item">
            <strong>{msg.userId?.name || "Anonymous"}</strong>
            <br />
            {msg.text}
          </li>
        ))}
      </ul>

      <div className="input-section">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="message-input"
        />
        <button onClick={sendMessage} className="send-btn">Send</button>
      </div>
    </div>
  );
};

export default Chat;
