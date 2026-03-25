const express=require("express")
const cors=require("cors")
const bcrypt=require('bcrypt')
require('dotenv').config();
const mongoose=require('mongoose')
const http=require('http')
const {Server}=require('socket.io')
const app=express()
const multer=require('multer')
const path=require('path')

const Auth=require('./Routers/Auth.js')
const Password=require('./Routers/password.js')

app.use(express.json())
app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}))

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('Mongodb Database connected')
})

const uploads=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'/uploads/',Date.now()+path.extname(req.file.filename))
    }
    
})

app.use('/chatsite',Auth)
app.use('/password',Password)


const httpServer=http.createServer(app)

const io=new Server(httpServer,{cors:{
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}})

httpServer.listen(3001,()=>{
    console.log("server is running at port 3001...")
})