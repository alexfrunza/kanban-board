import { React, useState } from "react";
import { Link } from "react-router-dom";
import "components/frontpage/Frontpage.css";

const Frontpage = () => {
    const [loggedIn] = useState(localStorage.getItem("token"));
    const [nickname] = useState(localStorage.getItem("userNickname"));

    return (
        <main className="frontpage">
            {loggedIn ? (
                <h2> Salut, {nickname}! </h2>
            ) : (
                <h1>
                    <i className="far fa-sticky-note"></i> Kanban Boards
                </h1>
            )}
            {loggedIn ? (
                <div className="logged">
                    <Link to="/about">Despre Proiect</Link>
                    <Link to="/boards"> Table </Link>
                    <Link to="/account"> Profil </Link>
                </div>
            ) : (
                <div>
                    <Link to="/about">Despre Proiect</Link>
                    <Link to="/register">Crează-ți un cont</Link>
                    <Link to="/login">click aici dacă ai deja un cont</Link>
                </div>
            )}
        </main>
    );
};

export default Frontpage;
