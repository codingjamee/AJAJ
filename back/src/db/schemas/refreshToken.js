import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: {
    type: String,
    ref: 'User', // 사용자 모델을 참조하도록 조정
  },
  token: {
    type: String,
    required: true,
  },
});

const RefreshTokenModel = model('RefreshToken', refreshTokenSchema);

export { RefreshTokenModel };
