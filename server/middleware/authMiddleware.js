import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  if (token && token.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
      const userId = decoded.id
      req.user = await User.findById(userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
})

export { protect }
