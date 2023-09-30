const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get toke from header 
            token = req.headers.authorization.split(" ")[1]

            //verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token 
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user.id)
            console.log(req.params.userId)
            if (req.user.id == req.params.userId) {
                next();
              } else {
                res.status(403).json("You are not alowed to do that!");
              }

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')

        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token');
    }
    
}) 

module.exports = {protect}