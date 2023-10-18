import { AwardModel } from "../schemas/award";

class Award {
  static async create({newAward}){
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findbyAward({award}){
    const user = await AwardModel.findOne({award});
    return user;
  }

  static async findByAwardContent({ awardContent}) {
    const user = await AwardModel.findOne({ awardContent });
    return user;
  }


  static async findAll() {
    const Awards = await AwardModel.find({});
    return Awards;
  }

  static async update({ awardContent, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { Award };
