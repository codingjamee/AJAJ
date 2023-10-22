import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

module.exports = {
    sign: (user) => { // access token 발급
      const payload = { // access token에 들어갈 payload
        user_id: user.id,
      };
      
      return jwt.sign(payload, secretKey, {
        expiresIn: '1h', 	  // 유효기간
      });
    },
    
    verify: (userToken) => { // access token 검증
        const jwtDecoded = jwt.verify(userToken, secretKey);
        return jwtDecoded;
      },
}