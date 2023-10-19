import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectAuthService } from "../services/projectService";

const projectAuthRouter = Router();

// 수상 추가
projectAuthRouter.post("/user/:id/award",
  login_required,
  async function (req, res, next) {
    try {
      const projects = await projectAuthService.getprojects();
  
      if (projects.errorMessage) {
        throw new Error('Error:', projects.errorMessage);
      }
  
      res.status(201).send(projects);
    } catch (error) {
      next(error);
    }
  });

// 학력전체 가져오기
projectAuthRouter.get("/awards", async function (req, res, next) {
  try {
    
    const projects = await projectAuthService.getprojects();

    if (projects.errorMessage) {
      throw new Error('Error:', projects.errorMessage);
    }

    res.status(201).send(projects);
  } catch (error) {
    next(error);
  }
});

export { projectAuthRouter };
