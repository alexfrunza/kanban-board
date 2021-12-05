import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
    cardEditModalState,
    columnsState,
    editedCardState,
} from "store/board/boardState.js";
import { useParams } from "react-router-dom";
import { inputCleanUp } from "utils.js";
import { warningMessageState, modalConfirmState } from "store/app/appState.js";
import "components/modals/CardEditModal.css";

const CardEditModal = (props) => {
    const token = localStorage.getItem("token");
    const setCardEdit = useSetRecoilState(cardEditModalState);
    const [editedCard, setEditedCard] = useRecoilState(editedCardState);
    const setWarningMessage = useSetRecoilState(warningMessageState);
    const setModalConfirm = useSetRecoilState(modalConfirmState);

    const [cardNameEdit, setCardNameEdit] = useState(false);
    const [cardDescriptionEdit, setCardDescriptionEdit] = useState(false);

    const [columns, setColumns] = useRecoilState(columnsState);
    const params = useParams();

    const sendModifiedCard = async (body) => {
        let response = await fetch(
            `http://127.0.0.1:5003/boards/${params.boardId}/columns/${editedCard.columnId}/cards/${editedCard.id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        if (response.status === 200) {
            return [true];
        } else {
            let result = await response.json();
            return [false, result.details];
        }
    };

    const replaceCard = (editedCardCpy) => {
        let columnsCpy = [...columns];
        let cardColumn = Object.assign(
            {},
            columnsCpy.find((column) => column.id === editedCard.columnId)
        );
        let cardColumnIndex = columnsCpy.findIndex(
            (column) => column.id === editedCard.columnId
        );

        cardColumn.cards = cardColumn.cards.map((card, index) => {
            if (card.id === editedCardCpy.id) return editedCardCpy;
            else return card;
        });

        columnsCpy[cardColumnIndex] = cardColumn;
        setColumns(columnsCpy);
        setEditedCard(editedCardCpy);
    };

    const deleteCard = (columns, columnId, cardId) => {
        let columnsCpy = [...columns];
        let cardColumn = Object.assign(
            {},
            columnsCpy.find((column) => column.id === columnId)
        );
        let cardColumnIndex = columnsCpy.findIndex(
            (column) => column.id === columnId
        );

        cardColumn.cards = cardColumn.cards.filter(
            (card) => card.id !== cardId
        );

        columnsCpy[cardColumnIndex] = cardColumn;
        return columnsCpy;
    };

    const addNewCard = (columns, columnId, cardObj) => {
        let cardObjCpy = { ...cardObj };
        cardObjCpy.columnId = columnId;

        let columnsCpy = [...columns];
        let cardColumn = Object.assign(
            {},
            columnsCpy.find((column) => column.id === columnId)
        );
        let cardColumnIndex = columnsCpy.findIndex(
            (column) => column.id === columnId
        );

        cardColumn.cards = cardColumn.cards.concat([cardObjCpy]);
        columnsCpy[cardColumnIndex] = cardColumn;
        return columnsCpy;
    };

    const modifyCardName = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setWarningMessage("");

        const name = document.querySelector('[name="cardName"]').value.trim();
        if (name) {
            const [modified, message] = await sendModifiedCard({ name });
            if (modified) {
                let editedCardCpy = {
                    ...editedCard,
                    name,
                };
                replaceCard(editedCardCpy);
                setCardNameEdit(false);
            } else {
                inputCleanUp("cardName");
                setWarningMessage(message);
            }
        } else setCardNameEdit(false);
    };

    const modifyCardDescription = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        setWarningMessage("");

        const description = document
            .querySelector('[name="cardDescription"]')
            .value.trim();

        const [modified, message] = await sendModifiedCard({ description });
        if (modified) {
            let editedCardCpy = {
                ...editedCard,
                description,
            };
            replaceCard(editedCardCpy);
            setCardDescriptionEdit(false);
        } else {
            inputCleanUp("cardDescription");
            setWarningMessage(message);
        }
    };

    const modifyCardColumn = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        setWarningMessage("");

        const newColumnId = parseInt(
            document.querySelector('[name="cardColumn"]').value
        );
        const [modified, message] = await sendModifiedCard({
            column_id: newColumnId,
        });
        if (modified) {
            let columnsCpy = [...columns];
            columnsCpy = deleteCard(
                columnsCpy,
                editedCard.columnId,
                editedCard.id
            );
            columnsCpy = addNewCard(columnsCpy, newColumnId, { ...editedCard });
            setColumns(columnsCpy);
            setEditedCard({ ...editedCard, columnId: newColumnId });
        } else {
            setWarningMessage(message);
        }
    };

    const deleteCardDb = async () => {
        setWarningMessage("");

        let response = await fetch(
            `http://127.0.0.1:5003/boards/${params.boardId}/columns/${editedCard.columnId}/cards/${editedCard.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            let columnsCpy = [...columns];
            columnsCpy = deleteCard(
                columnsCpy,
                editedCard.columnId,
                editedCard.id
            );
            setColumns(columnsCpy);
            setCardEdit(false);
        } else {
            let result = await response.json();
            setWarningMessage(result.details);
        }
    };

    useEffect(() => {
        if (cardNameEdit) {
            const input = document.querySelector("[name=cardName]");
            input.focus();
            input.select();
        }
    }, [cardNameEdit]);

    useEffect(() => {
        if (cardDescriptionEdit) {
            const input = document.querySelector("[name=cardDescription]");
            input.focus();
            input.select();
        }
    }, [cardDescriptionEdit]);

    return (
        <div className="modalMenu">
            <button
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setCardEdit(false);
                }}
            >
                <i className="fas fa-times close-modalEdit"></i>
            </button>
            <h2> Detalii articol </h2>
            <div className="cardField">
                <h4 className="cardFieldName">
                    Nume
                    {cardNameEdit ? (
                        <button onClick={modifyCardName}>
                            <i className="far fa-save"></i>
                        </button>
                    ) : (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                setCardNameEdit(true);
                            }}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                    )}
                </h4>
                {cardNameEdit ? (
                    <form onSubmit={modifyCardName}>
                        <input
                            name="cardName"
                            defaultValue={editedCard.name}
                            autoComplete="off"
                        />
                    </form>
                ) : (
                    <p>{editedCard.name}</p>
                )}
            </div>
            <div className="cardField">
                <h4 className="cardFieldName">
                    Descriere
                    {cardDescriptionEdit ? (
                        <button onClick={modifyCardDescription}>
                            <i className="far fa-save"></i>
                        </button>
                    ) : (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                setCardDescriptionEdit(true);
                            }}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                    )}
                </h4>
                {cardDescriptionEdit ? (
                    <form onSubmit={modifyCardDescription}>
                        <textarea
                            name="cardDescription"
                            defaultValue={editedCard.description}
                            autoComplete="off"
                        />
                    </form>
                ) : (
                    <p>{editedCard.description}</p>
                )}
            </div>
            <div className="cardField">
                <h4 className="cardFieldName">
                    Coloana
                    <button onClick={modifyCardColumn}>
                        <i className="far fa-save"></i>
                    </button>
                </h4>
                <form onSubmit={modifyCardColumn}>
                    <select
                        name="cardColumn"
                        defaultValue={editedCard.columnId}
                    >
                        {columns.map((column, index) => {
                            return (
                                <option value={column.id} key={column.id}>
                                    {`${index + 1}. ${column.name}`}
                                </option>
                            );
                        })}
                    </select>
                </form>
            </div>
            <button
                className="delete-card"
                onClick={(event) => {
                    event.preventDefault();
                    setModalConfirm({
                        show: true,
                        action: deleteCardDb,
                        text: "Esti sigur ca doresti sa stergi acest articol?",
                    });
                }}
            >
                Sterge articolul
            </button>
        </div>
    );
};

export default CardEditModal;
