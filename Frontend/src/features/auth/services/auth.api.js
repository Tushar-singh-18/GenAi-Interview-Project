import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : ""),
    withCredentials: true
})

async function register({ username, email, password }) {
    const response = await api.post('/api/auth/register', { username, email, password })
    return response.data
}

async function login({ email, password }) {
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
}

async function logout(){
    const response = await api.get('/api/auth/logout')
    return response.data
}

async function getme(){
    const response = await api.get('/api/auth/get-me')
    return response.data
}

export { register, login, logout, getme }