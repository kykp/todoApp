import express, { Request, Response, NextFunction} from "express";
import { projectRouter } from "./project.js"; 
import { startBaseMongo } from "./mongoconnect.js";
import  cors from "cors";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json());  
app.use("/projects", projectRouter); 

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.log(err.message);
//   res.status(401).send(err.message);
// })
  
app.listen(PORT, () => {
  startBaseMongo();
  console.log(`Server started on port: ${PORT}`);
});
