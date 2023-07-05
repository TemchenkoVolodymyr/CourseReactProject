import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import fileUpload from 'express-fileupload'
import sequelize from './db.js';
import cors from 'cors'
import router from "./routes/index.js";
import errorHandler from '../server/middleware/ErrorHandlingMiddleWare.js'



const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', router)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({message: "Working"})
})

const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
  } catch(e) {
    console.error(`Failed to connect to the database. Error: ${e.message}`);
  }
}

start()

