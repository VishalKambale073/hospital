const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"] // Restrict values
    },
    Age: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        default: "Incomplete",
        enum: ["Incomplete", "Completed"] // Allow only valid values
    },
    DoctorEmail: {
        type: String,
        required: true // Ensure doctor email is always stored
    },
    AppointmentDate: {
        type: Date,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

