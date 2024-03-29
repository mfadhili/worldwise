import {createContext, useContext, useEffect, useState} from "react";

const BASE_URl = 'http://localhost:9000';
const CitiesContext = createContext()

function CitiesProvider({children})
{
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
        <CitiesContext.Provider value={{
            cities,
            setCities,
            isLoading,
            setIsLoading,
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if ( context == undefined) {
        throw new Error(" Cities Context used outside Cities provider ")
    }
    return context;
}

export {useCities, CitiesProvider}