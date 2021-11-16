import { render } from "react-dom";
import { StrictMode } from 'react';
import Navbar from "components/navbar/Navbar";
import Board from "components/board/Board";
import 'index.css';

const App = () => {
    return (
        <div>
            <Navbar />
            <Board />
        </div>
    );
};

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
