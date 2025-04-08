import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Login.css"; // Import external CSS
import Navbar from "../components/Navbar";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/login", { Email, Password });

            console.log("Response from API:", res.data); // Debugging line

            if (res.data.token && res.data.user) {
                alert("Login successful!");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user)); // Ensure JSON format

                console.log("User stored in localStorage:", localStorage.getItem("user")); // Debugging line

                navigate("/");
                window.location.reload(); // Reload to update Navbar state
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
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button type="submit" className="login-button">Login</button>
                        <p>
                            Doctor?{" "}
                            <span className="doctor-signup" onClick={() => navigate("/doctorlogin")}>
                                Click here to Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
