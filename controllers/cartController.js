const asyncHandler = require('express-async-handler')

const Cart = require('../models/cartModel')


// @desc Get products  
// @route GET / api/product 
// @access Private 
const getCarts = asyncHandler(async (req, res) => {
    const carts = await Cart.find()
    res.status(200).json(carts)
})

const getCartbyId = asyncHandler(async(req,res)=>{
    let cart
    try{
        cart = await Cart.findById(req.params.id)
        if(cart==null){
            return res.status(404).json({message: "cart is empty"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.status(200).json(cart)
    
    
    
})
const getCartbyUserId = asyncHandler(async(req,res)=>{
    let cart
    try{
        cart = await Cart.find({ userId: req.params.userId})

        if(cart==null){
            return res.status(404).json({message: "cart is empty"})
        }

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.status(200).json(cart)
    
    
    
})

// @desc Set products 
// @route POST / api/products 
// @access Private 
const setCart = asyncHandler(async (req, res) => {
    const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json({message:err.message});
  }
});

// @desc Update products 
// @route PUT / api/products/:id
// @access Private 

const updateCart = asyncHandler(async (req, res) => {

    const productID = req.body.products[0].productId
    const qty = req.body.products[0].quantity
    try{
        
        if(!req.params.id){
            res.status(400)
            throw new Error('Cart not found') 
        }else{
            const updatedCart = await Cart.updateOne(
                {'products.productId': productID},
                {'products.$.quantity': qty},
                {new:true}
            )             
            res.status(200).json(updatedCart)    
                
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

// @desc Delete products 
// @route DELETE / api/products 
// @access Private 
const deleteCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id)
    if(!cart) {
        res.status(400)
        throw new Error('Product not found')
    }

    //deleteproduct function
    const deletedCart = await Cart.findByIdAndDelete(req.params.id, req.body,{
        new : true,
    })
    res.status(200).json(deletedCart)
})

module.exports = {
    getCarts,
    setCart,
    updateCart,
    deleteCart,
    getCartbyId,
    getCartbyUserId,
}