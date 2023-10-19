import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class educationAuthService {
    static async addEducation({userid, school, major, degree, startDate, endDate}) {
        const eduid = uuidv4();
        const newEducation = { userid, eduid, school, major, degree, startDate, endDate};
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
        // 우선 해당 id가 db에 존재하는지 여부 확인
        let education = await Education.findByEduId({ eduid });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
          const errorMessage = "해당 학력 없습니다";
          return { errorMessage };
        }
    
        // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.school) {
          const fieldToUpdate = "school";
          const newValue = toUpdate.school;
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
    
        if (toUpdate.startDate) {
          const fieldToUpdate = "startDate";
          const newValue = toUpdate.startDate
          education = await Education.update({ eduid, fieldToUpdate, newValue });
        }

        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
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