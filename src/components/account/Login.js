import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { warningMessageState } from "store/app/appState.js";
import jwt_decode from "jwt-decode";
import "components/account/Account.css";

const Login = () => {
    const loggedIn = localStorage.getItem("token");
    const setWarningMessage = useSetRecoilState(warningMessageState);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) navigate("/");
    }, []);

    const submitLogin = async (event) => {
        event.preventDefault();
        setWarningMessage("");

        const email = event.target.emailNickname.value.trim();
        const nickname = event.target.emailNickname.value.trim();
        const password = event.target.password.value.trim();

        if (!email || !nickname || !password) {
            setTimeout(
                () =>
                    setWarningMessage("Trebuie să completați toate câmpurile!"),
                0
            );
            return;
        }

        const credentials = {
            email,
            nickname,
            password,
        };
        let response = await fetch("http://127.0.0.1:5004/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(credentials),
        });
        let result = await response.json();

        if (result.success === false)
            setWarningMessage("Datele furnizate sunt incorecte");
        else {
            const {
                user_id: userId,
                user_admin: userAdmin,
                user_nickname: userNickname,
            } = jwt_decode(result.json_web_token);

            localStorage.setItem("token", result.json_web_token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userAdmin", userAdmin);
            localStorage.setItem("userNickname", userNickname);
            navigate("/");
        }
    };

    return (
        <main className="login">
            <h2>
                <i className="far fa-sticky-note"></i> Kanban Boards
            </h2>
            <form className="loginForm" onSubmit={submitLogin}>
                <input name="emailNickname" placeholder="Email sau prorecla" autoComplete='off'/>
                <input name="password" type="password" placeholder="Parola" autoComplete='off'/>
                <button type="submit"> Autentificare </button>
            </form>
        </main>
    );
};

export default Login;
