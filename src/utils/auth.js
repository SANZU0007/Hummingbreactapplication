import { useState } from "react";
import { createContext, useContext } from "react";

const AuthContext = createContext()

export const Authprovider = ({children}) => {
    const [loggedUser, setloggedUser] = useState(null)


    const logIn = (user) => {
        setloggedUser(user)
    }

    const logOut = () => {
        setloggedUser(null)
    }

    return (
        <AuthContext.Provider value={{loggedUser, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}