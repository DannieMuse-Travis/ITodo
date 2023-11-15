import mongoose from "mongoose";
import {Request,Response} from "express"
import TodoModel, { iTodoData } from "../Model/TodoModel";
import { statusCode } from "../Config/StatusCode";
import moment from "moment"


export const createTodo = async (req: Request, res: Response) => {
    try {
      const { task, time } = req.body;
      let newTime = time * 1000;
  
      let realTime = new Date().getTime() + newTime;
  
      console.log(task);
      console.log(moment(Date.parse(time[1])).format("LLLL"));
  
      console.log(
        moment(
          Date.parse(
            "Mon Nov 06 2023 00:00:00 GMT+0100 (West Africa Standard Time)"
          )
        ).format("LLLL")
      );
  
      const todo = await TodoModel.create({
        task,
        deadLine: moment(Date.parse(time[1])).format("LLLL"),
      });
  
      let timing = setTimeout(async () => {
        await TodoModel.findByIdAndUpdate(
          todo._id,
          {
            achieved: "Terminated",
          },
          { new: true }
        );
  
        clearTimeout(timing);
        console.log("done");
      }, newTime);
  
      return res.status(statusCode.CREATED).json({
        message: "Created",
        data: todo,
      });
    } catch (error) {
      return res.status(statusCode.Bad_Request).json({
        message: "Error",
      });
    }
  };

  export const viewTodos = async(req:Request,res:Response)=>{
       try {
         const todo = await TodoModel.find().sort({createdAt: -1})

         return res.status(statusCode.OK).json({
            message:"find",
            data:todo
         })
       } catch (error) {
        return res.status(statusCode.Bad_Request).json({
            message: "Error",
          });
       }
  }

 export const viewOneTodo = async(req:Request,res:Response)=>{
    try {
        const {todoID} = req.params

        const todo = await TodoModel.findById(todoID)

        return res.status(statusCode.OK).json({
            message:"find",
            data:todo
        })
    } catch (error) {
        return res.status(statusCode.Bad_Request).json({
            message: "Error",
          });
    }
  }

  export const viewOneAndUpdateTodo = async (req:Request,res:Response)=>{
    try {
        const {done} = req.body;
        const {todoID} = req.params

        const check:iTodoData | null = await TodoModel.findById(todoID)
        if (!!check?.achieved) {
            return res.status(statusCode.Bad_Request).json({
              message: "Time has Elapse",
            });
          } else {
            const todo = await TodoModel.findByIdAndUpdate(
              todoID,
              { done },
              { new: true }
            );
      
            return res.status(statusCode.CREATED).json({
              message: "find",
              data: todo,
            });
          }
    } catch (error) {
        return res.status(statusCode.Bad_Request).json({
            message: "Error",
          });
    }
  }

  export const viewOneAndDeleteTodo = async (req: Request, res: Response) => {
    try {
      const { task, time } = req.body;
      const { todoID } = req.params;
  
      const todo = await TodoModel.findByIdAndDelete(todoID);
  
      return res.status(statusCode.CREATED).json({
        message: "find",
        data: todo,
      });
    } catch (error) {
      return res.status(statusCode.Bad_Request).json({
        message: "Error",
      });
    }
  };
  