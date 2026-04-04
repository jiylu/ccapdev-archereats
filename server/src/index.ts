import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import routes from 'routes/index.js';
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api', routes)

export default app