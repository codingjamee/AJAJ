import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async checkAwardId({ awardId }) {
    const user = await AwardModel.findOne({ awardId });
    return user;
  }

  static async findByAwardId({ awardId }) {
    const award = await AwardModel.findOne({ awardId });
    return award;
  }

  static async findAll({ userId }) {
    const awards = await AwardModel.find({ userId });
    return awards;
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
