import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { cardEditModal } from "store/board/boardState.js";
import "components/card/Card.css";

const Card = (props) => {
    const [id] = useState(props.value.id);
    const [name, setName] = useState(props.value.name);
    const [columnId] = useState(props.columnId);
    const [description, setDescription] = useState(props.value.description);
    const [labels, setLabels] = useState(props.value.labels);
    const [assignedTo, setAssignedTo] = useState(props.value.assignedTo);

    const setCardEdit = useSetRecoilState(cardEditModal);

    return (
        <div
            className="card"
            onClick={() => {
                setCardEdit(true);
            }}
        >
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
