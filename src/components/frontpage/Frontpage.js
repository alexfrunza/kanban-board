import React from "react";
import { Link } from "react-router-dom";
import "components/frontpage/Frontpage.css";

const Frontpage = () => {
    return (
        <main className="frontpage">
            <h1>
                <i className="far fa-sticky-note"></i> Kanban Boards
            </h1>
            <Link to="/about">Despre Proiect</Link>
            <Link to="/register">Crează-ți un cont</Link>
            <Link to="/login">click aici dacă ai deja un cont</Link>
        </main>
    );
};

export default Frontpage;
