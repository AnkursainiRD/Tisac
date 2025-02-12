import express from 'express'
import cookieParser from 'cookie-parser'
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


import userRoutes from "./routes/userRoutes.js"

app.use("/api/v1/user",userRoutes)


export default app;