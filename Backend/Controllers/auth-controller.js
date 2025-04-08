const User = require("../Models/User");  // Check if the path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const JWT_KEY = process.env.JWT_KEY
const userRegistration = async (req, res) => {
    try {
        const { Name, Email, Contact, Password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ Email });
        if (userExists) {
            return res.json({
                success: false,
                message: "User with this Email already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Create a new user
        const newUser = new User({
            Name,
            Email,
            Contact,
            Password: hashedPassword,

        });

        // Save the new user
        await newUser.save();

        return res.json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });

        if (user && (await bcrypt.compare(Password, user.Password))) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    Email: user.Email,
                    Name: user.Name,
                    Contact: user.Contact,
                },
                JWT_KEY || "12345",
                { expiresIn: "1h" }
            );

            res.json({
                message: "Logged in Successfully",
                success: true,
                token: token,
                user: { Name: user.Name, Email: user.Email, Contact: user.Contact }, // ✅ Add user data
            });
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log(error);

    }
}
module.exports = { userRegistration, userLogin, logout };
