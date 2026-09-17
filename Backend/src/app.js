const express = require('express')
const authRouter = require('./routes/auth.routes') // requring all the routes here
const interviewRouter = require('./routes/interview.routes') // requring all interview routes here
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://gen-ai-delta-eight.vercel.app/" ],
        credentials: true
}))


app.use('/api/auth', authRouter) // using all the routes here
app.use('/api/interview', interviewRouter) // using for all the interview routes


module.exports = app