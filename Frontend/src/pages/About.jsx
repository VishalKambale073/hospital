import React from "react";
import Navbar from '../components/Navbar'
import "../CSS/About.css"; 

const About = () => {
  return (
    <div>
      <Navbar/>
       <div className="about-container">
      <h1>About Our Doctor Appointment System</h1>
      <p>
        Our Doctor Appointment System is designed to make booking medical
        appointments seamless and efficient. Patients can easily schedule
        appointments, while doctors can manage their schedules effectively.
      </p>
      <h2>Key Features</h2>
      <ul className="features">
        <li>Easy appointment booking</li>
        <li>Secure user authentication</li>
        <li>Doctor profile management</li>
        <li>Real-time appointment status updates</li>
        <li>Seamless payment integration</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        We aim to simplify healthcare accessibility by providing a platform that
        connects patients with healthcare professionals efficiently.
      </p>
    </div>
    </div>
   
  );
};

export default About;
