import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";



function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Homepage />}/>
                <Route path={"product"} element={<Product />}/>
                <Route path={"pricing"} element={<Pricing />}/>
                <Route path={"*"} element={<Pagenotfound />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;