import { Project } from "../db"; // Project 모델을 import
import { v4 as uuidv4 } from "uuid";

class projectAuthService {
  static async addProject( projectInfo ) {
    const projectId = uuidv4();
    const newProject = { projectId, ...projectInfo };
    const createdNewProject = await Project.create({ newProject });
    return createdNewProject;
  }

  static async checkProject({ projectId }) {
    const user = await Project.checkProjectId({ projectId });
    return user;
  }

  static async getProjects({ userId }) {
    const projects = await Project.findAll({ userId });
    return projects;
  }

  static async getProject({ projectId }) {
    const project = await Project.findByProjectId({ projectId });
    return project;
  }

  static async setProject({ projectId, toUpdate }) {
    let project = await Project.findByProjectId({ projectId });

    // DB에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage = "해당 프로젝트가 없습니다";
      return { errorMessage };
    }

    // 업데이트 대상에 projectName이 있다면 업데이트 진행
    if (toUpdate.projectName) {
      const fieldToUpdate = "projectName";
      const newValue = toUpdate.projectName;
      project = await Project.findOneAndUpdate({ projectId }, { [fieldToUpdate]: newValue }, { new: true });
    }

    // 다른 필드에 대한 업데이트도 유사한 방식으로 수행

    return project;
  }

  static async deleteProject({ projectId }) {
    const result = await Project.deleteOne({ projectId });
    return result;
  }
}

export { projectAuthService };
