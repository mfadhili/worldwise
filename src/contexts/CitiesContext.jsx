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


    async function createCities(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URl}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const data = await res.json();
            console.log(data);
            setCities((cities) => [...cities, data])
        } catch {
            alert('There was an error saving the data')
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URl}/cities/${id}`, {
                method: 'DELETE',
            });
            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch {
            alert('There was an error deleting the data');
        } finally {
            setIsLoading(false);
        }
    }

  async  function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URl}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert('There was an error loading the data');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            setCities,
            isLoading,
            setIsLoading,
            currentCity,
            getCity,
            createCities,
            deleteCity
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