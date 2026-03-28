const express=require('express')
const {User}=require('../Schemas/schema.js')
const Router=express.Router()
const bcrypt=require('bcrypt')


Router.post('/changePass', async(req,res)=>{
    const password=req.body.password;
    const user=req.body.user
   

    const getCurrent=await User.findOne({userId:user.userId}) 
    
    try{
        const compare=await bcrypt.compare(password.current,getCurrent.password)
        if(compare){
        const newPass=await bcrypt.hash(password.newPass,10)
        const changing=await User.updateOne({userId:user.userId},{$set:{password:newPass}})
        
    }
    else{
        res.send({msg:"you enter a wrong current password",result:'fail'})
    }
    }
    catch(err){
         res.send({msg:"Something went wrong",result:'error'})
    }
})

module.exports=Router