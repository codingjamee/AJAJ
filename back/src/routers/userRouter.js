const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { request_checked } = require('../middlewares/middleware');
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

    res.status(201).json({ok: true});
  } catch (error) {
    next(error);
  }
});

// 로그인하기
userAuthRouter.post("/user/login", request_checked, async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const [ token, user ] = await userAuthService.getUser({ email, password });
    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.cookie("user_cookie", token, {
      path: "/", // 쿠키 저장 경로
      httpOnly: true, // 클라이언트에서 쿠키 조작 x
      sameSite: "lax", // 쿠키 전송 범위. default
      maxAge: 60 * 60 * 1000, // 쿠키 유효기간. 1시간
    });
    // secure: true -> HTTPS에서만 사용 가능 (defult false).
    // sameSite: 우리 사이트에서 다른 사이트로 링크 연결이 필요하다면 lax, 우리 사이트에서만 머무르면 strict

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

// 전체 사용자목록 가져오기
userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
    try {
      const users = await userAuthService.getUsers();

      res.status(201).send(users);
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 가져오기
userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
    try {
      const userid = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({ userid });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(201).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 수정
userAuthRouter.patch("/users/:id", login_required, request_checked, async function (req, res, next) {
    try {
      const userid = req.params.id;
      const { name, email, password, description } = req.body;
      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ userid, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json({ok: true});
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 가져오기
userAuthRouter.get("/users/:id", login_required, async function (req, res, next) {
    try {
      const userid = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ userid });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
