import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class projectAuthService {
    static async getprojects() {
        const projects = await Project.findAll();
        console.log('find all');
        console.log(projects)
        return projects;
      }   
}

export { projectAuthService };