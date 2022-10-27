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
import ProjetSchema from "./models/Project.js";
import TaskSchema from "./models/Tasks.js";
const projectRouter = express.Router();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield ProjetSchema.find();
        res.json(projects);
    }
    catch (error) {
        console.log(error);
    }
});
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project, id, archive, deleted, weight } = req.body;
    try {
        const newProject = new ProjetSchema({
            project, id, archive, deleted, weight
        });
        yield newProject.save();
        res.json(newProject);
    }
    catch (error) {
        console.log(error);
    }
});
const changeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project, id } = req.body;
    try {
        yield ProjetSchema.findOneAndUpdate({ id }, { $set: { project: project } }, { upsert: true });
        res.json();
    }
    catch (error) {
        console.log(error);
    }
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, project } = req.body;
    try {
        yield ProjetSchema.deleteOne({ id });
        yield TaskSchema.deleteMany({ project: id });
        res.json();
    }
    catch (error) {
        console.log(error);
    }
});
projectRouter.post("/add", addProject);
projectRouter.post("/delete", deleteProject);
projectRouter.post("/change", changeProject);
projectRouter.get("/get", getProjects);
export { projectRouter };
