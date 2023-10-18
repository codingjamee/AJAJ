import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findAll() {
    const Projects = await ProjectModel.find({});
    return Projects;
  }

  static async findByProjectId({ projectId }) {
    const Project = await ProjectModel.findOne({ projectId }).populate("userid");
    return Project;
  }

  static async findById({ Project_id }) {
    const Project = await ProjectModel.findOne({ projectId: Project_id });
    return Project;
  }

  static async update({ Project_id, fieldToUpdate, newValue }) {
    const filter = { projectId: Project_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async delete({ projectId }) {
    const deletedProject = await ProjectModel.findOneAndDelete({ projectId });
    return deletedProject;
  }
}

export { Project };
