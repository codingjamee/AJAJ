import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class educationAuthService {
    static async getEducations() {
        const educations = await Education.findAll();
        console.log('find all');
        console.log(educations)
        return educations;
      }   
}

export { educationAuthService };