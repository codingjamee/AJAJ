import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');

function request_checked(req, res, next) {
    if (is.emptyObject(req.body)) {
        res.status(400).send("요청 값이 없습니다.");
        return;
    }
    next();
  }

// 수정 및 삭제 시 권한 있는지 확인
// 접근 중인 userId와 eduId의 userId와 같은지 확인
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
  
  
export { userId_checked, request_checked };