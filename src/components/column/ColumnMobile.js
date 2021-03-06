import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Card from "components/card/Card";
import {
    currentColumnState,
    numberOfCurrentColumnState,
    columnsState,
    searchState,
    searchedColumnsState,
} from "store/board/boardState.js";
import { warningMessageState, modalConfirmState } from "store/app/appState.js";
import { useParams } from "react-router-dom";
import { inputCleanUp } from "utils.js";
import "components/column/Column.css";

const ColumnMobile = (props) => {
    const setWarningMessage = useSetRecoilState(warningMessageState);
    const setModalConfirm = useSetRecoilState(modalConfirmState);
    const token = localStorage.getItem("token");
    const [number, setNumber] = useRecoilState(numberOfCurrentColumnState);
    const [columns, setColumns] = useRecoilState(columnsState);
    const search = useRecoilValue(searchState);
    const searchedColumns = useRecoilValue(searchedColumnsState);
    const data = useRecoilValue(currentColumnState);
    const params = useParams();

    const [columnNameEdit, setColumnNameEdit] = useState(false);
    const [addCardEdit, setAddCardEdit] = useState(false);

    useEffect(() => {
        setNumber(0);
    }, [search]);

    useEffect(() => {
        setNumber(0);
    }, []);

    useEffect(() => {
        if (columnNameEdit) {
            const columnDiv = document.getElementById(data.id);
            const input = columnDiv.querySelector("[name='columnName']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [columnNameEdit, data]);

    const resetColumn = () => {
        setColumnNameEdit(false);
        setAddCardEdit(false);
    };

    const changeColumnLeft = () => {
        let currentColumns = search ? searchedColumns : columns;
        if (number !== 0) {
            setNumber(number - 1);
        } else {
            setNumber(currentColumns.length - 1);
        }
        resetColumn();
    };

    const changeColumnRight = () => {
        let currentColumns = search ? searchedColumns : columns;
        if (number !== currentColumns.length - 1) {
            setNumber(number + 1);
        } else {
            setNumber(0);
        }
        resetColumn();
    };

    const deleteColumn = async () => {
        let response = await fetch(
            `http://127.0.0.1:5003/boards/${params.boardId}/columns/${data.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            setColumns(columns.filter(({ id }) => id !== data.id));
            if (number === 0) {
                resetColumn();
            } else {
                changeColumnLeft();
            }
        }
    };

    const submitName = async (event) => {
        event.preventDefault();
        const name = event.target.columnName.value.trim();
        setWarningMessage("");

        if (name) {
            let column = {
                name,
            };
            let response = await fetch(
                `http://127.0.0.1:5003/boards/${params.boardId}/columns/${data.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(column),
                }
            );
            if (response.status === 200) {
                let columnsCpy = [...columns];
                let number = columnsCpy.findIndex(
                    (column) => column.id === data.id
                );
                columnsCpy[number] = { ...data, name };
                setColumnNameEdit(false);
                setColumns(columnsCpy);
            } else {
                let result = await response.json();
                inputCleanUp("columnName");
                setWarningMessage(result.details);
            }
        } else setColumnNameEdit(false);
    };

    const addCard = async (event) => {
        event.preventDefault();
        let name = event.target.newCardName.value.trim();
        setWarningMessage("");

        if (name) {
            let card = {
                name,
            };

            let response = await fetch(
                `http://127.0.0.1:5003/boards/${params.boardId}/columns/${data.id}/cards`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(card),
                }
            );
            let result = await response.json();

            if (response.status === 201) {
                let columnsCpy = [...columns];
                let number = columnsCpy.findIndex(
                    (column) => column.id === data.id
                );
                columnsCpy[number] = {
                    ...data,
                    cards: [
                        { name, id: result.card_id, columnId: data.id },
                        ...data.cards,
                    ],
                };
                setColumns(columnsCpy);
                setAddCardEdit(false);
            } else {
                inputCleanUp("newCardName");
                setWarningMessage(result.details);
            }
        } else {
            setWarningMessage(
                "Trebuie sa introduci un nume pentru a crea o noua carte!"
            );
        }
    };

    const columnNameTag = () => {
        if (!columnNameEdit) {
            return (
                <div className="columnName">
                    <h3>{data.name}</h3>
                    <button
                        className="editColumnName"
                        onClick={() => setColumnNameEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        onClick={() =>
                            setModalConfirm({
                                show: true,
                                action: deleteColumn,
                                text: "E??ti sigur c?? dore??ti s?? ??tergi aceast?? coloan???",
                            })
                        }
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                    {addCardEdit ? (
                        ""
                    ) : (
                        <button
                            className="addCard"
                            onClick={() => setAddCardEdit(true)}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    )}
                </div>
            );
        } else {
            return (
                <form className="columnName" onSubmit={submitName}>
                    <input
                        type="text"
                        name="columnName"
                        placeholder="Nume pentru coloan??"
                        defaultValue={data.name}
                        autoComplete="off"
                    />
                    <button className="editColumnName" type="submit">
                        <i className="far fa-save"></i>
                    </button>
                </form>
            );
        }
    };

    const addCardForm = () => {
        if (addCardEdit) {
            return (
                <form className="addCard" onSubmit={addCard}>
                    <input
                        type="text"
                        name="newCardName"
                        defaultValue={""}
                        autoComplete="off"
                        placeholder="Adaug?? un nume pentru articol..."
                    />
                    <button className="submitCard" type="submit">
                        Adaug?? articol
                    </button>
                    <button
                        className="cancel"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setAddCardEdit(false);
                        }}
                    >
                        Anuleaz??
                    </button>
                </form>
            );
        }
        return "";
    };

    const showColumn = () => {
        if (data) {
            let currentColumns = [...columns];
            if (search) currentColumns = [...searchedColumns];
            return (
                <div id={data.id} className="column">
                    <div
                        className="columnHeader"
                        style={{
                            justifyContent:
                                currentColumns.length === 1
                                    ? "center"
                                    : "space-between",
                        }}
                    >
                        {currentColumns.length > 1 ? (
                            <button
                                className="changeColumn"
                                onClick={changeColumnLeft}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        ) : (
                            ""
                        )}
                        {columnNameTag()}
                        {currentColumns.length > 1 ? (
                            <button
                                className="changeColumn"
                                onClick={changeColumnRight}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    {addCardForm()}
                    <div className="cardsWraper">
                        {data.cards.map((card) => {
                            return <Card key={card.id} value={card} />;
                        })}
                    </div>
                </div>
            );
        }
        if (search)
            return (
                <p className="tips tips-red"> Nu au fost g??site rezultate </p>
            );
        return (
            <p className="tips">Sfat: Adaug?? o coloan?? utiliz??nd simbolul +</p>
        );
    };

    return <div>{showColumn()}</div>;
};

export default ColumnMobile;
