import React from "react";
import { useSetRecoilState } from "recoil";
import { cardEditModalState, editedCardState } from "store/board/boardState.js";
import "components/card/Card.css";

const Card = (props) => {
    const data = props.value;

    const setCardEdit = useSetRecoilState(cardEditModalState);
    const setEditedCard = useSetRecoilState(editedCardState);

    return (
        <div
            className="card"
            onClick={() => {
                setCardEdit(true);
                setEditedCard(data);
            }}
        >
            <h3> {data.name} </h3>
            <div className="properties">
                {/* TODO: Implement labels and assignedTo */}
                <div className="assignedTo"></div>
                <div className="labels"></div>
                <i
                    className="fas fa-align-left description-icon"
                    style={{
                        display: data.description ? "inline-block" : "none",
                    }}
                ></i>
            </div>
        </div>
    );
};

export default Card;
