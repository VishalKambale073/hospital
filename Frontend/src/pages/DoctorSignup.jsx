import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "../CSS/DoctorSignup.css";
import { useNavigate } from 'react-router-dom';

const DoctorSignup = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    password: "",
    education: "",
    experience: "",
    address: "",
    fees: "",
    Specialization: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      Name: formData.name,
      Email: formData.email,
      Contact: formData.contact,
      Gender: formData.gender,
      Password: formData.password,
      Specialization: formData.Specialization,
      Education: formData.education.split(","),
      Experience: Number(formData.experience),
      Address: formData.address,
      Fees: Number(formData.fees)
    };

    try {
      const response = await fetch("http://localhost:3000/api/doctorregistration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      
      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          name: "", email: "", contact: "", gender: "", password: "",
          education: "", experience: "", address: "", fees: "", Specialization: ""
        });
        navigate("/login");
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Doctor Signup</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Full Name" required />
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="tel" name='contact' value={formData.contact} onChange={handleChange} placeholder="Contact Number" required />
            
            <div className="gender-div">
              <label>Gender:</label>
              <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
              <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
            </div>
            
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="text" name='Specialization' value={formData.Specialization} onChange={handleChange} placeholder="Specialization" required />
            <input type="text" name='education' value={formData.education} onChange={handleChange} placeholder="Education (comma separated)" required />
            <input type="number" name='experience' value={formData.experience} onChange={handleChange} placeholder="Experience (Years)" required />
            <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input type="number" name='fees' value={formData.fees} onChange={handleChange} placeholder="Fees (₹)" required />
            
            <button type="submit" className="signup-button">Register</button>
          </form>
          <p>Already have an account? <span className="alreadyAccount" onClick={() => navigate("/doctorlogin")}>Login</span></p>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
