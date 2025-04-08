import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import assets from "../assets/assets";
import "../CSS/DoctorInfo.css";
import Navbar from "./Navbar";

const DoctorInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const doctor = location.state?.doctor || {}; // Retrieve doctor details

    return (
        <div>
            <Navbar />
            <div className='DoctorInfo-container'>
                <div className='DoctorInfo-div'>
                    <p className='DoctorInfo'><span>Name:</span> {doctor.Name}</p>
                    <p className='DoctorInfo'><span>Specialization:</span> {doctor.Specialization}</p>
                    <p className='DoctorInfo'><span>Degree:</span> {doctor.Education}</p>
                    <p className='DoctorInfo'><span>Experience:</span> {doctor.Experience} years</p>
                    <p className='DoctorInfo'><span>Fees:</span> {doctor.Fees}</p>
                    <p className='DoctorInfo'><span>Address:</span> {doctor.Address}</p>

                </div>
                <div className='DoctorImage-container'>
                    <div className='DoctorImage-div'>
                        <img src={doctor.image || assets.cartoonDoctor} alt={doctor.Name} />
                    </div>
                    <button
                        className='Appointment'
                        onClick={() => navigate("/bookappointment", { state: { doctor } })}
                    >
                        Book Appointment
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DoctorInfo;
