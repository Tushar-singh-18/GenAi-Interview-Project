import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protect = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (<main><h1>Loading may take some time since I'am using free plan of Vercel</h1></main>)
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protect