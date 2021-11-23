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

    const changeColumnLeft = () => {
        if (number !== 0) {
            setNumber(number - 1);
        } else {
            setNumber(columns.length - 1);
        }
    };

    const changeColumnRight = () => {
        if (number !== columns.length - 1) {
            setNumber(number + 1);
        } else {
            setNumber(0);
        }
    };

    const submitName = (event) => {
        event.preventDefault();
        const name = event.target.columnName.value.trim();
        if (name) {
            let columnsCpy = [...columns];
            columnsCpy[number] = {...data, name};
            setColumns(columnsCpy);
            // TODO: Change column name to database
        }

        setColumnNameEdit(false);
    };

    const columnNameTag = () => {
        if (!columnNameEdit) {
            return (
                <h3 className="columnName">
                    {data.name}
                    <button
                        className="editColumnName"
                        onClick={() => setColumnNameEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                </h3>
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

    const showColumn = () => {
        if(data) {
            return (<div id={data.id} className="column">
            <div className="columnHeader">
                <button className="changeColumn" onClick={changeColumnLeft}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                {columnNameTag()}
                <button className="changeColumn" onClick={changeColumnRight}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
            {data.cards.map((data) => {
                return <Card columnId={data.id} key={data.id} value={data} />;
            })}
        </div>);
        }
        return "";
    }


    return (
        <div>
        {showColumn()}
    </div>
    );
};

export default Column;
