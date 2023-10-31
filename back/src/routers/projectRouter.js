const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/requireMiddleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');
const { projectAuthService } = require('../services/projectService');
// const { imageUploader } = require("../middlewares/awssdkMiddleware");


const projectAuthRouter = Router();

// 프로젝트 추가하기
projectAuthRouter.post("/user/:id/project", login_required, request_checked, //imageUploader.single('image'),
  async function (req, res, next) {
  try {
    const userId = req.params.id;
    //const projectImgUrl = req.file.location;
    // const { projectName, projectDetail, projectStartDate, projectEndDate } = req.body;
    const { projectName, projectDetail, projectImgUrl, projectStartDate, projectEndDate } = req.body;
    const newProject = await projectAuthService.addProject({ userId, projectName, projectDetail, projectImgUrl, projectStartDate, projectEndDate });

    if (!newProject) {
      throw new NotFoundError("해당 프로젝트가 생성되지 않았습니다.");
    }

    res.status(201).send({
      projectId: newProject.projectId,
      message: "프로젝트 추가에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }
});

// 프로젝트 전체 가져오기
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


// 프로젝트 수정하기
projectAuthRouter.put("/user/:id/project/:projectId", login_required, userId_checked, request_checked, async function (req, res, next) {
  try {
    const projectId = req.params.projectId;
    const { projectName, projectDetail, projectImgUrl, projectStartDate, projectEndDate } = req.body;
    const toUpdate = { projectName, projectDetail, projectImgUrl, projectStartDate, projectEndDate };

    const updatedProject = await projectAuthService.setProject({ projectId, toUpdate });

    if (!updatedProject) {
      throw new NotFoundError("해당 프로젝트가 수정되지 않았습니다.");
    }

    res.status(200).send({
      message: "프로젝트 수정에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }
});

// 프로젝트 삭제하기
projectAuthRouter.delete("/user/:id/project/:projectId", login_required, userId_checked, async function (req, res, next) {
  const projectId = req.params.projectId;
  try {
    const deleteProject = await projectAuthService.deleteProject({ projectId });

    if (!deleteProject) {
      throw new NotFoundError("해당 프로젝트가 삭제되지 않았습니다.");
    }

    res.status(200).send({
      message: "프로젝트 삭제에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }

});

export { projectAuthRouter };
