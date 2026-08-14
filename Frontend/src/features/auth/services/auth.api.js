import axios from "axios"

const api = axios.create({
    baseURL:"//localhost:3000",
    withCredentials: true
})

async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', { username, email, password })

        return response.data

    } catch (err) {
        console.log(err);

    }

}

async function login({ email, password }) {

    try {
        const response = await api.post('/api/auth/login', { email, password })
        return response.data

    } catch (err) {
        console.log(err.response.data);

    }

}

async function logout(){

    try {

        const response = await api.get('/api/auth/logout')

        return response.data

    } catch (err) {
        console.log(err);

    }
}

async function getme(){

     try {

        const response = await api.get('/api/auth/get-me',)

        return response.data

    } catch (err) {
        console.log(err);

    }

}

export { register, login, logout, getme }