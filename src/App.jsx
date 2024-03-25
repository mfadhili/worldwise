import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import AppLayout from "./pages/appLayout/AppLayout.jsx";
import Login from "./pages/login/Login.jsx";
import CityList from "./components/city/cityList.jsx";
import CountryList from "./components/country/countryList.jsx";

const BASE_URl = 'http://localhost:9000'

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URl}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert('There was an error loading the data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />}/>
                <Route path={"product"} element={<Product />}/>
                <Route path={"pricing"} element={<Pricing />}/>
                <Route path={"login"} element={<Login />}/>
                <Route path={"app"} element={<AppLayout />}>
                    <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path={"cities"} element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path={"countries"} element={<CountryList cities={cities} isLoading={isLoading}/>} />
                    <Route path={"form"} element={<p>Form</p>} />
                </Route>
                <Route path={"*"} element={<Pagenotfound />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;