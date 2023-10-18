import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectAuthService } from "../services/projectService";

const projectAuthRouter = Router();

// 프로젝트 추가하기_login_required
projectAuthRouter.post("/user/:id/project", login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "프로젝트 추가에 입력값이 없습니다."
            );
        }
        const projectName = req.body.project;
        const projectDetail = req.body.projectDetail;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
    
        const newProject = await projectAuthService.addProject({
            projectName,
            projectDetail,
            startDate,
            endDate
        });
  
        if (newProject.errorMessage) {
            throw new Error('Error:', newProject.errorMessage);
        }
  
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 전체 가져오기_login_required
projectAuthRouter.get("/user/:id/projects", login_required, async function (req, res, next) {
    try {
        const projects = await projectAuthService.getProjects();

        if (projects.errorMessage) {
            throw new Error('Error:', projects.errorMessage);
        }

        res.status(201).send(projects);
    } catch (error) {
        next(error);
    }
});

// 특정 프로젝트 가져오기_login_required
projectAuthRouter.get("/user/:id/project/:projectId", login_required, async function (req, res, next) {
    const projectId = req.params.projectId;
    try {
        const projects = await projectAuthService.getProject({ projectId });

        if (projects.errorMessage) {
            throw new Error('Error:', projects.errorMessage);
        }

        res.status(201).send(projects);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 수정하기_login_required
projectAuthRouter.patch("/user/:id/project/:projectId", login_required, async function (req, res, next) {
    try {
        const project_id = req.params.projectId;

        // body data 로부터 업데이트할 프로젝트 정보를 추출
        const projectName = req.body.project ?? null;
        const projectDetail = req.body.projectDetail ?? null;
        const startDate = req.body.startDate ?? null;
        const endDate = req.body.endDate ?? null;

        const toUpdate = { projectName, projectDetail, startDate, endDate };

        const updatedProject = await projectAuthService.setProject({ project_id, toUpdate });

        if (updatedProject.errorMessage) {
            throw new Error('Error:', updatedProject.errorMessage);
        }

        res.status(201).send(updatedProject);
    } catch (error) {
        next(error);
    }
});

// 프로젝트 삭제하기_login_required
projectAuthRouter.delete("/user/:id/project/:projectId", login_required, async function (req, res, next) {
    const project_id = req.params.projectId;
    const id = req.params.id;
    try {
        const deletedProject = await projectAuthService.deleteProject({ project_id });

        if (deletedProject.errorMessage) {
            throw new Error('Error:', deletedProject.errorMessage);
        }

        res.status(200).json({
            redirect: `/user/${id}/projects`
        })
    } catch (error) {
        next(error);
    }
});

export { projectAuthRouter };
