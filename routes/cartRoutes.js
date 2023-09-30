//each resource in API will have own route file.
const express = require('express')
const router = express.Router()
const {protect} =require("../middleware/authMiddleware")
const {verifyUser} =require("../middleware/verifyUser")
const { getCarts, setCart, updateCart, deleteCart,getCartbyId,getCartbyUserId } = require('../controllers/cartController') 

// router.route('/').get(getCarts).post(setCart) //one line instead of 2 (below)
router.get('/', getCarts)
router.get('/:id',protect, getCartbyId)
router.get('/find/:userId',protect, getCartbyUserId)
router.post('/',verifyUser, setCart)

// router.route('/:id').patch(updateCart).delete(deleteCart) //one line instead of 2 (below)
router.patch('/:userId',protect, updateCart)
router.delete('/:id',protect, deleteCart)


module.exports = router