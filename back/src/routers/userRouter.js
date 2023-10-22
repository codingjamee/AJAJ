const { Router } = require('express');
const { login_required, request_checked } = require('../middlewares/requireMiddleware');
const { userAuthService } = require('../services/userService');

const userAuthRouter = Router();

// 회원가입하기
userAuthRouter.post("/user/register", request_checked, async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    const newUser = await userAuthService.addUser({ name, email, password });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(200).json({
      statusCode: 200,
      message: '회원가입 성공', 
    });
  } catch (error) {
    next(error);
  }
});

// 로그인하기
userAuthRouter.post("/user/login", request_checked, async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, loginUser } = await userAuthService.getUser({ email, password });
    if (loginUser.errorMessage) {
      throw new Error(loginUser.errorMessage);
    }

    res.cookie("user_cookie", accessToken, {
      path: "/", // 쿠키 저장 경로
      httpOnly: true, // 클라이언트에서 쿠키 조작 불가
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // JWT 토큰의 유효기간 (1시간)
    });
    
    res.cookie("refresh_token", refreshToken, {
      path: "/user/login", // 쿠키 저장 경로
      httpOnly: true, // 클라이언트에서 쿠키 조작 불가
      sameSite: "lax",
      maxAge: 7 * 60 * 60 * 1000, // 리프레시 토큰의 유효기간 설정 (7일)
    });

    res.cookie("refresh_token", refreshToken, {
      path: "/user/login", // 쿠키 저장 경로
      httpOnly: true, // 클라이언트에서 쿠키 조작 불가
      sameSite: "lax",
      maxAge: 7 * 60 * 60 * 1000, // 리프레시 토큰의 유효기간 설정 (7일)
    });

    const { id, name, description } = loginUser;
    res.status(200).send({ id, email, name, description });

  } catch (error) {
    next(error);
  }
});


// 전체 사용자목록 가져오기
userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
    try {
      const users = await userAuthService.getUsers();

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 가져오기
userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }
      
      const { id, email, name, description } = currentUserInfo;
      res.status(200).send({ id, email, name, description });
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 수정
userAuthRouter.patch("/users/:id", login_required, request_checked, async function (req, res, next) {
    try {
      const userId = req.params.id;
      const { name, email, password, description } = req.body;
      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json({
        statusCode: 200,
        message: '회원정보 수정 성공', 
      });
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 가져오기
userAuthRouter.get("/users/:id", login_required, async function (req, res, next) {
    try {
      const userId = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      const { id, email, name, description } = currentUserInfo;
      res.status(200).send({ id, email, name, description });
    } catch (error) {
      next(error);
    }
  }
);

// 로그아웃
userAuthRouter.get("/logout", async function (req, res, next) {
  res.clearCookie('user_cookie').json({
    statusCode: 200,
    message: '로그아웃 성공', 
  }).end();
})

export { userAuthRouter };
