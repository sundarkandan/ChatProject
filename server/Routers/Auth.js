const express=require('express')
const {User}=require('../Schemas/schema.js')
const Router=express.Router()
const bcrypt=require('bcrypt')

Router.post('/authRegister',async (req,res)=>{
    const datas=req.body;
    const pass=await bcrypt.hash(req.body.password,10)
    console.log(datas)
    const creating=new User({firstname: datas.firstname,lastname: datas.lastname,userId: datas.userId,password: pass})
    try{
        await creating.save()
        res.send({msg:'User Saved successfully',result:'success',user:creating})
    }
    catch(err){
        if(err.code==11000){
             res.send({msg:'User Name Already Exist Try another one!.',result:'duplicate'})
        }
        else{
            res.send({msg:'User Name Already Exist Try another one!.',result:"error"})
        }
    }
    
    
})
Router.post('/authLogin',async (req,res)=>{
    const datas=req.body;
   
    const finding=await User.findOne({userId:datas.userId})
    console.log(finding) 
    if(finding==null){
        res.send({msg:'User Not Exist, Enter the UserId correctly or create One!',result:'fail'})
    }
    else{
        try{
        const pass=await bcrypt.compare(datas.password,finding.password)
        if(pass){
            res.send({msg:"User Authorized Successfully",result:"success",user:finding})
        }
        else{
            res.send({msg:"Password is wrong",result:"error"})
        }
        }
        catch(err){
            if(err.code==11000){
                res.send({msg:'User Name Already Exist Try another one!.',result:'duplicate'})
            }
            else{
                res.send({msg:'User Name Already Exist Try another one!.',result:"error"})
            }
        }
    }
   
    
    
})
module.exports=Router