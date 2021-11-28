import { React } from "react";
import "components/account/Account.css";

const Login = () => {
    const submitLogin = (event) => {
        event.preventDefault();
    };

    return (
        <main className="login">
            <h2>
                <i className="far fa-sticky-note"></i> Kanban Boards
            </h2>
            <form className="loginForm" onSubmit={submitLogin}>
                <input name="emailNickname" placeholder="Email sau prorecla" />
                <input name="password" type="password" placeholder="Parola" />
                <button type="submit"> Autentificare </button>
            </form>
        </main>
    );
};

export default Login;
