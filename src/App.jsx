import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import AppLayout from "./pages/appLayout/AppLayout.jsx";
import Login from "./pages/login/Login.jsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />}/>
                <Route path={"product"} element={<Product />}/>
                <Route path={"pricing"} element={<Pricing />}/>
                <Route path={"login"} element={<Login />}/>
                <Route path={"app"} element={<AppLayout />}>
                    <Route index element={<p>List of cities visited</p>} />
                    <Route path={"cities"} element={<p>List of cities</p>} />
                    <Route path={"countries"} element={<p>List of countries</p>} />
                    <Route path={"form"} element={<p>Form</p>} />
                </Route>
                <Route path={"*"} element={<Pagenotfound />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;