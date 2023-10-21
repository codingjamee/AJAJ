import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class educationAuthService {
    static async addEducation( educationInfo ) {
      const eduId = uuidv4();
      const newEducation = { eduId, ...educationInfo };
      const createdNewUser = await Education.create({ newEducation });
      return createdNewUser;
  };

    static async checkUser({ userId }) {
      const user = await Education.checkUserId({ userId });
      return user;
  };

    static async getEducations({ userId }) {
        const educations = await Education.findAll({ userId });
        return educations;
    };

    static async getEducation({ eduId }) {
        const education = await Education.findByEduId({ eduId });
        return education;
    };


    static async setEducation({ eduId, toUpdate }) {
        const education = await Education.findByEduId({ eduId });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
          const errorMessage = "해당 학력 없습니다";
          return { errorMessage };
        }
    
        // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.school) {
          const fieldToUpdate = "school";
          const newValue = toUpdate.school;
          education = await Education.update({ eduId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.major) {
          const fieldToUpdate = "major";
          const newValue = toUpdate.major;
          education = await Education.update({ eduId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.degree) {
          const fieldToUpdate = "degree";
          const newValue = toUpdate.degree;
          education = await Education.update({ eduId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.startDate) {
          const fieldToUpdate = "startDate";
          const newValue = toUpdate.startDate
          education = await Education.update({ eduId, fieldToUpdate, newValue });

        }

        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate
            education = await Education.update({ eduId, fieldToUpdate, newValue });
        }
    
        return education;
      }
    static async deleteEducation({ eduId }) {
        const education = await Education.delete({ eduId });
        return education;
    };
}


export { educationAuthService };