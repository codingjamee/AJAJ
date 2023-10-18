import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async checkUserId({ userid }) {
    const user = await EducationModel.findOne({ userid: userid });
    return user;
  }

  // 동일한 userid 내에서의 모든 학력 가져오기
  static async findAll({ userid }) {
    const Educations = await EducationModel.find({ userid: userid });
    return Educations;
  }

  static async findByEduId({ eduId }) {
    const Education = await EducationModel.findOne({ eduId }).populate("userid");
    return Education;
  }

  static async findById({ Education_id }) {
    const Education = await EducationModel.findOne({ eduId: Education_id });
    return Education;
  }

  static async update({ Education_id, fieldToUpdate, newValue }) {
    const filter = { eduId: Education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete({ eduId }) {
    const deletedEducation = await EducationModel.findOneAndDelete({ eduId })
    return deletedEducation;
  }
}



export { Education };