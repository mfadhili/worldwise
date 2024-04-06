import {createContext, useContext} from "react";

const FakeAuthContext = createContext();


function FakeAuthProvider({children}) {

    return (
        <FakeAuthContext.Provider>
            {children}
        </FakeAuthContext.Provider>
    )
}

function useFakeAuth() {
    const ctx = useContext(FakeAuthContext);

    if (ctx === undefined) {
        throw new Error("useFakeAuth context must be used within the FakeAuthProvider");
    }
}