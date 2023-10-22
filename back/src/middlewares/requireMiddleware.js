import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');

const jwt = require('./jwtMiddleware');

// 로그인 되어있는지 확인
function login_required(req, res, next) {
  const userToken = req.headers["cookie"]?.split("=")[1] ?? "null";

  // 토큰이 "null" 이면 login이 필요한 서비스 사용을 제한함.
  if (userToken === "null") {
    res.status(401).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const jwtDecoded = jwt.verify(userToken);
    const user_id = jwtDecoded.user_id;
    req.currentUserId = user_id;
    
    next();
  } catch (error) {
    res.status(401).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

// 요청 값 있는지 확인
function request_checked(req, res, next) {
    if (is.emptyObject(req.body)) {
        res.status(400).send("요청 값이 없습니다.");
        return;
    }
    next();
  }

// 수정 및 삭제 시 권한 있는지 확인
// 접근 중인 userId(User)와 eduId(Education)의 userId와 같은지 확인
async function userId_checked(req, res, next) {
  const userId = req.params.id;
  const eduId = req.params.eduId;

  if (userId) {
    const user = await educationAuthService.checkUser({ eduId });
    if (!user) {
      res.status(404).send("Not Found");
      return;
    }
    if (user.userId !== userId) {
      res.status(401).send("접근 권한이 없습니다.");
      return;
    }
  }
  next();
}
  
  
export { login_required, userId_checked, request_checked };