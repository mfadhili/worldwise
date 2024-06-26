import {createContext, useContext, useEffect, useReducer, useState} from "react";

const BASE_URl = 'http://localhost:9000';
const CitiesContext = createContext();



const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    errorMessage: "",
}

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            }
        case 'cities/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities,action.payload],
                currentCity: action.payload,
            }
        case 'cities/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {},
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

function CitiesProvider({children})
{
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    const [{cities, isLoading,currentCity, errorMessage}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            dispatch({type:"loading"});
            try {
                // setIsLoading(true)
                const res = await fetch(`${BASE_URl}/cities`);
                const data = await res.json();
                // setCities(data);
                dispatch({type:"cities/loaded", payload: data});
            } catch {
                // alert('There was an error loading the data')
                dispatch({type:"rejected", payload: "There was an error loading the data"})
            }
            // finally {
            //     setIsLoading(false)
            // }
        }

        fetchCities();
    }, []);


    async function createCities(newCity) {
        dispatch({type: "loading"});
        try {
            // setIsLoading(true);
            const res = await fetch(`${BASE_URl}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const data = await res.json();
            console.log(data);
            // setCities((cities) => [...cities, data])
            dispatch({type: "cities/created", payload:data});
        } catch {
            // alert('There was an error saving the data')
            dispatch({type:"rejected", payload: "There was an error saving the data"})

        }
        // finally {
        //     setIsLoading(false)
        // }
    }

    async function deleteCity(id) {
        dispatch({type: "loading"});
        try {
            // setIsLoading(true);
            await fetch(`${BASE_URl}/cities/${id}`, {
                method: 'DELETE',
            });
            // setCities((cities) => cities.filter((city) => city.id !== id));
            dispatch({type: "cities/deleted", payload: id})
        } catch {
            // alert('There was an error deleting the data');
            dispatch({type:"rejected", payload: "There was an error deleting the data"});

        }
        // finally {
        //     setIsLoading(false);
        // }
    }

  async  function getCity(id) {
        if (Number(id) === currentCity.id) {
            return;
        }
        dispatch({type: "loading"});
        try {
            // setIsLoading(true);
            const res = await fetch(`${BASE_URl}/cities/${id}`);
            const data = await res.json();
            // setCurrentCity(data);
            dispatch({type: "city/loaded", payload: data});
        } catch {
            // alert('There was an error loading the data');
            dispatch({type:"rejected", payload: "There was an error loading the data"});

        }
        // finally {
        //     setIsLoading(false);
        // }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            errorMessage,
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