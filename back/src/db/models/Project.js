import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async checkUserId({ userid }) {
    const user = await ProjectModel.findOne({ userid: userid });
    return user;
  }

  static async findAll() {
    const Projects = await ProjectModel.find({});
    return Projects;
  }

  static async findByProjectId({ projectId }) {
    const Project = await ProjectModel.findOne({ projectId }); // populate("userid");
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
    await ProjectModel.findOneAndDelete({ projectId }, (error, deletedDoc) => {
      if (error) {
        console.error('삭제 오류:', error);
      } else {
        if (deletedDoc) {
          console.log('삭제된 문서:', deletedDoc);
        } else {
          console.log('삭제할 문서를 찾을 수 없습니다.');
        }
      }
    });
  }
}

export { Project };
