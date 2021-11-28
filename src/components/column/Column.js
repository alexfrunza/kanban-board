import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Card from "components/card/Card";
import {
    currentColumnState,
    numberOfCurrentColumnState,
    columnsState,
} from "store/board/boardState.js";
import "components/column/Column.css";

const Column = (props) => {
    const [number, setNumber] = useRecoilState(numberOfCurrentColumnState);
    const [columns, setColumns] = useRecoilState(columnsState);
    const data = useRecoilValue(currentColumnState);

    const [columnNameEdit, setColumnNameEdit] = useState(false);
    const [addCardEdit, setAddCardEdit] = useState(false);

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
        if (number !== 0) {
            setNumber(number - 1);
        } else {
            setNumber(columns.length - 1);
        }
        resetColumn();
    };

    const changeColumnRight = () => {
        if (number !== columns.length - 1) {
            setNumber(number + 1);
        } else {
            setNumber(0);
        }
        resetColumn();
    };

    const submitName = (event) => {
        event.preventDefault();
        const name = event.target.columnName.value.trim();
        if (name) {
            let columnsCpy = [...columns];
            columnsCpy[number] = { ...data, name };
            setColumns(columnsCpy);
            // TODO: Change column name to database
        }

        setColumnNameEdit(false);
    };

    const addCard = (event) => {
        // TODO: query to database to fetch an id
        event.preventDefault();
        let newCardName = event.target.newCardName.value.trim();
        if (newCardName) {
            let columnsCpy = [...columns];
            columnsCpy[number] = {
                ...data,
                cards: [{name: newCardName, id: 1034}, ...data.cards],
            };
            setColumns(columnsCpy);
            setAddCardEdit(false);
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
                        placeholder="Adauga un nume pentru articol..."
                    />
                    <button className="submitCard" type="submit">
                        Adauga articol
                    </button>
                    <button
                        className="cancel"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setAddCardEdit(false);
                        }}
                    >
                        Anulează
                    </button>
                </form>
            );
        }
        return "";
    };

    const showColumn = () => {
        if (data) {
            return (
                <div id={data.id} className="column">
                    <div className="columnHeader">
                        <button
                            className="changeColumn"
                            onClick={changeColumnLeft}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        {columnNameTag()}
                        <button
                            className="changeColumn"
                            onClick={changeColumnRight}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
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
        return "";
    };

    return <div>{showColumn()}</div>;
};

export default Column;
