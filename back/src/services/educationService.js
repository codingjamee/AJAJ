import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class educationAuthService {
    static async addEducation( educationInfo ) {
      const eduid = uuidv4();
      const newEducation = { eduid, ...educationInfo };
      const createdNewUser = await Education.create({ newEducation });
      return createdNewUser;
  };

    static async checkUser({ userid }) {
      const user = await Education.checkUserId({ userid });
      return user;
  };

    static async getEducations({ userid }) {
        const educations = await Education.findAll({ userid });
        return educations;
    };

    static async getEducation({ eduid }) {
        const education = await Education.findByEduId({ eduid });
        return education;
    };


    static async setEducation({ eduid, toUpdate }) {
        let education = await Education.findByEduId({ eduid });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
          const errorMessage = "해당 학력 없습니다";
          return { errorMessage };
        }
    
        // 업데이트 대상에 schoolName이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.schoolName) {
          const fieldToUpdate = "schoolName";
          const newValue = toUpdate.schoolName;
          education = await Education.update({ eduid, fieldToUpdate, newValue });
        }
    
        if (toUpdate.major) {
          const fieldToUpdate = "major";
          const newValue = toUpdate.major;
          education = await Education.update({ eduid, fieldToUpdate, newValue });
        }
    
        if (toUpdate.degree) {
          const fieldToUpdate = "degree";
          const newValue = toUpdate.degree;
          education = await Education.update({ eduid, fieldToUpdate, newValue });
        }
    
        if (toUpdate.admissionDate) {
          const fieldToUpdate = "admissionDate";
          const newValue = toUpdate.startDate
          education = await Education.update({ eduid, fieldToUpdate, newValue });

        }

        if (toUpdate.graduationDate) {
            const fieldToUpdate = "graduationDate";
            const newValue = toUpdate.endDate
            education = await Education.update({ eduid, fieldToUpdate, newValue });
        }
    
        return education;
      }
    static async deleteEducation({ eduid }) {
        const education = await Education.delete({ eduid });
        return education;
    };
}


export { educationAuthService };