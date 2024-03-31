import {createContext, useContext, useEffect, useState} from "react";

const BASE_URl = 'http://localhost:9000';
const CitiesContext = createContext()

function CitiesProvider({children})
{
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({})

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

  async  function getCity(id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URl}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert('There was an error loading the data')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            setCities,
            isLoading,
            setIsLoading,
            currentCity,
            getCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

/* CUSTOM HOOK FOR USING THE CONTEXT*/
function useCities() {
    const context = useContext(CitiesContext);
    if ( context === undefined) {
        throw new Error(" Cities Context used outside Cities provider ")
    }
    return context;
}

export {useCities, CitiesProvider}