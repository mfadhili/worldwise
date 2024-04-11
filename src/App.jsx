import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import AppLayout from "./pages/appLayout/AppLayout.jsx";
import Login from "./pages/login/Login.jsx";
import CityList from "./components/city/cityList.jsx";
import CountryList from "./components/country/countryList.jsx";
import City from "./components/city/City.jsx";
import Form from "./components/form/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";



function App() {

    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Homepage />}/>
                        <Route path={"product"} element={<Product />}/>
                        <Route path={"pricing"} element={<Pricing />}/>
                        <Route path={"login"} element={<Login />}/>
                        <Route path={"app"} element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to={"cities"} replace />} />
                            <Route path={"cities"} element={<CityList  />} />
                            <Route path={"cities/:id"} element={<City />} />
                            <Route path={"countries"} element={<CountryList />} />
                            <Route path={"form"} element={<Form />} />
                        </Route>
                        <Route path={"*"} element={<Pagenotfound />}/>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;