const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { InstaModel } = require("../model/insta.model")



const instaRoute=express.Router()

instaRoute.post("/add",auth,async(req,res)=>{
    const {title,body,device,no_of_comments,userId,user}=req.body
     try {
        const add=new InstaModel({title,body,device,userId,user,no_of_comments})
        await add.save()
        res.json({msg:"insta added"})
     } catch (error) {
        res.json({msg:"insta not added",error})
     }
})

instaRoute.get("/",auth,async(req,res)=>{
    try {
        const {device,page}=req.query
        let skip
        if(page){
            skip=(page-1)*3
        }else{
            skip=0
        }
        let query={userId:req.body.userId}
        if(device){
            query.device=device
        }
        const users=await InstaModel.find(query).skip(skip).limit(3)
        res.json({msg:"getting data",users})
    } catch (error) {
        res.json({msg:"not getting data"})
    }
})

instaRoute.get("/top",auth,async(req,res)=>{
    try {
        const {device,page}=req.query
        let skip
        if(page){
            skip=(page-1)*3
        }else{
            skip=0
        }
        let query={userId:req.body.userId}
       
        const users=await InstaModel.find(query).skip(skip).limit(3)
        res.json({msg:"getting data",users})
    } catch (error) {
        res.json({msg:"not getting data"})
    }
})

instaRoute.patch("/update/:instaid",auth,async(req,res)=>{
    const {instaid}=req.params
    const useriddoc=req.body.userId
    try {
        const users=await InstaModel.findOne({_id:instaid})
        const instauserid=users.userId
        if(useriddoc===instauserid){
            
           await InstaModel.findByIdAndUpdate({_id:instaid},req.body)
           res.json({msg:"data updated"})
        }else{
            res.json({msg:"data not updated"})
        }
    } catch (error) {
        res.json({msg:error})
    }
})


instaRoute.delete("/delete/:instaid",auth,async(req,res)=>{
    const {instaid}=req.params
    const useriddoc=req.body.userId
    try {
        const users=await InstaModel.findOne({_id:instaid})
        const instauserid=users.userId
        if(useriddoc===instauserid){
            
           await InstaModel.findByIdAndDelete({_id:instaid})
           res.json({msg:"data Deleted"})
        }else{
            res.json({msg:"data not Deleted"})
        }
    } catch (error) {
        res.json({msg:error})
    }
})



module.exports={
    instaRoute
}



