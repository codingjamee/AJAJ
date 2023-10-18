import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class projectAuthService {
    static async getProjects() {
        const projects = await Project.findAll();
        return projects;
    };

    static async getProject({ projectId }) {
        const project = await Project.findByProjectId({ projectId });
        project.errorMessage = "projectId를 찾을 수 없음";
        return project;
    };

    static async addProject({ projectName, projectDetail, startDate, endDate }) {
        const projectId = uuidv4();
        const newProject = { projectId, projectName, projectDetail, startDate, endDate };
        const createdNewProject = await Project.create(newProject);
        createdNewProject.errorMessage = "프로젝트 추가 안됨";

        return createdNewProject;
    };
}

export { projectAuthService };
