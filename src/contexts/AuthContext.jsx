import {createContext, useContext} from "react";

const AuthContext = createContext();


function AuthProvider({children}) {

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const ctx = useContext(AuthContext);

    if (ctx === undefined) {
        throw new Error("useAuth context must be used within the AuthProvider");
    }
}