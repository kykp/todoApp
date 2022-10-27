import express from "express";
const taskRouter = express.Router();
taskRouter.post("/add", addTask);
taskRouter.post("/delete", deleteTask);
taskRouter.get("/get", getTasks);
export { taskRouter };
