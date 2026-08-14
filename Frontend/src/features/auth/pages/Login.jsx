import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

    const navigate = useNavigate()

    const { loading, handlelogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        await handlelogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main className='h-screen w-screen flex items-center justify-center bg-[#0a0a0f]'>
                <h1 className='text-slate-300 text-sm font-medium'>Signing you in...</h1>
            </main>
        )
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center bg-[#0a0a0f] px-4'>
            <main className='w-full max-w-sm'>

                <div className='text-center mb-8'>
                    <h1 className='text-2xl font-bold text-white'>Welcome back</h1>
                    <p className='text-sm text-slate-500 mt-1'>Log in to pick up where you left off</p>
                </div>

                <form onSubmit={handlesubmit} className='bg-[#12121a] border border-white/10 rounded-2xl p-7 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor="email" className='text-sm font-medium text-slate-300'>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            name='email'
                            id='email'
                            placeholder='you@example.com'
                            className='bg-[#0f0f16] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition'
                        />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor="password" className='text-sm font-medium text-slate-300'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            name='password'
                            id='password'
                            placeholder='••••••••'
                            className='bg-[#0f0f16] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition'
                        />
                    </div>

                    <button
                        type='submit'
                        className='mt-1 bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold rounded-lg py-2.5 transition'
                    >
                        Log in
                    </button>

                    <p className='text-center text-sm text-slate-500'>
                        Don't have an account?{' '}
                        <Link to="/register" className='text-pink-400 hover:text-pink-300 font-medium'>
                            Register
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    )
}

export default Login;