import { React } from "react";
import "components/account/Account.css";

const Register = () => {
    const submitRegister = (event) => {
        event.preventDefault();
    };

    return (
        <main className="register">
            <h2>
                <i className="far fa-sticky-note"></i> Kanban Boards
            </h2>
            <form className="registerForm" onSubmit={submitRegister}>
                <input name="email" placeholder="Email" />
                <input name="nickname" placeholder="Prorecla"/>
                <input name="password" type="password" placeholder="Parola" />
                <button type="submit"> Înregistrare </button>
            </form>
        </main>
    );
};

export default Register;
