import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const { loading, handlelogin } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        try {
            await handlelogin({ email, password })
            navigate('/')
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Unable to log in. Please try again.")
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f3efe7] px-4 py-10 sm:px-6">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#e4ded3] bg-[#fbfaf6] shadow-[0_24px_70px_rgba(54,47,37,0.10)] lg:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative hidden flex-col justify-between overflow-hidden bg-[#49624d] p-10 text-[#fbfaf6] lg:flex xl:p-14">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
                    <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
                    <Link to="/" className="relative flex w-fit items-center gap-3 text-white">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 font-semibold">G</span>
                        <span className="text-sm font-semibold tracking-wide">GenAi</span>
                    </Link>
                    <div className="relative max-w-md">
                        <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-[#e2e8dd]">A calmer way to prepare</span>
                        <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Show up ready to tell your story.</h1>
                        <p className="mt-5 max-w-sm text-base leading-7 text-[#e0e6dc]">Turn the role you want into a clear, thoughtful plan for the conversation ahead.</p>
                    </div>
                    <p className="relative text-sm text-[#d3ddcf]">Your next opportunity starts with a little preparation.</p>
                </section>

                <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
                    <div className="w-full max-w-sm">
                        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#49624d] lg:hidden">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#49624d] text-white">G</span>
                            GenAi
                        </Link>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8b887f]">Welcome back</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#292d29]">Pick up where you left off.</h2>
                        <p className="mt-3 text-sm leading-6 text-[#73746c]">Log in to revisit your interview plans and keep preparing.</p>

                        <form onSubmit={handlesubmit} className="mt-8 flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-[#343a33]">Email address</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    className="rounded-xl border border-[#d8d2c7] bg-white px-4 py-3 text-sm text-[#292d29] outline-none transition placeholder:text-[#aaa69d] focus:border-[#60745e] focus:ring-4 focus:ring-[#60745e]/10"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-sm font-medium text-[#343a33]">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    className="rounded-xl border border-[#d8d2c7] bg-white px-4 py-3 text-sm text-[#292d29] outline-none transition placeholder:text-[#aaa69d] focus:border-[#60745e] focus:ring-4 focus:ring-[#60745e]/10"
                                />
                            </div>
                            {errorMessage && <p role="alert" className="rounded-lg border border-[#e8d0ca] bg-[#f8eeeb] px-3 py-2 text-sm text-[#934b3a]">{errorMessage}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-1 rounded-xl bg-[#49624d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3b5140] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#49624d] disabled:cursor-wait disabled:opacity-60"
                            >
                                {loading ? "Signing you in..." : "Log in"}
                            </button>
                        </form>

                        <p className="mt-7 text-center text-sm text-[#73746c]">
                            New to GenAi?{" "}
                            <Link to="/register" className="font-semibold text-[#49624d] underline decoration-[#b8c5b1] underline-offset-4 hover:text-[#3b5140]">Create an account</Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Login
