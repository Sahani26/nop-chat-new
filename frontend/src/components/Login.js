 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleLogin = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { uniqueCode });

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
      <button onClick={handleLogin}  className="bt">Login</button>
      <p>
        New user? <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
};

export default Login;
