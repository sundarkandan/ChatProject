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
const profile=require("./Routers/profileImg.js")
const user=require("./Routers/users.js")

const {User}=require("./Schemas/schema.js")


app.use(express.json())
app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}))

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('Mongodb Database connected')
})



app.use('/chatsite',Auth)
app.use('/password',Password)
app.use('/profile',profile)
app.use('/user',user)

app.use('/profile', express.static(path.join(__dirname, 'profile')));

const httpServer=http.createServer(app)

const io=new Server(httpServer,{cors:{
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}}) 
const messages=[]
io.on('connection',(socket)=>{
      
    socket.on('userid',(data)=>{
        
        socket.join(data.sender)
    }) 
    socket.on('message',async (message)=>{
       const dat=new Date()
              const time=dat.toLocaleTimeString()
        const saving=await User.updateOne({userId:message.sender},{$push:{messages:{sender:message.sender,reciver:message.reciver,sendermsg:message.sendermsg, time:time}}})
        const saving2=await User.updateOne({userId:message.reciver},{$push:{messages:{sender:message.reciver,reciver:message.sender,recivermsg:message.sendermsg, time:time}}})
        const finding=await User.findOne({userId:message.sender})
        const finding2=await User.findOne({userId:message.reciver})
        io.to(message.reciver).emit('recive_message',finding2.messages)
        io.to(message.sender).emit('recive_message',finding.messages)
    })
    socket.on('istyping',(message)=>{
        console.log(message)
        io.to(message.reciver).emit('istyping',true)
    })
    socket.on('nottyping',(message)=>{
        console.log(message)
        io.to(message.reciver).emit('istyping',false)
    })
}) 
  
httpServer.listen(3001,()=>{
    console.log("server is running at port 3001...")
}) 