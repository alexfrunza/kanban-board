import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "utils.js";
import "components/account/Account.css";

const Account = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [boardNumber, setBoardNumber] = useState(0);
    const [columnNumber, setColumnNumber] = useState(0);
    const [cardNumber, setCardNumber] = useState(0);
    const [loading, setLoading] = useState(true);

    const getStats = async () => {
        let response = await fetch(`http://127.0.0.1:5003/user/stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            let result = await response.json();
            setLoading(false);
            return [result, true];
        } else if (response.status === 401) {
            signout();
            navigate("/");
            return [{}, false];
        } else {
            navigate("/");
            return [{}, false];
        }
    };

    useEffect(() => {
        getStats().then(([data, ok]) => {
            if (ok) {
                setBoardNumber(data.board_number);
                setColumnNumber(data.column_number);
                setCardNumber(data.card_number);
            }
        });
    });

    return (
        <main className="account">
            {loading ? (
                <div className="lds-dual-ring" />
            ) : (
                <div className="stats">
                    <h2> Statistici: </h2>
                    <p> Număr de table: {boardNumber} </p>
                    <p> Număr de coloane: {columnNumber} </p>
                    <p> Număr de articole: {cardNumber} </p>
                </div>
            )}
        </main>
    );
};

export default Account;
