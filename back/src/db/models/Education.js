import { EducationModel } from "../schemas/education";
import { UserModel } from "../schemas/user";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async checkUserId({ userId }) {
    const user = await UserModel.findOne({ userId });
    return user; 
  }

  // 동일한 userId 내에서의 모든 학력 가져오기
  static async findAll({ userId }) {
    const Educations = await EducationModel.find({ userId });
    return Educations;
  }

  static async findByEduId({ eduId }) {
    const Education = await EducationModel.findOne({ eduId });
    return Education;
  }

  // static async findById({ eduId }) {
  //   const Education = await EducationModel.findOne({ eduId });
  //   console.log(Education);
  //   return Education;
  // }

  static async update({ Education_id, fieldToUpdate, newValue }) {
    const filter = { eduId: Education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(filter, update, option);
    return updatedEducation;
  }

  static async delete({ eduId }) {
    await EducationModel.findOneAndDelete({ eduId }, (error, deletedDoc) => {
      // if (error) {
      //   
      // } 
      res.status(200).json({
        statusCode: 200,
        message: '성공 메시지', 
        // data: "1"
      });
      
    });
  }
}


export { Education };
