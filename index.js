// ******* NPM imported
require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()

// ****** imported
const connectDB = require('./src/config/db.connect')
const authRouter = require('./src/routes/auth.route')
const categoryRouter = require('./src/routes/category.route')
const halqaRouter = require('./src/routes/halqa.route')

// ******** PORT 
const PORT = process.env.PORT || 3000

// ******** Cors 
app.use(cors())
app.use(express.json())
// ******** Connection to database
connectDB()

// ****** Routes
app.use('/api/user',authRouter)
app.use('/api/category',categoryRouter)
app.use('/api/halqa',halqaRouter)

// ******* Server 
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})