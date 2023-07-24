import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const ContextProvider = ({children}) => {
    const [login, setLoggedIn] = useState(false)
    const [data, setData] = useState({})

    const params = {
        login,
        data,
        setData,
        setLoggedIn
    }

    useEffect(() => {
        setLoggedIn(localStorage.getItem('isLoggedIn'))
    },[])

    return (
        <AuthContext.Provider value={params}>
            {children} 
        </AuthContext.Provider>
    )
}