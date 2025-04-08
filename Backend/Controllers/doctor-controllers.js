const Doctor = require('../Models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

// Doctor Registration
const doctorRegistration = async (req, res) => {
    try {
        let { Name, Email, Contact, Password, Specialization, Education, Experience, Address, Fees, Gender } = req.body;

        if (!Name || !Email || !Contact || !Password || !Specialization || !Education || !Experience || !Address || !Fees || !Gender) {
            return res.status(400).json({ success: false, message: "Something is missing" });
        }

        Email = Email.toLowerCase();  // Ensure email is stored in lowercase

        const doctorExist = await Doctor.findOne({ Email });
        if (doctorExist) {
            return res.status(400).json({ success: false, message: "User with this Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newDoctor = new Doctor({
            Name, Email, Contact, Password: hashedPassword, Education, Experience, Specialization, Address, Fees, Gender
        });

        await newDoctor.save();
        return res.status(201).json({ success: true, message: "Doctor has registered successfully", data: newDoctor });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update Doctor Profile
const updateDoctor = async (req, res) => {
    try {
        let { Name, Email, Contact, Password, Education, Experience, Address, Fees, Gender } = req.body;

        if (!Name || !Email || !Contact || !Education || !Experience || !Address || !Fees || !Gender) {
            return res.status(400).json({ success: false, message: "Something is missing" });
        }

        Email = Email.toLowerCase();

        const doctor = await Doctor.findOne({ Email });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor with this Email does not exist" });
        }

        doctor.Name = Name;
        doctor.Contact = Contact;
        doctor.Experience = Experience;
        doctor.Education = Education;
        doctor.Address = Address;
        doctor.Fees = Fees;
        doctor.Gender = Gender;

        if (Password) {
            const salt = await bcrypt.genSalt(10);
            doctor.Password = await bcrypt.hash(Password, salt);
        }

        await doctor.save();
        return res.status(200).json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Doctor Login
const doctorLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Check if doctor exists
        const doctor = await Doctor.findOne({ Email });

        if (doctor && (await bcrypt.compare(Password, doctor.Password))) {
            const token = jwt.sign(
                {
                    doctorId: doctor._id,
                    Name: doctor.Name,
                    Email: doctor.Email, // ✅ Fixed Email field
                    Contact: doctor.Contact
                },
                process.env.JWT_KEY || "12345",
                { expiresIn: "1h" }
            );

            res.json({
                success: true,
                message: "Doctor Login successful",
                token,  // ✅ Send the token
                doctor: {  // ✅ Send full doctor details
                    doctorId: doctor._id,
                    Name: doctor.Name,
                    Email: doctor.Email, 
                    Contact: doctor.Contact
                }
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



// Logout Doctor
const doctorLogout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Display All Doctors
const displayAllDoctors = async (req, res) => {
    try {
        const allDoctors = await Doctor.find();
        return res.status(200).json(allDoctors);
    } catch (error) {
        console.error("Display Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Display Doctor by ID
const displayDoctorById = async (req, res) => {
    try {
        const doctorById = await Doctor.findById(req.params.id);
        if (doctorById) {
            return res.json({ success: true, message: "Doctor with this ID is found", data: doctorById });
        }
        return res.json({ success: false, message: "No doctor found with this ID" });

    } catch (error) {
        console.error("Display By ID Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { doctorRegistration, displayAllDoctors, displayDoctorById, updateDoctor, doctorLogin, doctorLogout };
