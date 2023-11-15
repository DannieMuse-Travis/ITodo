import mongoose from "mongoose"
import { Await } from "react-router-dom"

const URL = "mongodb://127.0.0.1:27017/ProductDB"

export const MainConnection = async()=>{
    try {
        await mongoose.connect(URL).then(()=>{
            console.log("Connected to MongoDB 🚀🌟 ")
        })
    } catch (error) {
       console.log(error) 
    }
    
}