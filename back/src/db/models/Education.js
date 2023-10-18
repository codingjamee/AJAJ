import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findAll() {
    const Educations = await EducationModel.find({});
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