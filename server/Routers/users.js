const express=require('express')
const {User}=require('../Schemas/schema.js')
const Router=express.Router()

Router.post('/userDetails',async(req,res)=>{
    const datas=req.body;
  
    try{
        const modifying=await User.updateOne({userId:datas.userId},{$set:datas})
        console.log('from try statement',datas)
         const changeForAll=await User.updateMany(
                    {'friends.userId':datas.userId},
                    {
                       $set: { 
                   
                    "friends.$[elem].firstname": datas.firstname,
                    "friends.$[elem].lastname": datas.lastname,
                    
                } 
                    },
                    { 
                        arrayFilters: [{ "elem.userId": datas.userId }]
                    }
                )
        res.send({msg:"details changed successfully",result:"success"})
    }
    catch(err){
        console.log(err)    
       res.send({msg:"details not changed",result:"error"})
    }
})
Router.get('/',async (req,res)=>{
    const userId=req.query.userId;
    const finding=await User.findOne({userId})
    
    if(finding){
        res.send(finding)
    }
})
Router.get('/allUsers',async (req,res)=>{
   
    const finding=await User.find()
  
    if(finding){
        res.send(finding)
    }
})
Router.post('/addFriend',async (req,res)=>{
    const user=req.body.user;
    const friend=req.body.friend
    const friendName=await User.findOne({userId:friend})
    
    try{
        const adding=await User.updateOne({userId:user},{$addToSet:{friends:friendName}})
      
        res.send({msg:friendName.firstname+" "+friendName.lastname+" is Now Your Friend",result:"success"})
        
    }
    catch(err){
        console.log(err)
        res.send({msg:"friend not added",result:'error'})
    } 
})
module.exports=Router