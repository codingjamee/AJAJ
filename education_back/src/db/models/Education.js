import { EducationModel } from "../schemas/education";
import { UserModel } from "../schemas/user";

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
    const user = await UserModel.findOne({ userid });
    return user;
  }

  // 동일한 userid 내에서의 모든 학력 가져오기
  static async findAll({ userid }) {
    const Educations = await EducationModel.find({ userid });
    return Educations;
  }

  static async findByEduId({ eduid }) {
    const Education = await EducationModel.findOne({ eduid });
    return Education;
  }

  // static async findById({ eduid }) {
  //   const Education = await EducationModel.findOne({ eduid });
  //   console.log(Education);
  //   return Education;
  // }

  static async update({ Education_id, fieldToUpdate, newValue }) {
    const filter = { eduid: Education_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete({ eduid }) {
    await EducationModel.findOneAndDelete({ eduid }, (error, deletedDoc) => {
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