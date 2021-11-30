import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
    cardEditModalState,
    columnsState,
    editedCardState,
} from "store/board/boardState.js";
import "components/modals/CardEditModal.css";

const CardEditModal = (props) => {
    const setCardEdit = useSetRecoilState(cardEditModalState);
    const [editedCard, setEditedCard] = useRecoilState(editedCardState);

    const [cardNameEdit, setCardNameEdit] = useState(false);
    const [cardDescriptionEdit, setCardDescriptionEdit] = useState(false);

    const [columns, setColumns] = useRecoilState(columnsState);

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
        let cardObjCpy = {...cardObj};
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

    const modifyCardName = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const newName = document.querySelector('[name="cardName"]').value;
        if (newName.trim()) {
            let editedCardCpy = {
                ...editedCard,
                name: newName,
            };
            replaceCard(editedCardCpy);
        }

        setCardNameEdit(false);
    };

    const modifyCardDescription = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const newDescription = document.querySelector(
            '[name="cardDescription"]'
        ).value;
        let editedCardCpy = {
            ...editedCard,
            description: newDescription.trim(),
        };
        replaceCard(editedCardCpy);

        setCardDescriptionEdit(false);
    };

    const modifyCardColumn = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const newColumnId = document.querySelector('[name="cardColumn"]').value;
        let columnsCpy = [...columns];
        columnsCpy = deleteCard(columnsCpy, editedCard.columnId, editedCard.id);
        columnsCpy = addNewCard(columnsCpy, newColumnId, {...editedCard});
        setColumns(columnsCpy);
        console.log('coloana schimbat');
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
                    Etichete
                    <button>
                        <i className="fas fa-edit"></i>
                    </button>
                </h4>
                <p> </p>
            </div>
            <div className="cardField">
                <h4 className="cardFieldName">
                    Atribuiri
                    <button>
                        <i className="fas fa-edit"></i>
                    </button>
                </h4>
                <p> </p>
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
        </div>
    );
};

export default CardEditModal;
