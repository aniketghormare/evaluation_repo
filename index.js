



const express=require("express")

const { userRouter } = require("./router/user.router")
const { connection } = require("./db")
const { instaRoute } = require("./router/insta.router")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",instaRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
  
})