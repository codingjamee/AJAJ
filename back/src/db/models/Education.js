import { EducationModel } from "../schemas/education";
// import { UserModel } from "../schemas/user";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async checkUserId({ eduId }) {
    const user = await EducationModel.findOne({ eduId });
    return user;
  }

  static async findAll() {
    const Educations = await EducationModel.find({userId});
    return Educations;
  }

  static async findByEduId({ eduId }) {
    const Education = await EducationModel.findOne({ eduId });
    return Education;
  }

  static async update({ Education_id, fieldToUpdate, newValue }) {
    const filter = { eduId: Education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(filter, update, option);
    return updatedEducation;
  }

  static async delete({ eduId }) {
    const result = await EducationModel.findOneAndDelete({ eduId });
    return result;
  }
}


export { Education };
