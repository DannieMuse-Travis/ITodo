import {Document,Schema,model} from "mongoose";
 import { Itodo } from "../utils/interface";

 
 export interface iTodoData extends Itodo, Document{

 }
 

const TodoModel  = new Schema<iTodoData>(
    {
        task: {
          type: String,
        },
        achieved: {
          type: String || null,
          default: null,
        },
        deadLine: {
          type: String,
        },
        done: {
          type: String,
          default: "start",
        },
      },
      {
        timestamps: true,
      }
    );

//    converting it to model
export default model<iTodoData>("todos",TodoModel)