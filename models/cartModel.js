const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        products:[
            {
                productId:{
                    type: String,
                },
                quantity:{
                    type: Number,
                    default:1
                },
                price:{
                    type: Number,
                },
                title:{
                    type: String,
                },
                image:{
                    type: String,
                },
            },
        ],
        
    },
    {
        timestamps: true,
    }

)

module.exports = mongoose.model('Cart', cartSchema)