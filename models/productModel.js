const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {

        title:{
            type: String,
            required: [true,"Please enter a product name"]
        },
        price: {
            type: Number,
            required: [true, 'Please enter a price value']
        },
        description:{
            type: String,
            required: [true,"Please enter a product description"]
        },
        category:{
            type: String,
            required: [true,"Please enter a product category"]
        },
        image:{
            type: String,
            required: [true,"Please enter a product image"]
        },
        rating:[
            {
                rate:{
                    type: Number,
                    required: [true,"Please enter a rate"]
                },
                count:{
                    type: Number,
                    required: [true,"Please enter a count"]
                },
            }
        ]



    },
    {
        timestamps: true,
    }

)

module.exports = mongoose.model('Product', productSchema)