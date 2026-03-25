const express=require('express')
const {User}=require('../Schemas/schema.js')
const Router=express.Router()
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"profile/")
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const uploads=multer({storage})

Router.post('/profileChange',uploads.single('profile'),async (req,res)=>{
    const file=req.file
    const userId=req.body.userId
    const profile=req.body.profile_data
    console.log(file)
    if(!file){
        res.send({msg:"Please Select a File",result:"fail"})
    }
    else{
        const urls=req.protocol+"://"+req.get('host')+"/profile/"+req.file.filename
        console.log(urls)
        const changing=await User.updateOne({userId},{$set:{profile:urls}})

        if(profile){
            const oldFileName = profile.split('/').pop();
            const oldFilePath = path.join(__dirname, '../profile', oldFileName);
            fs.unlink(oldFilePath,(err)=>{
                if(err){
                     res.send({msg:"previous Profile image not deleted",result:"warn"})
                }
                else{
                     res.send({msg:"Profile image upadated",result:"success"})
                }
            })
        }
       else{
         res.send({msg:"Profile image upadated",result:"success"})
       }
    }
})
Router.get('/',async(req,res)=>{
    const userId=req.query.userId
    const finding=await User.findOne({userId})
    res.send(finding)
    console.log("profile",finding)
})
module.exports=Router