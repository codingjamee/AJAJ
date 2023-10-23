const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/requireMiddleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');

const { projectAuthService } = require('../services/projectService'); // 수정된 서비스 파일을 import

const projectAuthRouter = Router(); // 라우터 이름도 변경

// 프로젝트 추가하기_login_required
projectAuthRouter.post("/user/:id/project", login_required, request_checked, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { projectName, projectDetail, projectUrl, projectStartDate, projectEndDate } = req.body;
    const newProject = await projectAuthService.addProject({ userId, projectName, projectDetail, projectUrl, projectStartDate, projectEndDate });

    if (!newProject) {
      throw new NotFoundError("해당 프로젝트가 생성되지 않았습니다.");
    }

    res.status(201).json({
      statusCode: 201,
      message: '프로젝트 추가 성공',
    });
  } catch (error) {
    next(error);
  }
});

// 프로젝트 전체 가져오기_login_required
projectAuthRouter.get("/user/:id/projects", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const projects = await projectAuthService.getProjects({ userId });

    if (!projects) {
      throw new NotFoundError("프로젝트를 가져올 수 없습니다.");
    }
    res.status(200).send({ projects });
  } catch (error) {
    next(error);
  }
});

// 특정 프로젝트 가져오기_login_required
projectAuthRouter.get("/user/:id/project/:projectId", login_required, async function (req, res, next) {
  try {
    const projectId = req.params.projectId;
    const project = await projectAuthService.getProject({ projectId });

    if (!project) {
      throw new NotFoundError("특정 프로젝트를 가져올 수 없습니다.");
    }
    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 수정하기_login_required
projectAuthRouter.put("/user/:id/project/:projectId", login_required, userId_checked, request_checked, async function (req, res, next) {
  try {
    const projectId = req.params.projectId;
    const { projectName, projectDetail, projectUrl, projectStartDate, projectEndDate } = req.body;
    const toUpdate = { projectName, projectDetail, projectUrl, projectStartDate, projectEndDate };

    const updatedProject = await projectAuthService.setProject({ projectId, toUpdate });

    if (!updatedProject) {
      throw new NotFoundError("해당 프로젝트가 수정되지 않았습니다.");
    }

    res.status(200).json({
      statusCode: 200,
      message: '프로젝트 수정 성공',
    });
  } catch (error) {
    next(error);
  }
});

// 프로젝트 삭제하기_login_required
projectAuthRouter.delete("/user/:id/project/:projectId", login_required, userId_checked, async function (req, res, next) {
  const projectId = req.params.projectId;
  try {
    const deleteProject = await projectAuthService.deleteProject({ projectId });

    if (!deleteProject) {
      throw new NotFoundError("해당 프로젝트가 삭제되지 않았습니다.");
    }

    res.status(200).json({
      statusCode: 200,
      message: '프로젝트 삭제 성공',
    });

  } catch (error) {
    next(error);
  }

});

export { projectAuthRouter };
