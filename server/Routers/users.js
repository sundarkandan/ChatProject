const express=require('express')
const {User}=require('../Schemas/schema.js')
const Router=express.Router()

Router.post('/userDetails',async(req,res)=>{
    const datas=req.body;
    try{
        const modifying=await User.updateOne({_id:datas._id},{$set:{datas}})
        res.send({msg:"details changed successfully",result:"success"})
    }
    catch(err){
       res.send({msg:"details not changed",result:"error"})
    }
})

module.exports=Router