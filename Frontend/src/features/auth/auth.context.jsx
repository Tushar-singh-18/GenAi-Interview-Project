import { createContext, useState } from "react";

export const Authcontext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    return (
        <Authcontext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </Authcontext.Provider >
    )
}