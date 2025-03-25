 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { uniqueCode });

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Store user info
        navigate("/chat"); // Redirect to chat
      }
    } catch (error) {
      alert("Invalid credentials or user not registered.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter Unique Code" 
        value={uniqueCode}
        onChange={(e) => setUniqueCode(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        New user? <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
};

export default Login;
