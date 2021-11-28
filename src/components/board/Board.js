import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Column from "components/column/Column";
import CardEditModal from "components/modals/CardEditModal";
import { cardEditModalState, columnsState } from "store/board/boardState.js";
import "components/board/Board.css";

const mockBoard = {
    name: "First Board",
    id: "123412348",
    user: {
        username: "alexfrunza",
        id: "2341",
        imgUrl: "https://avatarfiles.alphacoders.com/233/233054.jpg",
    },
    columns: [
        {
            name: "My first column",
            id: "12941234",
            cards: [
                {
                    columnId: "12941234",
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
                    columnId: "12941234",
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
                    columnId: "12341234",
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
                    columnId: "12341234",
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

    const setColumns = useSetRecoilState(columnsState);
    const cardEdit = useRecoilValue(cardEditModalState);

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
                <div className="boardName">
                    <h2> {boardName} </h2>
                    <button
                        className="editBoardTitle"
                        onClick={() => setBoardNameEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                </div>
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
            {cardEdit ? <CardEditModal /> : ""}
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
                <Column />
            </section>
        </main>
    );
};

export default Board;
