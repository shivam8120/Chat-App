import express from 'express'
import authRoutes from './Routes/authRoute.js'
import messegeRoute from './Routes/messegeRoute.js'
import cookieParser from 'cookie-parser'
import { app, server } from './Socket/Socket.js'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
const __dirname = path.resolve()
const port = 3000
app.use(cookieParser()); //for parsing cookies
app.use(express.json()); //for parsing application json
app.use('/api/auth',authRoutes)
app.use('/api/messages',messegeRoute)

if(process.env.MODE !== "development"){
    app.use(express.static(path.join(__dirname, "/FrontEnd/dist")))
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"FrontEnd","dist","index.html"))
    })
}

server.listen(port, () => {
    console.log(`server is running on  ${port}`)
})