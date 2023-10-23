import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async checkUserId({ awardId }) {
    const user = await AwardModel.findOne({ awardId });
    return user;
  }

  static async findByAwardId({ awardId }) {
    const Award = await AwardModel.findOne({ awardId });
    return Award;
  }

  static async findAll({ awardId }) {
    const Awards = await AwardModel.find({ awardId });
    return Awards;
  }

  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(filter, update, option);
    return updatedAward;
  }

  static async delete({ awardId }) {
    const result = await AwardModel.findOneAndDelete({ awardId });
    return result;
  }
}

export { Award };
