import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Main } from "./pages";
import React, { useEffect } from "react";

const RouterApp = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Main />} />
            </Routes>
        </Router>
    );
};
export default RouterApp;