const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please enter a firstname'],

    },
    lastName:{
        type: String,
        required: [true, 'Please enter a lastname'],

    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please enter a password']
    },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('User' , userSchema)
