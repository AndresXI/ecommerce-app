import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import colors from 'colors'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // wipe out all data to start clean
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    // get admin user from User sample data
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data has been imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error ${error}`.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // wipe out all data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error ${error}`.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
