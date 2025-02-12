import dotenv from 'dotenv'
dotenv.config({path:"./.env"})
import dbConnection from './config/datbaseConfig.js'
import app from './app.js'

dbConnection()
.then(()=>{
    app.listen(process.env.PORT||4000,()=>console.log(`--Server started on : ${process.env.PORT||4000}`))
})
.catch((error)=>{
    console.log("Server failed:",error)
})