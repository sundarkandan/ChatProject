const express=require("express")
const cors=require("cors")
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')

const http=require('http')
const {Server}=require('socket.io')

const app=express()

app.use(express.json())
app.use(cors({
       origin:"*",
       methods:['GET','POST','PUT','DELETE']
}))

const httpServer=http.createServer(app)

const io=new Server(httpServer,{cors:{
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}})

httpServer.listen(3001,()=>{
    console.log("server is running...")
})