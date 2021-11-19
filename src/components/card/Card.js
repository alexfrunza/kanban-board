import React, { useState, useEfect } from "react";
import "components/card/Card.css";

const Card = (props) => {
    console.log(props);
    const [description] = useState(props.value.description);

    return (
        <div className="card">
            <h3> {props.value.name} </h3>
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
