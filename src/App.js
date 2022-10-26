import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage"
import {NewPage} from "./pages/NewPage";
import {FlatPage} from "./pages/FlatPage";
import {flats} from "./flats";
import {Header} from "./components/Header";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/new" element={<NewPage/>}/>
                <Route path="/flat/:id" element={<FlatPage flats={flats}/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Router>
    );
}

export default App;