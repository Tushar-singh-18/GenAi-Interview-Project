import { useContext, useEffect } from "react";
import { Authcontext } from "../auth.context";
import { login, register, logout, getme } from "../services/auth.api"


export const useAuth = () => {

    const context = useContext(Authcontext)
    const { user, setUser, loading, setLoading } = context

    const handlelogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    const handleregister = async ({ username, email, password }) => {

        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }

    const handlelogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getme()
                setUser(data.user)
            } catch (error) {
                setUser(null)
                if (error.response?.status !== 401) {
                    console.error("Unable to restore the current session.", error)
                }
            } finally {
                setLoading(false)
            }
        }
        getAndSetUser()

    }, [])

    return { user, loading, handlelogin, handlelogout, handleregister }
}