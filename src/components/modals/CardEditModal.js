import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cardEditModalState, columnsState } from "store/board/boardState.js";
import "components/modals/CardEditModal.css";

const CardEditModal = (props) => {
    const setCardEdit = useSetRecoilState(cardEditModalState);

    const [cardId] = useState(props.cardId);
    const [cardName, setCardName] = useState(props.cardName);
    const [cardNameEdit, setCardNameEdit] = useState(false);

    const [cardDescription, setCardDescription] = useState(
        props.cardDescription
    );
    const [cardDescriptionEdit, setCardDescriptionEdit] = useState(false);

    const [cardColumnId, setCardColumnId] = useState(props.columnId);
    const columns = useRecoilValue(columnsState);

    // TODO
    const [cardLabels, setCardLabels] = useState(props.cardLabels);
    const [cardAssignedTo, setCardAssignedTo] = useState(props.cardAssignedTo);

    const modifyCardName = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!cardName.trim()) {
            setCardName(props.cardName);
        }
        setCardNameEdit(false);
    };

    const modifyCardDescription = (event) => {
        event.stopPropagation();
        event.preventDefault();
        props.modifyCardDescription(cardDescription.trim());
        setCardDescription(cardDescription.trim());
        setCardDescriptionEdit(false);
    };

    const modifyCardColumn = (event) => {
        event.stopPropagation();
        event.preventDefault();
        props.changeCardColumn(cardId, props.columnId, cardColumnId);
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
            <h2> Modifică articolul </h2>
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
                            value={cardName}
                            onChange={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setCardName(event.target.value);
                            }}
                        />
                    </form>
                ) : (
                    <p>{cardName}</p>
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
                            value={cardDescription}
                            onChange={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setCardDescription(event.target.value);
                            }}
                        />
                    </form>
                ) : (
                    <p>{cardDescription}</p>
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
                        value={cardColumnId}
                        onChange={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setCardColumnId(event.target.value);
                        }}
                    >
                        {columns.map((column, index) => {
                            return (
                                <option value={column.id} key={column.id}>
                                {`${index + 1}. ${
                                    column.name
                                }`}</option>
                            );
                        })}
                    </select>
                </form>
            </div>
        </div>
    );
};

export default CardEditModal;
