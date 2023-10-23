import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ Award_id }) {
    const Award = await AwardModel.findOne({ id: Award_id });
    return Award;
  }

  static async findAll() {
    const Awards = await AwardModel.find({});
    return Awards;
  }

  static async update({ Award_id, fieldToUpdate, newValue }) {
    const filter = { id: Award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
}

export { Award };
