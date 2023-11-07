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
    const filteredUsers = users.map(({...rest}) => [rest._doc].map(({_id, password, createdAt, updatedAt, __v, deletedAt, ...rest}) => rest)).flat();
    const result = filteredUsers.sort(((a,b) => {
      // 이름순으로 정렬
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;

      // 동명이인이라면 이메일 순으로 정렬
      if (a.email > b.email) return 1;
      if (a.email < b.email) return -1;
    }));
    return result;
  }

  // 페이징 part
  static async findAll_paging({ currentPage }) {
    console.log('접근');
    const users = await UserModel.find().skip(currentPage).limit(4);
    // limit()으로는 가져올 개수 설정
    // skip()은 처음에 건너뛸 개수
    console.log('페이징개수: ', users.length);
    // const filteredUsers = users.map(({...rest}) => [rest._doc].map(({_id, password, createdAt, updatedAt, __v, deletedAt, ...rest}) => rest)).flat();
    // const result = filteredUsers.sort(((a,b) => {
    //   // 이름순으로 정렬
    //   if (a.name > b.name) return 1;
    //   if (a.name < b.name) return -1;

    //   // 동명이인이라면 이메일 순으로 정렬
    //   if (a.email > b.email) return 1;
    //   if (a.email < b.email) return -1;
    // }));
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  static async findRefreshToken({ userId }) {
    // id 값을 받으면 해당 id의 token값을 가져와 줍니다
    const refreshToken = await RefreshTokenModel.findOne({ userId })
    return refreshToken.token;
  }
}

export { User };
