import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    try {
      const createdNewEducation = await EducationModel.create(newEducation);
      return createdNewEducation;
    } catch {
      return null;
    }
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
    const Education = await EducationModel.findOne({ eduId: eduId }); //.populate({path: "id", model: "User"});
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

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete({ eduId }) {
    await EducationModel.findOneAndDelete({ eduId }, (error, deletedDoc) => {
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



export { Education };