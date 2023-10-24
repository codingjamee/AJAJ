import { ProjectModel } from "../schemas/project"; // Project 모델을 import

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create( newProject );
    return createdNewProject;
  }

  static async checkProjectId({ projectId }) {
    const project = await ProjectModel.findOne({ projectId });
    return project;
  }

  static async findAll({ userId }) {
    const projects = await ProjectModel.find({ userId });
    const filteredProjects = projects.map(({...rest}) => [rest._doc].map(({userId, _id, createdAt, updatedAt, __v, ...rest}) => rest)).flat();
    const result = filteredProjects.sort(((a,b) => {
      if (new Date(a.projectStartDate) > new Date(b.projectStartDate)) return 1;
      if (new Date(a.projectStartDate) < new Date(b.projectStartDate)) return -1;

      if (new Date(a.projectEndDate) > new Date(b.projectEndDate)) return 1;
      if (new Date(a.projectEndDate) < new Date(b.projectEndDate)) return -1;
    }));
    
    return result;
  }

  static async findByProjectId({ projectId }) {
    const project = await ProjectModel.findOne({ projectId });
    return project;
  }

  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { projectId: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedProject = await ProjectModel.findOneAndUpdate(filter, update, option);
    return updatedProject;
  }

  static async delete({ projectId }) {
    const result = await ProjectModel.findOneAndDelete({ projectId });
    return result;
  }
}

export { Project };
