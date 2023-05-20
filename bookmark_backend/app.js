import express from 'express'
import router from './routeHandlers/index.js'
//import { createTable } from './db/helperFunctions.js'
//import { getAllData } from './modelFunctions/index.js'
import cors from "cors";



const app = express()
const PORT = process.env.PORT
app.use(cors("*"));
app.use(express.json())
app.use(cors("*"));
app.use('/bookmark', router)

app.listen(PORT, ()=>{
    console.log('I am listening')
})
