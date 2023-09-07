import React, { useContext } from 'react';
import { useState, createContext } from 'react'; 



const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [Auth, setAuth] = useState(null);

    const login = (Auth) => {
        setAuth(Auth);
    }

    const logout = () => {
     setAuth(null);       
    }


    return (
        <AuthContext.Provider value = {{Auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}