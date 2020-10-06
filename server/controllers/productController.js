import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.json(product)
})

export {
  getProducts,
  getProductById
}