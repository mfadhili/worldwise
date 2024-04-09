import {createContext, useContext, useReducer, useState} from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jonas",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

const initialState= {
    isAuthenticated: false,
    user: null,
};


function AuthProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: "login", payload: FAKE_USER})
        }
    }

    function logout() {
        dispatch({type: "logout" })
    }

    return (
        <AuthContext.Provider
            value={{user, isAuthenticated, login, logout}}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const ctx = useContext(AuthContext);

    if (ctx === undefined) {
        throw new Error("useAuth context must be used within the AuthProvider");
    }
    return ctx
}

export { AuthProvider, useAuth };