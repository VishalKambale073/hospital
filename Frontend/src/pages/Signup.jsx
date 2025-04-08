import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../CSS/Signup.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      Name: formData.name,
      Email: formData.email,
      Contact: formData.contact,
      Password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ name: "", email: "", contact: "", password: "" });
        navigate("/login"); 
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Full Name" 
              required 
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
            />
            <input 
              type="tel" 
              name="contact" 
              value={formData.contact} 
              onChange={handleChange} 
              placeholder="Contact Number" 
              required 
            />
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password" 
              required 
            />
            <button type="submit" className="signup-button">Register</button>
          </form>
          <p>
            Already have an account? 
            <span className="alreadyAccount" onClick={() => navigate("/login")}> Login</span>
          </p>
          <p>Doctor? <span className="doctor-signup" onClick={() => navigate('/doctorsignup')}>Click here to Signup</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
