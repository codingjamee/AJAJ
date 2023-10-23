import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY || "jwt-secret-key";

module.exports = {
    sign: (user) => { // access token 발급
      const payload = { // access token에 들어갈 payload
        user_id: user.id,
      };
      
      return jwt.sign(payload, secret, {
        expiresIn: '1h', 	  // 유효기간
      });
    },
    
    verify: (token) => { // access token 검증
        const jwtDecoded = jwt.verify(token, secret);
        return jwtDecoded;
    },

    // refresh: (user) => { // refresh token 발급
    //   const payload = { // access token에 들어갈 payload
    //     user_id: user.id,
    //   };
    //   return jwt.sign({payload}, secret, {
    //     algorithm: 'HS512',
    //     expiresIn: '7d',
    //   });
    // },
    
    // refreshVerify: async (token, userId) => { // refresh token 검증
    //   const jwtDecoded = jwt.verify(token, secret);
    //   return jwtDecoded;
    // }

}