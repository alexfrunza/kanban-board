import { React, useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { columnsState } from "store/board/boardState.js";
import { warningMessageState, modalConfirmState } from "store/app/appState.js";
import { useParams } from "react-router-dom";
import Card from "components/card/Card";

const ColumnDesktop = (props) => {
    const setWarningMessage = useSetRecoilState(warningMessageState);
    const setModalConfirm = useSetRecoilState(modalConfirmState);
    const data = props.value;
    const token = localStorage.getItem("token");
    const [columns, setColumns] = useRecoilState(columnsState);
    const [columnNameEdit, setColumnNameEdit] = useState(false);
    const [addCardEdit, setAddCardEdit] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (columnNameEdit) {
            const columnDiv = document.getElementById(data.id);
            const input = columnDiv.querySelector("[name='columnName']");
            if (input) {
                input.focus();
                input.select();
            }
        }
    }, [columnNameEdit]);

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
                setWarningMessage(result.details);
            }
        } else {
            setWarningMessage(
                "Trebuie să introduci un nume pentru a crea o nouă carte!"
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
                                text: "Ești sigur că dorești să ștergi această coloană?",
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
                        placeholder="Nume pentru coloană"
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
                        placeholder="Adaugă un nume pentru articol..."
                    />
                    <button className="submitCard" type="submit">
                        Adaugă articol
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
                    <div className="columnHeader">{columnNameTag()}</div>
                    {addCardForm()}
                    <div className="cardsWraper">
                        {data.cards.map((card) => {
                            return <Card key={card.id} value={card} />;
                        })}
                    </div>
                </div>
            );
        }
        return (
            <p className="tips">Sfat: Adaugă o coloană utilizând simbolul +</p>
        );
    };

    return <div>{showColumn()}</div>;
};

export default ColumnDesktop;
