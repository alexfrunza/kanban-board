import { render } from "react-dom";
import { StrictMode } from "react";
import { RecoilRoot } from 'recoil';
import Navbar from "components/navbar/Navbar";
import Board from "components/board/Board";
import "index.css";

const App = () => {
    return (
        <RecoilRoot>
            <div>
                <Navbar />
                <Board />
            </div>
        </RecoilRoot>
    );
};

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
