import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  // ✅ Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(`${apiUrl}/api/messages`); // Fetch all messages
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // ✅ Send Message (Fixed)
  // const sendMessage = async () => {
  //   if (!text.trim()) {
  //     alert("Enter a message before sending");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post("${apiUrl}/api/messages/send", { text }); // ✅ Correctly sending text only

  //     if (res.data && res.data.newMessage) {
  //       setMessages((prevMessages) => [...prevMessages, res.data.newMessage]); // ✅ Update messages immediately
  //     }

  //     setText(""); // ✅ Clear input field after sending
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };
  const sendMessage = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
  
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
  

  // ✅ Logout Function
  const handleLogout = () => {
    navigate("/"); // Redirect to home/login page
  };

  return (
    <div>
      {/* ✅ Logout Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Chat</h2>
        <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      {/* ✅ Display Messages */}
      {/* <ul>
        {messages.map((msg) => (
          <li key={msg._id}>
            <strong>User: Anonymous</strong>  
            <br />
            {msg.text}
          </li>
        ))}
      </ul> */}
<ul>
  {messages.map((msg) => (
    <li key={msg._id}>
      <strong> {msg.userId?.name || "Anonymous"}</strong>  
      <br />
      {msg.text}
    </li>
  ))}
</ul>

      {/* ✅ Send Message Input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage} className="bt">Send</button>
    </div>
  );
};

export default Chat;
