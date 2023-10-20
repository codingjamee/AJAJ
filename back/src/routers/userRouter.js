import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();


userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;
    

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const [ token, user ] = await userAuthService.getUser({ email, password });
    console.log('token', token);
    console.log('user', user);
    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.cookie('user_cookie', token, {
      path: '/', // 쿠키 저장 경로
      httpOnly: true, // 클라이언트에서 쿠키 조작 x
      sameSite: 'lax', // 쿠키 전송 범위. default
      domain: 'localhost',
      maxAge: 60 * 60 * 1000, // 쿠키 유효기간. 1시간
    });
    // secure: true -> HTTPS에서만 사용 가능 (defult false). 
    // sameSite: 우리 사이트에서 다른 사이트로 링크 연결이 필요하다면 lax, 우리 사이트에서만 머무르면 strict

    res.status(200).send(user); //## JWT 제외
  } catch (error) {
    next(error);
  }
});

// 회원 임시 화면
userAuthRouter.get("/user/register", async function (req, res, next) {
  res.render('register.ejs');
  // res.redirect('/user/login')
});

userAuthRouter.get("/user/login", async function (req, res, next) {
  res.render('login.ejs');
});

userAuthRouter.get("/users/:id/edit", login_required, async function (req, res, next) {
  try {
    const userid = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userid,
    });
    console.log(currentUserInfo)
    if (userid.errorMessage) {
      throw new Error(user.errorMessage);
    }
    // userEdit.ejs 템플릿을 렌더링하며 데이터를 전달
    res.render("userEdit.ejs", { currentUserInfo });
  } catch (error) {
    next(error);
  }
});





userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userid = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userid,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    
    try {
      // URI로부터 사용자 id를 추출함.
      const userid = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ userid, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {

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

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
