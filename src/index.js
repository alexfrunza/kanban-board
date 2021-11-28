import { render } from "react-dom";
import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "components/navbar/Navbar";
import Board from "components/board/Board";
import Frontpage from "components/frontpage/Frontpage";
import About from "components/about/About";
import Register from "components/account/Register";
import Login from "components/account/Login";
import "index.css";

const App = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Frontpage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/*<div>
                        <Board />
                    </div>*/}
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
};

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
