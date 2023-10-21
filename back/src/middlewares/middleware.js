import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');

function request_checked(req, res, next) {
    if (is.emptyObject(req.body)) {
        res.status(400).send("요청 값이 없습니다.");
        return;
    }
    next();
  }

async function userId_checked(req, res, next) {
  const userId = req.params.id;
  if (userId) {
    const user = await educationAuthService.checkUser({ userId });
    if (user.id !== userId) {
      res.status(401).send("접근 권한이 없습니다.");
      return;
    }
  }
}
  
  
export { userId_checked, request_checked };