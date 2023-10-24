import { UserModel } from "../schemas/user";
import { RefreshTokenModel } from "../schemas/refreshToken"

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  static async findRefreshToken({ token  }) {
    // id 값을 받으면 해당 id의 token값을 가져와 줍니다
    const refreshToken = await RefreshTokenModel.findOne({ userId : token  })
    return refreshToken;
  }
}

export { User };
