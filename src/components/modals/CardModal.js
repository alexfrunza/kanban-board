import React, { useState, useEffect } from "react";
import "components/modals/CardModal.css";

const CardModal = (props) => {
    const [cardName, setCardName] = useState(props.cardName);
    const [cardNameEdit, setCardNameEdit] = useState(false);

    const [cardDescription, setCardDescription] = useState(
        props.cardDescription
    );
    const [cardDescriptionEdit, setCardDescriptionEdit] = useState(false);

    // TODO
    const [cardLabels, setCardLabels] = useState(props.cardLabels);
    const [cardAssignedTo, setCardAssignedTo] = useState(props.cardAssignedTo);

    const modifyCardName = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!cardName.trim()) {
            setCardName(props.cardName);
        }
        props.modifyCardName(cardName);
        setCardNameEdit(false);
    };

    const modifyCardDescription = (event) => {
        event.stopPropagation();
        event.preventDefault();
        props.modifyCardDescription(cardDescription.trim());
        setCardDescription(cardDescription.trim());
        setCardDescriptionEdit(false);
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
                    props.setModalEdit(false);
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
                        <button
                            onClick={modifyCardDescription}
                        >
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
                    <form
                        onSubmit={modifyCardDescription}
                    >
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
        </div>
    );
};

export default CardModal;
