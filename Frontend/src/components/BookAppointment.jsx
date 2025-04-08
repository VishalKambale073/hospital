import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import "../CSS/BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor || {};  // Get doctor details from location

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    description: "",
    appointmentDate: "",
    doctorName: doctor.Name || "", // Pre-fill doctor details
    doctorId: doctor._id || "" // Store doctor ID
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
        Age: formData.age,
        Gender: formData.gender,
        AppointmentDate: formData.appointmentDate,  // ✅ Fix Date field name
        DoctorEmail: doctor.Email || "",  // ✅ Pass doctor's email
        Status: "Incomplete"  // ✅ Ensure default status
    };

    try {
        const response = await fetch("http://localhost:3000/api/bookappointment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            setFormData({ 
                name: "", email: "", contact: "", age: "", gender: "", appointmentDate: "" 
            });
            navigate("/");
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Try again.");
    }
};


  return (
    <div>
      <Navbar />
      <form className="appointment-form-container" onSubmit={handleSubmit}>
        <h2 className="appointment-form-title">Book an Appointment</h2>

        {/* Pre-filled Doctor Name Field (Read-Only) */}
        <div className="appointment-input-group">
          <label>Doctor Name:</label>
          <input type="text" name="doctorName" value={formData.doctorName} readOnly />
        </div>

        <div className="appointment-input-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="appointment-input-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="appointment-input-group">
          <label>Contact:</label>
          <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>

        <div className="appointment-input-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="appointment-input-group appointment-gender-group">
          <label>Gender:</label>
          <div>
            <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
            <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
          </div>
        </div>

        <div className="appointment-input-group">
          <label>Symptoms:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="appointment-input-group">
          <label>Date of Appointment:</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
        </div>

        <button type="submit" className="appointment-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default BookAppointment;
