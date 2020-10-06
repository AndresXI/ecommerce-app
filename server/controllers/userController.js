import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!(user && (await user.matchPassword(password)))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: null
  })
})

export {
  authUser
}
