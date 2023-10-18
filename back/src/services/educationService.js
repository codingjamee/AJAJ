import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class educationAuthService {
    static async addEducation({school, major, degree, startDate, endDate}) {
        const eduId = uuidv4();
        const newEducation = { eduId, school, major, degree, startDate, endDate};
        const createdNewUser = await Education.create({ newEducation });
        if (!createdNewUser) {
          createdNewUser.errorMessage = "학력 추가에 실패했습니다";
        }
      
        return createdNewUser;
    };

    static async getEducations() {
        const educations = await Education.findAll();
        return educations;
    };

    static async getEducation({ eduId }) {
        const education = await Education.findByEduId({eduId});
        if (!education) {
          education.errorMessage = "해당 학력을 찾을 수 없습니다";
        }
        return education;
    };


    static async setEducation({ edu_id, toUpdate }) {
        // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
        let education = await Education.findById({ edu_id });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
          const errorMessage = "해당 학력 없습니다";
          return { errorMessage };
        }
    
        // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.school) {
          const fieldToUpdate = "school";
          const newValue = toUpdate.school;
          education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }
    
        if (toUpdate.major) {
          const fieldToUpdate = "major";
          const newValue = toUpdate.major;
          education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }
    
        if (toUpdate.degree) {
          const fieldToUpdate = "degree";
          const newValue = toUpdate.degree;
          education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }
    
        if (toUpdate.startDate) {
          const fieldToUpdate = "startDate";
          const newValue = toUpdate.startDate
          education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }

        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate
            education = await Education.update({ edu_id, fieldToUpdate, newValue });
        }
    
        return education;
      }
    static async deleteEducation({ eduId }) {
        const education = await Education.delete({ eduId });
        if (!education) {
          education.errorMessage = "해당 학력을 삭제할 수 없습니다.";
        }
        return education;
    };
}



export { educationAuthService };