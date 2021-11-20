import React, { useState } from "react";
import CardModal from "components/modals/CardModal";
import "components/card/Card.css";

const Card = (props) => {
    const [name, setName] = useState(props.value.name);
    const [description, setDescription] = useState(props.value.description);
    const [labels, setLabels] = useState(props.value.labels);
    const [assignedTo, setAssignedTo] = useState(props.value.assignedTo);
    const [modalEdit, setModalEdit] = useState(false);

    const modifyName = (text) => {
        console.log('foo');
        // TODO: API Call
        setName(text);
    }

    const modifyDescription = (text) => {
        // TODO: API CAll
        setDescription(text);
    }

    return (
        <div className="card" onClick={() => setModalEdit(true)}>
            {modalEdit ? (
                <CardModal
                    modifyCardName={modifyName}
                    modifyCardDescription={modifyDescription}
                    cardName={name}
                    cardDescription={description}
                    cardLabels={labels}
                    cardAssignedTo={assignedTo}
                    setModalEdit={setModalEdit}
                />
            ) : (
                ""
            )}
            <h3> {name} </h3>
            <div className="properties">
                {/* TODO: Implement labels and assignedTo */}
                <div className="assignedTo"></div>
                <div className="labels"></div>
                <i
                    className="fas fa-align-left description-icon"
                    style={{ display: description ? "inline-block" : "none" }}
                ></i>
            </div>
        </div>
    );
};

export default Card;
