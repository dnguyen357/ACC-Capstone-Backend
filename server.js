const express = require('express') //bring express in
const colors = require('colors') 
const cors = cors();
const dotenv = require('dotenv').config() //have environment variables 
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express() //initialize express

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.use(cors())
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/carts', require('./routes/cartRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))