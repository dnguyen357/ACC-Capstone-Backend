//each resource in API will have own route file.
const express = require('express')
const router = express.Router()
const { getProducts, setProduct, updateProduct, deleteProduct,getProductbyId } = require('../controllers/productController') 

router.route('/').get(getProducts).post(setProduct) //one line instead of 2 (below)
router.get('/', getProducts)
router.get('/:id', getProductbyId)
//router.post('/', setGoal)

router.route('/:id').patch(updateProduct).delete(deleteProduct) //one line instead of 2 (below)



module.exports = router
