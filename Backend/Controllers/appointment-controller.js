const Appointment = require("../Models/Appointment")
const mongoose = require('mongoose')


const doctorAppointment = async (req, res) => {
    try {
        const { Name, Email, Contact, Age, Gender, AppointmentDate, DoctorEmail } = req.body;

        // ✅ Validate required fields
        if (!Name || !Email || !Contact || !Age || !Gender || !AppointmentDate || !DoctorEmail) {
            return res.status(400).json({
                success: false,
                message: "All fields (Name, Email, Contact, Age, Gender, AppointmentDate, DoctorEmail) are required."
            });
        }

        // ✅ Ensure `Gender` is valid
        const validGenders = ["Male", "Female", "Other"];
        if (!validGenders.includes(Gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender. Allowed values: Male, Female, Other."
            });
        }

        // ✅ Convert and validate `AppointmentDate`
        const appointmentDate = new Date(AppointmentDate);
        if (isNaN(appointmentDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please provide a valid AppointmentDate."
            });
        }
        appointmentDate.setHours(0, 0, 0, 0); // Normalize time to avoid duplication issues

        // ✅ Check if an appointment already exists for the same doctor on the same date
        const existingAppointment = await Appointment.findOne({ AppointmentDate: appointmentDate, DoctorEmail,Name,Email});

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "An appointment already exists for this doctor on the selected date."
            });
        }

        // ✅ Create a new appointment
        const newAppointment = new Appointment({
            Name,
            Email,
            Contact,
            Age,
            Gender,
            DoctorEmail,
            AppointmentDate: appointmentDate, 
            Status: "Incomplete"  // Default value
        });

        await newAppointment.save();

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            data: newAppointment
        });

    } catch (err) {
        console.error("Error booking appointment:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.body;  // ✅ Receive appointmentId from frontend

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        const updateAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { Status: "Completed" },  // ✅ Update status to "Completed"
            { new: true }
        );

        if (!updateAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment: updateAppointment
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const displayAllAppointments = async (req, res) => {
    try {
        const allAppointments = await Appointment.find();
        if (allAppointments.length === 0) { // ✅ Correct condition
            return res.status(200).json({
                success: false,
                message: "No appointments found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "All Appointments Retrieved",
            data: allAppointments
        });
    } catch (err) {
        console.error("Error fetching appointments:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
const displayAppointmentsForDoctor = async (req, res) => {
    try {
        const { doctorEmail } = req.query;
        console.log("Received doctorEmail:", doctorEmail); // Debugging
        
        if (!doctorEmail) {
            return res.status(400).json({
                success: false,
                message: "Doctor email is required"
            });
        }

        const doctorAppointments = await Appointment.find({ DoctorEmail: doctorEmail.toLowerCase() });

 // Match field name exactly!
        console.log("Doctor Appointments:", doctorAppointments); // Debugging

        if (doctorAppointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No appointments found for this doctor"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: doctorAppointments
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const displayCompletedAppointments = async (req, res) => {
    try {
        const { doctorEmail } = req.query;
        console.log("Received doctorEmail:", doctorEmail); // Debugging
        
        if (!doctorEmail) {
            return res.status(400).json({
                success: false,
                message: "Doctor email is required"
            });
        }

        // Fetch appointments where status is "Complete"
        const doctorAppointments = await Appointment.find({ 
            DoctorEmail: doctorEmail.toLowerCase(),
            Status: "Completed"
        });

        console.log("Doctor Appointments:", doctorAppointments); // Debugging

        if (doctorAppointments.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No completed appointments found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: doctorAppointments
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const displayIncompletedAppointments = async (req, res) => {
    try {
        const { doctorEmail } = req.query;
        console.log("Received doctorEmail:", doctorEmail); // Debugging
        
        if (!doctorEmail) {
            return res.status(400).json({
                success: false,
                message: "Doctor email is required"
            });
        }

        // Fetch appointments where status is "Complete"
        const doctorAppointments = await Appointment.find({ 
            DoctorEmail: doctorEmail.toLowerCase(),
            Status: "Incomplete"
        });

        console.log("Doctor Appointments:", doctorAppointments); // Debugging

        if (doctorAppointments.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No completed appointments found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: doctorAppointments
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
module.exports ={ displayAppointmentsForDoctor, doctorAppointment,displayAllAppointments,updateAppointmentStatus,displayCompletedAppointments,displayIncompletedAppointments}