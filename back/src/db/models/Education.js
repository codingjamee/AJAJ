import { EducationModel } from "../schemas/education";

class Education {
//   static async create({ newEducation }) {
//     const createdNewEducation = await EducationModel.create(newEducation);
//     return createdNewEducation;
//   }

//   static async findById({ eduId }) {
//     const Education = await EducationModel.findOne({ eduId });
//     return Education;
//   }

//   static async findById({ Education_id }) {
//     const Education = await EducationModel.findOne({ id: Education_id });
//     return Education;
//   }

  static async findAll() {
    const Educations = await EducationModel.find({});
    return Educations;
  }

//   static async update({ Education_id, fieldToUpdate, newValue }) {
//     const filter = { id: Education_id };
//     const update = { [fieldToUpdate]: newValue };
//     const option = { returnOriginal: false };

//     const updatedEducation = await EducationModel.findOneAndUpdate(
//       filter,
//       update,
//       option
//     );
//     return updatedEducation;
//   }
}

export { Education };
