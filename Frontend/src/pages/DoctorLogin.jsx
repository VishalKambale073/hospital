import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../CSS/DoctorLogin.css"; // Updated CSS file

const DoctorLogin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/doctorlogin", {
        Email,
        Password,
      });

      console.log("Response from API:", res.data); // Debugging line

      if (res.data.token && res.data.doctor) {
        alert("Login successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("doctor", JSON.stringify(res.data.doctor)); // ✅ Store doctor details

        console.log("Doctor stored in localStorage:", localStorage.getItem("doctor")); // Debugging

        navigate("/");
        window.location.reload(); // ✅ Reload to update Navbar
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleLogin} className="doctor-auth-container">
        <h2 className="doctor-auth-title">Doctor Login</h2>

        <div className="doctor-auth-input">
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={Email} // ✅ Use correct state variable
            onChange={(e) => setEmail(e.target.value)} // ✅ Correct event handler
            required
          />
        </div>

        <div className="doctor-auth-input">
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={Password} // ✅ Use correct state variable
            onChange={(e) => setPassword(e.target.value)} // ✅ Correct event handler
            required
          />
        </div>

        <button type="submit" className="doctor-auth-btn">
          Login
        </button>

        <p className="doctor-auth-footer">
          New User? <span onClick={() => navigate("/doctorsignup")}>Register</span>
        </p>
        <p>
          User?{" "}
          <span className="doctor-signup" onClick={() => navigate("/signup")}>
            Click here to Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default DoctorLogin;
