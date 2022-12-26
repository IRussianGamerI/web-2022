import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage"
import {NewPage} from "./pages/NewPage";
import {AdPage} from "./pages/AdPage";
import {Header} from "./components/Header";
import {CartPage} from "./pages/CartPage";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/new" element={<NewPage/>}/>
                <Route path="/ad/:id" element={<AdPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
}

export default App;