import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class projectAuthService {
    static async addProject({ projectName, projectDetail, startDate, endDate }) {
        const projectId = uuidv4();
        const newProject = { projectId, projectName, projectDetail, startDate, endDate };
        const createdNewProject = await Project.create(newProject);
        if (!createdNewProject) {
            createdNewProject.errorMessage = "프로젝트 추가에 실패했습니다";
        }

        return createdNewProject;
    };

    static async getProjects() {
        const projects = await Project.findAll();
        return projects;
    };

    static async getProject({ projectId }) {
        const project = await Project.findByProjectId(projectId);
        if (!project) {
            project.errorMessage = "해당 프로젝트를 찾을 수 없습니다";
        }
        return project;
    };

    static async setProject({ project_id, toUpdate }) {
        let project = await Project.findById(project_id);

        if (!project) {
            const errorMessage = "해당 프로젝트를 찾을 수 없습니다";
            return { errorMessage };
        }

        if (toUpdate.projectName) {
            const fieldToUpdate = "projectName";
            const newValue = toUpdate.projectName;
            project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        if (toUpdate.projectDetail) {
            const fieldToUpdate = "projectDetail";
            const newValue = toUpdate.projectDetail;
            project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        if (toUpdate.startDate) {
            const fieldToUpdate = "startDate";
            const newValue = toUpdate.startDate;
            project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate;
            project = await Project.update({ project_id, fieldToUpdate, newValue });
        }

        return project;
    }

    static async deleteProject({ projectId }) {
        const project = await Project.delete({ projectId });
        if (!project) {
            project.errorMessage = "해당 프로젝트를 삭제할 수 없습니다.";
        }
        return project;
    };
}

export { projectAuthService };
