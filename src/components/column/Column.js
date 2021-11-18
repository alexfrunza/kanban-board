import React, { useState, useEffect } from "react";
import "components/column/Column.css";

const Column = (props) => {
    const [name, setName] = useState(props.value.name);
    const [id] = useState(props.value.id);
    const [columnNameEdit, setColumnNameEdit] = useState(false);

    useEffect(() => {
        if (columnNameEdit) {
            const columnDiv = document.getElementById(id);
            const input = columnDiv.querySelector("[name='columnName']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [columnNameEdit, id]);

    const submitName = (event) => {
        event.preventDefault();
        const name = event.target.columnName.value;
        if (name) {
            setName(name);
            // TODO: Change column name to database
        }

        setColumnNameEdit(false);
    };

    const columnNameTag = () => {
        if (!columnNameEdit) {
            return (
                <h3 className="columnName">
                    {name}
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
                        defaultValue={name}
                        autoComplete="off"
                    />
                    <button className="editColumnName" type="submit">
                        <i className="far fa-save"></i>
                    </button>
                </form>
            );
        }
    };

    return (
        <div id={id} className="column">
            {columnNameTag()}
        </div>
    );
};

export default Column;
