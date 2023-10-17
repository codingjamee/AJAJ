import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class educationAuthService {
    static async getEducations() {
        const educations = await Education.findAll();
        return educations;
    };

    static async getEducation({ eduId }) {
        const education = await Education.findByEduId({eduId});
        education.errorMessage = "eduId를 찾을 수 없음";
        return education;
    };

    static async addEducation({school, major, degree, startDate, endDate}) {
        const eduId = uuidv4();
        const newEducation = { eduId, school, major, degree, startDate, endDate};
        const createdNewUser = await User.create({ newEducation });
        createdNewUser.errorMessage = "학력 추가 안됨";

        return createdNewUser;
    };
}

export { educationAuthService };