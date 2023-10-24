import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');
const { userAuthService } = require('../services/userService');
const { awardAuthService }= require('../services/awardService');
const { certificateAuthService }= require('../services/certificateService');
const { projectAuthService }= require('../services/projectService');
// const { UnauthorizedError } = require('../middlewares/errorHandlingMiddleware');
import { User } from "../db";


const jwt = require('./jwtMiddleware');

// 로그인 되어있는지 확인
async function login_required(req, res, next) {
  // 쿠키 헤더 값을 가져옵니다.
  const cookies = req.headers["cookie"] || '';
  const cookieArray = cookies.split(';');

  // 유저토큰과 리프레시 토큰을 저장할 변수를 초기화합니다.
  let userToken = null;
  let refreshToken = null;

  // 쿠키를 정렬합니다.
  const sortedCookies = cookieArray.map((cookie) => cookie.trim());

  // 정렬된 쿠키에서 유저토큰과 리프레시 토큰을 찾습니다.
  for (const cookie of sortedCookies) {
    const [name, value] = cookie.split('=');
    if (name === 'user_cookie') {
      userToken = value;
    }
  }

  // //현재 접속중인 user의 DB에서 refresh토큰 정보를 얻습니다
  // const userId = 'edd3dc04-bbec-41cb-90fd-f9742a41b081' //임시
  // const refreshTokenDoc = await userAuthService.getToken({ userId });
  // console.log("refreshTokenDoc : " + refreshTokenDoc)
  // if (refreshTokenDoc) {
  //   // 토큰이 데이터베이스에서 발견되었으므로 사용자 정보를 추출
  //   const userId = refreshTokenDoc.userId;

  //   // 이제 userId를 사용하여 해당 사용자 정보를 가져올 수 있음
  //   const user = await User.findById(userId);
  //   console.log(user)

  //   // 사용자 정보를 사용하여 추가 작업 수행
  // } else {
  //   // refreshToken이 데이터베이스에서 발견되지 않았으므로 유효성 검사 실패
  //   res.status(401).json({ message: '유효하지 않은 refreshToken' });
  // }
  
  // if (!userToken && refreshToken) {
  //   try {
  //     const user = await userAuthService.getUserInfo(userId);
  //     const userToken = jwt.sign(user)

  //     // 클라이언트로 새로운 유저 토큰을 전송
  //     res.cookie("user_cookie", userToken, {
  //       path: "/",
  //       httpOnly: true,
  //       sameSite: "lax",
  //       maxAge: 60 * 60 * 1000, // 예: 1시간
  //     });
  //   } catch (error) {
  //     console.error("리프레시 토큰 검증 오류:", error);
  //   }
  // }

  // 두 토큰이 "null" 이면 login이 필요한 서비스 사용을 제한함.
  if (!userToken && !refreshToken) {
    res.status(401).json({
      statusCode: 401,
      message: "로그인한 유저만 사용할 수 있는 서비스입니다."
    });
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const jwtDecoded = jwt.verify(userToken);
    const user_id = jwtDecoded.user_id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요."
    });
    return;
  }
}

// 요청 값 있는지 확인
function request_checked(req, res, next) {
  if (is.emptyObject(req.body)) {
    res.status(400).json({
      statusCode: 400,
      message: "요청 값이 없습니다."
    });
    return;
  }
  next();
}

// 수정 및 삭제 시 권한 있는지 확인
// 접근 중인 userId(User)와 eduId(Education)의 userId와 같은지 확인
// -> 모델에 따라 다르게
async function userId_checked(req, res, next) {
  const userId = req.params.id;
  const eduId = req.params.eduId;
  const projectId = req.params.projectId;
  const awardId = req.params.awardId;
  const certificateId = req.params.certificateId;

  try {
    if ( userId ) {
      if ( eduId ) {
        const user = await educationAuthService.checkEducation({ eduId });
        if (!user) {
          res.status(404).json({
            statusCode: 404,
            message: "Not Found"
          });
          return;
        }
        if (user.userId !== userId) {
          res.status(401).json({
            statusCode: 401,
            message: "접근 권한이 없습니다."
          });
          return;
        }
      }
      if ( projectId ) {
        const user = await projectAuthService.checkProject({ projectId });
        if (!user) {
          res.status(404).json({
            statusCode: 404,
            message: "Not Found"
          });
          return;
        }
        if (user.userId !== userId) {
          res.status(401).json({
            statusCode: 401,
            message: "접근 권한이 없습니다."
          });
          return;
        }
      }
      if ( awardId ) {
        const user = await awardAuthService.checkAward({ awardId });
        if (!user) {
          res.status(404).json({
            statusCode: 404,
            message: "Not Found"
          });
          return;
        }
        if (user.userId !== userId) {
          res.status(401).json({
            statusCode: 401,
            message: "접근 권한이 없습니다."
          });
          return;
        }
      }
      if ( certificateId ) {
        const user = await certificateAuthService.checkCertificate({ certificateId });
        if (!user) {
          res.status(404).json({
            statusCode: 404,
            message: "Not Found"
          });
          return;
        }
        if (user.userId !== userId) {
          //throw new UnauthorizedError("접근 권한이 없습니다.");
          res.status(401).json({
            statusCode: 401,
            message: "접근 권한이 없습니다."
          });
          return;
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { login_required, userId_checked, request_checked };