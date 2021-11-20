import React, { useState, useEffect } from "react";
import Column from "components/column/Column";
import "components/board/Board.css";

const mockBoard = {
    name: "First Board",
    id: "123412348",
    users: [
        {
            username: "alexandru",
            id: "1689623",
            imgUrl: "https://avatarfiles.alphacoders.com/233/233054.jpg",
        },
        {
            username: "alexfrunza",
            id: "2341",
            imgUrl: "https://avatarfiles.alphacoders.com/233/233054.jpg",
        },
    ],
    columns: [
        {
            name: "My first column",
            id: "12941234",
            cards: [
                {
                    name: "My first card",
                    description: "",
                    id: "8383",
                    labels: [
                        {
                            name: "bug",
                            id: "12349",
                            color: "red",
                        },
                    ],
                    assignedTo: ["2341"],
                },
                {
                    name: "My second card",
                    description: "bla bla",
                    id: "801f383",
                    labels: [
                        {
                            name: "bug",
                            id: "12349",
                            color: "red",
                        },
                    ],
                    assignedTo: ["2341"],
                },
            ],
        },
        {
            name: "My second column it's amazing",
            id: "12341234",
            cards: [
                {
                    name: "My third card",
                    description: "bla bla",
                    id: "8383asear",
                    labels: [
                        {
                            name: "bug",
                            id: "12349",
                            color: "red",
                        },
                    ],
                    assignedTo: ["2341"],
                },
                {
                    name: "My forth card",
                    description: "bla bla",
                    id: "1511",
                    labels: [
                        {
                            name: "bug",
                            id: "12349",
                            color: "red",
                        },
                    ],
                    assignedTo: ["2341"],
                },
            ],
        },
    ],
};

const Board = () => {
    const [boardName, setBoardName] = useState("My first board");
    const [boardNameEdit, setBoardNameEdit] = useState(false);
    const [searchString, setSearchString] = useState("");

    const [columns, setColumns] = useState([]);

    // Fetch the data from API
    useEffect(() => {
        // TODO: fetch the data from API

        setBoardName(mockBoard.name);
        setColumns(mockBoard.columns);
    }, []);

    const submitBoardName = (event) => {
        event.preventDefault();
        const name = event.target.boardName.value.trim();
        if (name) {
            setBoardName(name);
            // TODO: Change board name to database
        }

        setBoardNameEdit(false);
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

    const boardNameTag = () => {
        if (!boardNameEdit) {
            return (
                <h2 className="boardName">
                    {boardName}
                    <button
                        className="editBoardTitle"
                        onClick={() => setBoardNameEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                </h2>
            );
        } else {
            return (
                <form className="boardName" onSubmit={submitBoardName}>
                    <input
                        type="text"
                        name="boardName"
                        defaultValue={boardName}
                        autoComplete="off"
                    />
                    <button className="editBoardTitle" type="submit">
                        <i className="far fa-save"></i>
                    </button>
                </form>
            );
        }
    };

    return (
        <main className="board">
            {boardNameTag()}
            <form
                className="searchInBoard"
                onSubmit={(event) => event.preventDefault()}
            >
                <input
                    autoComplete="off"
                    type="text"
                    name="search"
                    value={searchString}
                    onChange={(event) => setSearchString(event.target.value)}
                />
                <i className="fas fa-search"></i>
            </form>
            <section className="columnsSection">
                {columns.map((data) => {
                    return <Column key={data.id} value={data} />;
                })}
            </section>
        </main>
    );
};

export default Board;
