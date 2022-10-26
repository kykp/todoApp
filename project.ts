import express, { Request, Response, NextFunction} from "express";
import ProjetSchema  from "./models/Project.js"
const projectRouter = express.Router();  

const addProject = async (req: Request, res: Response) => {
    // const { project, id, archive, deleted, weight } = req.body; 
    console.log(req.body)
    // try {
    //   const newProject = new ProjetSchema({
    //     project, id, archive, deleted, weight
    //   }); 
    //   await newProject.save();
    //   res.json(newProject);
    // } catch (error) { 
    //   console.log(error);
    // } finally{
    //     console.log("отработало")
    // }
  };

// projectRouter.use((req, res, next) => {
//     console.log("обработчик project");
//     next();
// })

const getProjects = async (req: Request, res: Response) => { 
    try {
        const projects = await ProjetSchema.find();
        res.json(projects);
      } catch (error) {
        console.log(error);
      }
  };

projectRouter.post("/add",addProject)
projectRouter.get("/get", getProjects)

export {projectRouter}