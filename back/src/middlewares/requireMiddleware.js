import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');
const { userAuthService } = require('../services/userService');
const { awardAuthService } = require('../services/awardService');
const { certificateAuthService } = require('../services/certificateService');
const { projectAuthService } = require('../services/projectService');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../middlewares/errorHandlingMiddleware');
const jwt = require('./jwtMiddleware');

// 탈퇴한 회원인지 확인
async function deleted_checked(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userAuthService.getUserDeletedAt({ email });
    if (user.deletedAt) {
      throw new UnauthorizedError("탈퇴한 회원입니다.");
    }
    next();
  } catch (error) {
    next(error);
  }
}

// 로그인 되어있는지 확인
async function login_required(req, res, next) {
  // 쿠키 헤더 값을 가져옵니다.
  const cookies = req.headers["cookie"] || '';
  const cookieArray = cookies.split(';');

  // 유저토큰과 리프레시 토큰을 저장할 변수를 초기화합니다.
  let userToken = null;

  // 쿠키를 정렬합니다.
  const sortedCookies = cookieArray.map((cookie) => cookie.trim());

  // 정렬된 쿠키에서 유저 토큰을 찾습니다.
  for (const cookie of sortedCookies) {
    const [name, value] = cookie.split('=');
    if (name === 'user_cookie') {
      userToken = value;
    }
  }

  // 현재 접속중인 user의 DB에서 refresh 토큰 정보를 얻습니다 < - 이게 안되는 중..
  const userId = 'edd3dc04-bbec-41cb-90fd-f9742a41b081'; // 임시
  const refreshToken = await userAuthService.getToken({ userId });

  console.log("refreshToken: " + refreshToken);

  if (!refreshToken) {
    // refreshToken이 데이터베이스에서 발견되지 않았으므로 유효성 검사 실패
    throw new UnauthorizedError("권한이 없습니다.");
  }

  if (!userToken && refreshToken) {
    try {
      const user = await userAuthService.getUserInfo({ userId });
      console.log("user : " + user)
      userToken = jwt.sign(user)

      // 클라이언트로 새로운 유저 토큰을 전송
      res.cookie("user_cookie", userToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 예: 1시간
      });
      console.log("userToken : " + userToken)
    } catch (error) {
      throw new UnauthorizedError("정상적인 토큰이 아닙니다.");
    }
  }

  if ( userToken ) {
    try {
      // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
      const jwtDecoded = jwt.verify(userToken);
      console.log("jwtDecoded : " + jwtDecoded.user_id)
      const user_id = jwtDecoded.user_id;
      console.log("user_id" + user_id)
      req.currentUserId = user_id;
  
      // 두 토큰이 "null" 이면 login이 필요한 서비스 사용을 제한함.
      if (!userToken && !refreshToken) {
        throw new UnauthorizedError("로그인한 유저만 사용할 수 있는 서비스입니다.");
      }
  
      next();
    } catch (error) {
      next(error);
    }
  }
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
    if (userId) {
      if (eduId) {
        const user = await educationAuthService.checkEducation({ eduId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId !== userId) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
      if (projectId) {
        const user = await projectAuthService.checkProject({ projectId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId !== userId) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
      if (awardId) {
        const user = await awardAuthService.checkAward({ awardId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId !== userId) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
      if (certificateId) {
        const user = await certificateAuthService.checkCertificate({ certificateId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId !== userId) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

// 요청 값 있는지 확인
// try 없어도 되는지 확인필요
function request_checked(req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError("요청 값이 없습니다.")
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { deleted_checked, login_required, userId_checked, request_checked };