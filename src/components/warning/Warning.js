import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { warningMessageState } from "store/app/appState.js";
import "components/warning/Warning.css";

const Warning = () => {
    const [show, setShow] = useState(false);
    const [warningMessage, setWarningMessage] =
        useRecoilState(warningMessageState);
    const location = useLocation();

    useEffect(() => {
        setWarningMessage("");
    }, [location]);

    useEffect(() => {
        if (warningMessage) {
            setShow(true);
            setTimeout(() => setWarningMessage(""), 5000);
        } else setShow(false);
    }, [warningMessage]);

    return (
        <div>
            {show ? (
                <div className="warning">
                    <button
                        className="close"
                        onClick={() => setWarningMessage("")}
                    >
                        <i className="fas fa-times-circle"></i>
                    </button>
                    <p> {warningMessage} </p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Warning;
