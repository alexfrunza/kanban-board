import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "components/navbar/Navbar.css";
import { singout } from "settings.js";

const Navbar = () => {
    const loggedIn = localStorage.getItem("token");
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
            {loggedIn ? (
                <button
                    className="logout"
                    onClick={(event) => {
                        event.preventDefault();
                        singout();
                        if (location.pathname !== "/") navigate("/");
                        else navigate(0);
                    }}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            ) : (
                ""
            )}
        </nav>
    );
};

export default Navbar;
