import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signout } from "utils.js";
import { useSetRecoilState } from "recoil";
import { warningMessageState, modalConfirmState } from "store/app/appState.js";
import "components/boards/Boards.css";

const Boards = () => {
    const setWarningMessage = useSetRecoilState(warningMessageState);
    const setModalConfirm = useSetRecoilState(modalConfirmState);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);

    useEffect(() => {
        if (showNewBoardForm) {
            const input = document.querySelector("[name='boardName']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [showNewBoardForm]);

    const submitNewBoard = async (event) => {
        event.preventDefault();
        setWarningMessage("");

        let boardName = event.target.boardName.value.trim();
        if (!boardName) {
            setTimeout(() => setWarningMessage("Trebuie sa adaugi un nume"), 0);
        } else {
            let board = {
                name: boardName,
            };

            let response = await fetch("http://127.0.0.1:5003/boards", {
                method: "POST",
                headers: new Headers({
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(board),
            });
            let result = await response.json();
            let boardId = result.board_id;

            setBoards(boards.concat({ id: boardId, name: boardName }));
            setShowNewBoardForm(false);
        }
    };

    const deleteBoard = async (boardId) => {
        let response = await fetch(`http://127.0.0.1:5003/boards/${boardId}`, {
            method: "DELETE",
            headers: new Headers({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }),
        });
        if (response.status === 200)
            setBoards(boards.filter(({ id }) => id !== boardId));
    };

    const seeBoard = (event, boardId) => {
        event.preventDefault();
        navigate(`/boards/${boardId}`);
    };

    useEffect(() => {
        if (!token) navigate("/login");
    });

    useEffect(() => {
        fetch("http://127.0.0.1:5003/boards", {
            headers: new Headers({
                Authorization: `Bearer ${token}`,
            }),
        })
            .then((res) => [res.json(), res.status])
            .then(([result, status]) => {
                if (status === 401) {
                    signout();
                    navigate("/");
                } else return result;
            })
            .then((res) => {
                if (res) {
                    setLoading(false);
                    setBoards(res);
                }
            });
    }, []);

    return (
        <main className="boards">
            {loading ? (
                <div className="lds-dual-ring"></div>
            ) : (
                <div>
                    <h2> Tablele tale: </h2>
                    <ul>
                        {Array.isArray(boards) && boards.length !== 0 ? (
                            boards.map((board) => {
                                return (
                                    <li key={board.id}>
                                        <p> {board.name}</p>
                                        <div className="buttons">
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setModalConfirm({
                                                        show: true,
                                                        action: deleteBoard,
                                                        text: "E??ti sigur c?? dore??ti s?? ??tergi aceast?? tabl???",
                                                        actionArgs: [board.id],
                                                    });
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                            <button
                                                onClick={(event) =>
                                                    seeBoard(event, board.id)
                                                }
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <li>Creeaz?? o tabla pentru a ??ncepe</li>
                        )}
                    </ul>
                    <div className="addNewBoard">
                        {!showNewBoardForm ? (
                            <button onClick={() => setShowNewBoardForm(true)}>
                                {" "}
                                Creeaz?? o tabl?? nou??{" "}
                            </button>
                        ) : (
                            <form onSubmit={submitNewBoard}>
                                <input
                                    name="boardName"
                                    placeholder="Nume"
                                    autoComplete="off"
                                    defaultValue={""}
                                />
                                <button type="submit"> Adaug?? </button>
                                <button
                                    onClick={() => setShowNewBoardForm(false)}
                                >
                                    Anuleaz??
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Boards;
