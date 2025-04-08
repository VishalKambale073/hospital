import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../CSS/MyAppointments.css"; 

const MyAppointments = () => {
    const [appData, setAppData] = useState([]);

    const navigate = useNavigate();
    const doctorEmail = localStorage.getItem("doctorEmail") || "";
    console.log("Retrieved doctor email:", doctorEmail);
    
    useEffect(() => {
        if (doctorEmail) {
            console.log("Fetching appointments for:", doctorEmail);
            fetchAppointments();
        } else {
            console.warn("Doctor email not found in localStorage!");
        }
    }, []); // Run only once
    

    const fetchAppointments = () => {
        console.log("Fetching appointments for:", doctorEmail);
        if (!doctorEmail) {
            alert("Doctor not logged in!");
            return;
        }

        axios.get(`http://localhost:3000/api/displayappointmentsfordoctor?doctorEmail=${doctorEmail}`)
            .then((res) => {
                console.log("API Response:", res.data);
                if (res.data.success) {
                    console.log("Appointments Data:", res.data.data);
                    setAppData(res.data.data);
                } else {
                    console.log("No appointments found.");
                    setAppData([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    };

    // Function to update appointment status
    const handleUpdateStatus = (appointment) => {
        axios.put(`http://localhost:3000/api/updateappointmentstatus`, {
            appointmentId: appointment._id // ✅ Use _id instead of Name & Email
        })
        .then((res) => {
            console.log("Status update response:", res.data);
            if (res.data.success) {
                alert("Appointment marked as Completed!");
                fetchAppointments(); // Refresh the list
            } else {
                alert("Failed to update status!");
            }
        })
        .catch((error) => {
            console.error("Error updating status:", error);
        });
    };
    

    return (
        <div>
            <Navbar />
            <div className="button-container">
                <button onClick={() => navigate("/myappointments")}>All Appointments</button>
                <button onClick={() => navigate("/completedappointments")}>Completed Appointments</button>
                <button onClick={() => navigate("/incompletedappointments")}>Incomplete Appointments</button>
            </div>

            <h1>My Appointments</h1>
            {appData && appData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appData.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.Name}</td>
                                <td>{appointment.Email}</td>
                                <td>{appointment.Contact}</td>
                                <td>{appointment.Gender}</td>
                                <td>{appointment.Age}</td>
                                <td>{appointment.Status}</td>
                                <td>
                                    {appointment.Status === "Incomplete" ? (
                                        <button 
                                        className="edit-button" 
                                        onClick={() => handleUpdateStatus(appointment)}
                                    >
                                        Mark as Complete
                                    </button>
                                    
                                    ) : (
                                        <span>✅ Completed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="loading">No appointments found.</p>
            )}
        </div>
    );
};

export default MyAppointments;
