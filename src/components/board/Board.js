import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
    const [boardName, setBoardName] = useState("My first board");
    const [boardNameEdit, setBoardNameEdit] = useState(false);

    const submitBoardName = (event) => {
        event.preventDefault();
        const name = event.target.boardName.value;
        if(name) {
            setBoardName(name);
            // TODO: Change board name to database
        }

        setBoardNameEdit(false);
    }

    useEffect(() => {
        if(setBoardNameEdit) {
            const input = document.querySelector("[name='boardName']");
            if(input) {
                input.focus();
                input.select();
            }
        }
    }, [boardNameEdit]);

    const boardNameTag = () => {
        if(!boardNameEdit) {
            return (
                <h2 onClick={() => setBoardNameEdit(true)}>
                    { boardName }
                </h2>
            );
        } else {
            return (
                <form onSubmit={ submitBoardName }>
                    <input type="text" name="boardName" defaultValue={boardName} />
                </form>
            )
        }
    }



    return (
        <main className='board'>
            <div>
                { boardNameTag() }
            </div>
                
        </main>
    );
}

export default Board;
