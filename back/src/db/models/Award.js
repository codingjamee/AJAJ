import { AwardModel } from "../schemas/award";

class Award {
  static async findAll() {
    const Awards = await AwardModel.find({});
    return Awards;
  }
}

export { Award };
