import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protect = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f3efe7] px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#dce2d7] border-t-[#49624d]" />
                    <h1 className="text-lg font-medium text-[#343a33]">Getting your workspace ready...</h1>
                    <p className="text-sm text-[#77776f]">Thanks for your patience.</p>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protect