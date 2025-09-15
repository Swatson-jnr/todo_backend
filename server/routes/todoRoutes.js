import express from "express";
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
  markTodoComplete,
} from "../controllers/todoController.js";
import userAuth from "../middleware/userAuth.js";

const todoRouter = express.Router();

todoRouter.post("/add", userAuth, addTodo);
todoRouter.get("/", userAuth, getAllTodos);
todoRouter.patch("/:id", userAuth, updateTodo);
todoRouter.post("/completed/:id", userAuth, markTodoComplete);
todoRouter.delete("/delete/:id", userAuth, deleteTodo);

export default todoRouter;
