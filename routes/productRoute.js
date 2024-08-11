const express=require('express');
const product = require('../schema/product');


const router=express.Router();


//Get All Post
router.get('/',async(req,res)=>{
    try{
        const products=await product.find()
        res.json(products)
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
            productType:req.body.productType,
            productModel:req.body.productModel,
            productImageUrl:req.body.productImageUrl,
            productPrice:req.body.productPrice,
            productQuantity:req.body.productQuantity,
            productColor:req.body.productColor,
            productDescription:req.body.productDescription,
        }

        const productRes=await product.create(data);
        res.status(201).json(productRes);
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})







module.exports=router;