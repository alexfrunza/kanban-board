import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
    const [boardName, setBoardName] = useState("My first board");
    const [boardNameEdit, setBoardNameEdit] = useState(false);
    const [searchString, setSearchString] = useState('');

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
                <h2 className="boardName">
                    { boardName }
                    <button 
                        className="editBoardTitle" 
                        onClick={() => setBoardNameEdit(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                </h2>
            );
        } else  {
            return (
                <form className="boardName" onSubmit={ submitBoardName }>
                    <input type="text" name="boardName" defaultValue={boardName} />
                    <button
                        className="editBoardTitle"
                        type="submit"
                    >
                        <i className="far fa-save"></i>
                    </button>
                </form>
            )
        }
    }



    return (
        <main className='board'>
            { boardNameTag() }
            <form 
                className="searchInBoard" 
                onSubmit={(event) => event.preventDefault()}>
                <input 
                    type="text"
                    name="search" 
                    value={ searchString }
                    onChange={(event) => setSearchString(event.target.value)}
                />
                <i className="fas fa-search"></i>
            </form>
        </main>
    );
}

export default Board;
