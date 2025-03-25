 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !uniqueCode) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, uniqueCode });

      alert("Registration successful! Redirecting to login...");
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="Enter Name" 
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter Unique Code" 
        value={uniqueCode}
        onChange={(e) => setUniqueCode(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already registered? <button onClick={() => navigate("/")}>Login</button>
      </p>
    </div>
  );
};

export default Register;
