import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import "../CSS/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menu, setMenu] = useState(location.pathname);
    const [account, setAccount] = useState(null); // Store either user or doctor

    useEffect(() => {
        setMenu(location.pathname);
    
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedDoctor = localStorage.getItem("doctor");
    
        console.log("Token from localStorage:", token);
        console.log("Stored user:", storedUser);
        console.log("Stored doctor:", storedDoctor);
    
        let accountData = null;
        if (storedUser) {
            try {
                accountData = JSON.parse(storedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user"); // Remove corrupted data
            }
        } else if (storedDoctor) {
            try {
                accountData = JSON.parse(storedDoctor);
                // ✅ Store doctor email correctly
                if (accountData.Email) {
                    localStorage.setItem("doctorEmail", accountData.Email);
                }
            } catch (error) {
                console.error("Error parsing doctor data:", error);
                localStorage.removeItem("doctor"); // Remove corrupted data
            }
        }
    
        setAccount(accountData);
    }, [location]); 
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("doctor"); // ✅ Remove doctor too
        setAccount(null);
        navigate("/login");
        window.location.reload(); // ✅ Refresh to update Navbar
    };

    return (
        <div className="navbar-container">
            <div className="logo-div">
                <img className="logo" src={assets.logo} alt="Logo" />
            </div>
            <div className="pages-list-div">
                <ul className="pages-list">
                    <li className="pages-list-item">
                        <Link to="/" id="link" className={menu === "/" ? "active" : ""}>
                            Home
                        </Link>
                    </li>
                    {account && account.role === "patient" ? (
                        <li className="pages-list-item">
                            <Link to="/alldoctors" id="link" className={menu === "/alldoctors" ? "active" : ""}>
                                All Doctors
                            </Link>
                        </li>
                    ) : account ? (
                        <li className="pages-list-item">
                            <Link to="/myappointments" id="link" className={menu === "/myappointments" ? "active" : ""}>
                                All Appointments
                            </Link>
                        </li>
                    ) : null}
                    <li className="pages-list-item">
                        <Link to="/about" id="link" className={menu === "/about" ? "active" : ""}>
                            About
                        </Link>
                    </li>
                    <li className="pages-list-item">
                        <Link to="/contact" id="link" className={menu === "/contact" ? "active" : ""}>
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="auth-buttons-div">
                {account ? (
                    <div className="profile-dropdown">
                        
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link to="/signup">
                            <button className="signup-button">Signup</button>
                        </Link>
                        <Link to="/login">
                            <button className="login-button">Login</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
