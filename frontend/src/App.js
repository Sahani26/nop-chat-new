import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login"; // ✅ Import Login Component
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={handleSetUser} />} /> {/* ✅ Default is Login */}
        <Route path="/register" element={<Register setUser={handleSetUser} />} /> {/* ✅ Registration Page */}
        <Route path="/chat" element={user ? <Chat user={user} setUser={handleSetUser} /> : <Login setUser={handleSetUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
