import { React, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { warningMessageState } from "store/app/appState.js";
import "components/account/Account.css";

const Register = () => {
    const loggedIn = localStorage.getItem("token");
    const setWarningMessage = useSetRecoilState(warningMessageState);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) navigate("/");
    }, []);

    const submitRegister = async (event) => {
        event.preventDefault();
        setWarningMessage("");

        const email = event.target.email.value.trim();
        const nickname = event.target.nickname.value.trim();
        const password = event.target.password.value.trim();

        if (!email || !nickname || !password) {
            setTimeout(
                () =>
                    setWarningMessage("Trebuie să completați toate câmpurile!"),
                0
            );
            return;
        }

        const accountInfo = {
            email,
            nickname,
            password,
        };

        let response = await fetch("http://127.0.0.1:5004/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(accountInfo),
        });
        let result = await response.json();

        if (result.success === false) setWarningMessage(result.details);
        else navigate("/login");
    };

    return (
        <main className="register">
            <h2>
                <i className="far fa-sticky-note"></i> Kanban Boards
            </h2>
            <form className="registerForm" onSubmit={submitRegister}>
                <input autoComplete="off" name="email" placeholder="Email" />
                <input autoComplete="off" name="nickname" placeholder="Prorecla" />
                <input autoComplete="off" name="password" type="password" placeholder="Parola" />
                <button type="submit"> Înregistrare </button>
            </form>
        </main>
    );
};

export default Register;
