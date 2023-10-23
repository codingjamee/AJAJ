import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ Project_id }) {
    const Project = await ProjectModel.findOne({ id: Project_id });
    return Project;
  }

  static async findAll() {
    const Projects = await ProjectModel.find({});
    return Projects;
  }

  static async update({ Project_id, fieldToUpdate, newValue }) {
    const filter = { id: Project_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }
}

export { Project };
