import is from "@sindresorhus/is";
import { Router } from "express";
// import { login_required } from "../middlewares/login_required"; 나중에 한꺼번에 추가
import { projectAuthService } from "../services/projectService";

const projectAuthRouter = Router();

// 프로젝트 추가하기
projectAuthRouter.post("/user/:id/project", async function (req, res, next) {
  res.status(201).json("newProject");
  // try {
  //     if (is.emptyObject(req.body)) {
  //         throw new Error(
  //             "입력값이 없습니다."
  //         );
  //     }
  // const projectName = req.body.project;
  // const projectDetail = req.body.description;
  // const startDate = req.body.startDate;
  // const endDate = req.body.endDate;
    
  // const newProject = await projectAuthService.addProject({
  //     projectName,
  //     projectDetail,
  //     startDate,
  //     endDate
  //   });

  // if (newProject.errorMessage) {
  //   throw new Error('Error: ' + newProject.errorMessage);
  // }

  // res.status(201).json(newProject);
  // } catch (error) {
  //   next(error);
  // }
});

// 추가하기
projectAuthRouter.put("/user/:id/project", async function (req, res, next) {
  try {
    
    const projects = await projectAuthService.getProjects();

    if (projects.errorMessage) {
      throw new Error('Error: ' + projects.errorMessage);
    }

    res.status(201).send(projects);
  } catch (error) {
    next(error);
  }
});

projectAuthRouter.get("/projects", async function (req, res, next) {
  try {
    
    const projects = await projectAuthService.getProjects();

    if (projects.errorMessage) {
      throw new Error('Error: ' + projects.errorMessage);
    }

    res.status(201).send(projects);
  } catch (error) {
    next(error);
  }
});

// 특정 프로젝트 가져오기
// param으로 projectId를 받아와서 조회
projectAuthRouter.get("/user/:id/project/:projectId", async function (req, res, next) {
  const { projectId } = req.params;
  console.log(projectId);
  try {
    
    const projects = await projectAuthService.getProject({ projectId });

    if (projects.errorMessage) {
      throw new Error('Error: ' + projects.errorMessage);
    }

    res.status(201).send(projects);
  } catch (error) {
    next(error);
  }
});

export { projectAuthRouter };
