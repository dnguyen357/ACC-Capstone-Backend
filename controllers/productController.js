const asyncHandler = require('express-async-handler')

const Product = require('../models/productModel')


// @desc Get products  
// @route GET / api/product 
// @access Private 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

const getProductbyId = asyncHandler(async(req,res)=>{
    let product
    try{
        product = await Product.findById(req.params.id)
        if(product==null){
            return res.status(404).json({message: "Cannot find the product"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.status(200).json(product)
    
    
    
})
// @desc Set products 
// @route POST / api/products 
// @access Private 
const setProduct = asyncHandler(async (req, res) => {
    const product = new Product({ 
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category:req.body.category,
        image:req.body.image,
        rating:{
            rate: req.body.rating.rate,
            count: req.body.rating.count
        }
    })
    try{
        const newProduct = await product.save()
        res.status(200).json(newProduct)
    }catch(err){
        res.status(400).json({message: err.message})
    }
    
})

// @desc Update products 
// @route PUT / api/products/:id
// @access Private 

const updateProduct = asyncHandler(async (req, res) => {
    const updated = req.body
    
    try{
        if(!req.params.id){
            res.status(400)
            throw new Error('Product not found')
        }else{
           const updatedProduct = await Product.findOneAndUpdate({_id: req.params.id},updated,{
                new: true
           })
           res.status(200).json(updatedProduct)
        }
    }catch(err){
        res.status(404).json({message: err.message})
    }

})

// @desc Delete products 
// @route DELETE / api/products 
// @access Private 
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    //deleteproduct function
    const deletedProduct = await Product.findByIdAndDelete(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(deletedProduct)
})

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
    getProductbyId,
}