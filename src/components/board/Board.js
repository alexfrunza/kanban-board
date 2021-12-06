import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import ColumnMobile from "components/column/ColumnMobile";
import ColumnDesktop from "components/column/ColumnDesktop";
import CardEditModal from "components/modals/CardEditModal";
import { cardEditModalState, columnsState } from "store/board/boardState.js";
import { useSetRecoilState } from "recoil";
import { warningMessageState } from "store/app/appState.js";
import { inputCleanUp, signout } from "utils.js";
import "components/board/Board.css";

const Board = () => {
    const mql = window.matchMedia("(min-width: 768px)");
    let desktopView = mql.matches;

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [boardName, setBoardName] = useState("My first board");
    const [boardNameEdit, setBoardNameEdit] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [search, setSearch] = useState(false);
    const [addColumnForm, setAddColumnForm] = useState(false);
    const setWarningMessage = useSetRecoilState(warningMessageState);
    let params = useParams();

    const [columns, setColumns] = useRecoilState(columnsState);
    const cardEdit = useRecoilValue(cardEditModalState);

    const addColumn = async (event) => {
        event.preventDefault();
        setWarningMessage("");

        const name = event.target.columnName.value.trim();
        if (!name) {
            setTimeout(() =>
                setWarningMessage("Trebuie sa adaugi un nume.", 0)
            );
            return;
        }
        let column = {
            name,
        };
        let response = await fetch(
            `http://127.0.0.1:5003/boards/${params.boardId}/columns`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(column),
            }
        );
        let result = await response.json();
        if (response.status === 201) {
            let columnId = result.column_id;
            setColumns(
                columns.concat({
                    id: columnId,
                    name,
                    cards: [],
                })
            );
            setAddColumnForm(false);
        } else {
            inputCleanUp("columnName");
            setWarningMessage(result.details);
        }
    };

    // Fetch the data from API
    useEffect(() => {
        fetch(`http://127.0.0.1:5003/boards/${params.boardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => [res.json(), res.status])
            .then(([result, status]) => {
                if (status === 401) {
                    signout();
                    navigate("/");
                } else if (status !== 200) navigate("/");
                else return result;
            })
            .then((res) => {
                if (res) {
                    setLoading(false);
                    setBoardName(res.name);
                    setColumns(res.columns);
                }
            });
    }, []);

    const submitBoardName = async (event) => {
        event.preventDefault();
        const name = event.target.boardName.value.trim();
        setWarningMessage("");

        if (name) {
            let board = {
                name,
            };
            let response = await fetch(
                `http://127.0.0.1:5003/boards/${params.boardId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(board),
                }
            );
            if (response.status === 200) {
                setBoardName(name);
                setBoardNameEdit(false);
            } else {
                let result = await response.json();
                inputCleanUp("boardName");
                setWarningMessage(result.details);
            }
        } else setBoardNameEdit(false);
    };

    useEffect(() => {
        if (setBoardNameEdit) {
            const input = document.querySelector("[name='boardName']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [boardNameEdit]);

    useEffect(() => {
        if (search) {
            const input = document.querySelector("[name='search']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [search]);

    useEffect(() => {
        if (addColumnForm) {
            const input = document.querySelector("[name='columnName']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [addColumnForm]);

    const boardNameTag = () => {
        if (!boardNameEdit) {
            return (
                <div className="boardName">
                    <h2> {boardName} </h2>
                    <button
                        className="editBoardTitle"
                        onClick={() => setBoardNameEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    {columns.length !== 0 ? (
                        <button
                            style={{
                                color: search ? "var(--red)" : "var(--white)",
                            }}
                            onClick={() => {
                                setSearch(!search);
                                setAddColumnForm(false);
                            }}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        style={{
                            color: addColumnForm
                                ? "var(--green)"
                                : "var(--white)",
                        }}
                        onClick={() => {
                            setAddColumnForm(!addColumnForm);
                            setSearch(false);
                        }}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            );
        } else {
            return (
                <form className="boardName" onSubmit={submitBoardName}>
                    <input
                        type="text"
                        name="boardName"
                        placeholder="Nume pentru tablă"
                        defaultValue={boardName}
                        autoComplete="off"
                    />
                    <button type="submit">
                        <i className="far fa-save"></i>
                    </button>
                </form>
            );
        }
    };

    const renderColumnsSection = () => {
        if (desktopView) {
            if (columns.length === 0)
                return (
                    <p className="tips">
                        Sfat: Adaugă o coloană utilizând simbolul +
                    </p>
                );
            return columns.map((column) => {
                return <ColumnDesktop key={column.id} value={column} />;
            });
        } else {
            return <ColumnMobile />;
        }
    };

    return (
        <div>
            {!loading ? (
                <main className="board">
                    {cardEdit ? <CardEditModal /> : ""}
                    {boardNameTag()}
                    {search ? (
                        <form
                            className="searchInBoard"
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <input
                                autoComplete="off"
                                type="text"
                                name="search"
                                value={searchString}
                                onChange={(event) =>
                                    setSearchString(event.target.value)
                                }
                            />
                            <i className="fas fa-search"></i>
                        </form>
                    ) : (
                        ""
                    )}
                    {addColumnForm ? (
                        <form className="addColumnForm" onSubmit={addColumn}>
                            <input
                                autoComplete="off"
                                type="text"
                                name="columnName"
                                placeholder="Nume pentru coloană"
                                defaultValue={""}
                            />
                            <button type="submit"> Adaugă </button>
                            <button onClick={() => setAddColumnForm(false)}>
                                Anulează
                            </button>
                        </form>
                    ) : (
                        <section className="columnsSection">
                            {renderColumnsSection()}
                        </section>
                    )}
                </main>
            ) : (
                <div className="lds-dual-ring"></div>
            )}
        </div>
    );
};

export default Board;
