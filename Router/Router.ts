import {Router} from "express"
import { createTodo, viewOneAndDeleteTodo, viewOneAndUpdateTodo, viewOneTodo, viewTodos } from "../Controller/Controller"



const router:Router = Router()

router.route("/createTodo").post(createTodo)
router.route("/viewTodo").get(viewTodos)
router.route("/viewTodo/:todoID").get(viewOneTodo)
router.route("/updateTodo/:todoID").patch(viewOneAndUpdateTodo)
router.route("/deleteTodo/:todoID").delete(viewOneAndDeleteTodo)

export default router;