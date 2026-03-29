const mongoose=require('mongoose')
const friendsSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    profile:String,
    userId:{
        type:String,
        required:true
    }
}, { _id: false })
const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    profile:String,
    userId:{
        unique:true,
        type:String
    },
    friends:[friendsSchema],
    password:String,
    messages:Array
})
const User=mongoose.model('user',userSchema)
module.exports={User}