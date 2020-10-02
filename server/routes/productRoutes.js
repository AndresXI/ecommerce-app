import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()

// GET /api/products, get all products
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}))

// GET api/products/:id, get product by Id
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
}))

export default router