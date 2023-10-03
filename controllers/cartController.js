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
    const productID = req.body.products[0].productId
    const qty = req.body.products[0].quantity
    const pric = req.body.products[0].price
    const title = req.body.products[0].title
    const image = req.body.products[0].image
    const cart = await Cart.find({})
    
  try {

    const order = await Cart.findOne({userId: req.body.userId })
    
    // check if the user have a cart 
    if (order) {
        const orderList = cart[0].products
        const product = orderList.filter((item)=> item.productId == productID)
        // check if the product is in the cart
        if(product.length>0){
            const updatedCart = await Cart.updateOne(
                {'products.productId': productID},
                {'products.$.quantity': qty  ,'products.$.price': pric, 'products.$.title': title,'products.$.image': image},      
            )
            res.status(200).json(updatedCart)   
        }else{
            order.products.push({ productId: productID, quantity: qty, price: pric, title: title,image: image });
            await Cart.updateOne({ userId: req.body.userId }, { $set: { products: order.products } });
            res.status(200).json({ message: 'Product added successfully', order });
        }
    
    }else{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }
});

// @desc Update products 
// @route PUT / api/products/:id
// @access Private 

const updateCart = asyncHandler(async (req, res) => {

    const productID = req.body.products[0].productId
    const pric = req.body.products[0].price
    const title = req.body.products[0].title
    const image = req.body.products[0].image
    const quantity = req.body.products[0].quantity
    const cart = await Cart.find({})
    try{
        const orderList = cart[0].products
        const product = orderList.filter((item)=> item.productId == productID)

        if(!req.params.userId){
            res.status(400)
            throw new Error('User not found') 
        }else{
            if(product.length>0){
                const updatedCart = await Cart.updateOne(
                    {'products.productId': productID},
                    {'products.$.quantity': quantity  ,'products.$.price': pric, 'products.$.title': title,'products.$.image': image},      
                )
                res.status(200).json(updatedCart)      
            }else{
                res.status(400)
                throw new Error('Item not found') 
            }   
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