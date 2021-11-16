import React from 'react';
import 'components/navbar/Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <button className="logo">
                <i className="fas fa-sticky-note"></i>
                <p className="logo-text"> Kanban Board </p>
            </button>
            <button className="back">
                <i className="fas fa-arrow-left"></i>
            </button>
            <button className="menu">
                <i className="fas fa-bars"></i>
            </button>
        </nav>
    );
}

export default Navbar;
