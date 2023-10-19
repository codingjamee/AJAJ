import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class AwardAuthService{
    static async addAward({userid, award, awardContent, awardDate}){
        const awardId = uuidv4();
        const createNewAward = await Award.create({newAward});

        if (!createdNewAward) {
            createdNewUser.errorMessage = "수상 추가에 실패했습니다";
          }
        
          return createdNewAward;
    };

    static async checkAward({userid}){
        const user = await Award.CheckUserId({userid});
        if (!user){
            user.errorMessage="해당 수상을 찾을수 가 없습니다.";
        }
        return user;
    }

    static async getAward({awardId}){
        const award = await Award.findbyAwardId({awardId});
        if (!award) {
            award.errorMessage = "해당 학력을 찾을 수 없습니다";
          }
          return award;
    }

    static async setAward({ award_id, toUpdate }) {
        // 우선 해당 id가 db에 존재하는지 여부 확인
        let award = await Award.findById({ award_id });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
          const errorMessage = "해당 수상이 없습니다";
          return { errorMessage };
        }
    
        // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    
        if (toUpdate.awardContent) {
          const fieldToUpdate = "awardContent";
          const newValue = toUpdate.awardContent;
          award= await Award.update({ award_id, fieldToUpdate, newValue });
        }

        if (toUpdate.endDate) {
            const fieldToUpdate = "awardDate";
            const newValue = toUpdate.endDate
            award = await Award.update({ award_id, fieldToUpdate, newValue });
        }
    
        return award;
      }
    static async deleteAward({ awardId }) {
        const award = await Award.delete({ awardId });
        return award;
    };
}