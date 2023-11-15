import {Application, Request,Response} from "express"
import todo  from "./Router/Router"
export const mainApp=(app:Application)=>{
    try {

        app.use("/api/", todo);
        app.get("/",(req:Request,res:Response)=>{
            return res.status(200).json({
                message:"Welcome Home"
            })
        })
    } catch (error) {
        console.log(error)
    }
}