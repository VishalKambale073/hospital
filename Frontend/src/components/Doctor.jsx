import React from 'react';
import '../CSS/Doctor.css';
import assets from '../assets/assets';
import {Navigate,useNavigate} from 'react-router-dom'

const Doctor = ({ doctor = {} }) => {
  const Navigate = useNavigate();
  return (
    <div className="Doctor-container" onClick={()=>Navigate('/doctorinfo',{state:{doctor}})}>

      <div className="Doctor-img-div">
        <img src={doctor.image  || assets.cartoonDoctor} alt={doctor.Name} />
      </div>


      <div className="Doctor-info-div">
        <h2>{doctor.Name}</h2>
        <p><span>Specialization:</span> {doctor.Specialization}</p>
        <p><span>Experience:</span> {doctor.Experience} years</p>
        <p><span>Education:</span> {doctor.Education}</p>
      </div>
    </div>
  );
};

export default Doctor;
