var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import TaskSchema from "./models/Tasks.js";
const taskRouter = express.Router();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield TaskSchema.find();
        res.json(tasks);
    }
    catch (error) {
        console.log(error);
    }
});
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, status, project, archive, deleted } = req.body;
    try {
        const newTask = new TaskSchema({
            id, title, status, project, archive, deleted
        });
        yield newTask.save();
        res.json(newTask);
    }
    catch (error) {
        console.log(error);
    }
});
const changeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, status, project, archive, deleted } = req.body;
    try {
        yield TaskSchema.findOneAndUpdate({ id }, { $set: { title, status, project, archive, deleted
            } });
        res.json();
    }
    catch (error) {
        console.log(error);
    }
});
const deleteTask = () => { };
taskRouter.post("/add", addTask);
taskRouter.post("/change", changeTask);
taskRouter.post("/delete", deleteTask);
taskRouter.get("/get", getTasks);
export { taskRouter };
