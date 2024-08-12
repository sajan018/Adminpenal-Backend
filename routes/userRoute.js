const express=require('express');
const adminUser = require('../schema/user');


const router=express.Router();


//Get All Post
router.get('/',async(req,res)=>{
    try{
        const adminUsers=await adminUser.find()
        res.json(adminUsers)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})


//Created New Post
router.post('/',async(req,res)=>{
    try{
        const data={
            Email:req.body.Email,
            password:req.body.password
        }

        const UserRes=await adminUser.create(data);
        res.status(201).json(UserRes);
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})







module.exports=router;