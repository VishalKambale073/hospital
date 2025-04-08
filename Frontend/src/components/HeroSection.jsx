import React from "react";
import "../CSS/HeroSection.css";
import { Navigate, useNavigate } from "react-router-dom"


const HeroSection = () => {
  const Navigate = useNavigate();
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Your Health, Our Priority</h1>
        <p>Book an appointment with the best doctors near you.</p>
        <button className="hero-btn" onClick={()=>Navigate('/alldoctors')}>Book Appointment</button>
      </div>
    </div>
  );
};

export default HeroSection;
