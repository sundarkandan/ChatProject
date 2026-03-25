const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    profile:String,
    userId:{
        unique:true,
        type:String
    },
    password:String
})
const User=mongoose.model('user',userSchema)
module.exports={User}