import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "components/navbar/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const noBackButton = ["/"];

    return (
        <nav>
            {!noBackButton.includes(location.pathname) ? (
                <button className="back" onClick={() => navigate(-1)}>
                    <i className="fas fa-arrow-left"></i>
                </button>
            ) : (
                ""
            )}
            <button className="logo" onClick={() => navigate("/")}>
                <i className="far fa-sticky-note"></i>
            </button>
            <button className="menu">
                <i className="fas fa-bars"></i>
            </button>
        </nav>
    );
};

export default Navbar;
