import React from "react";
import { useRecoilState } from "recoil";
import { modalConfirmState } from "store/app/appState.js";
import "components/modals/ModalConfirm.css";

const ModalConfirm = () => {
    const [data, setData] = useRecoilState(modalConfirmState);

    const closeModal = () => {
        setData({
            show: false,
        });
    };

    const doTheAction = () => {
        if (data.actionArgs) {
            data.action(...data.actionArgs);
        } else data.action();
        closeModal();
    };

    return (
        <div>
            {data.show ? (
                <div className="modal-confirm-wrapper">
                    <div className="modal-confirm">
                        <p> {data.text} </p>
                        <button className="confirm" onClick={doTheAction}>
                            DA
                        </button>
                        <button className="cancel" onClick={closeModal}>
                            NU
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ModalConfirm;
