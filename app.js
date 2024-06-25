const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const router = require("./src/routes") 

dotenv.config()

const app = express()
const LISTEN_PORT = process.env.LISTEN_PORT ? process.env.LISTEN_PORT : 3000
const MONGO_URL = process.env.MONGODB_URL

app.use(express.json())
app.use("", router)

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

connectDb()

app.listen(LISTEN_PORT, ()=>{
    console.log(`App running in : http://localhost:${LISTEN_PORT}`)
})
