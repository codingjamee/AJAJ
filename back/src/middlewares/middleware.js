import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');

function request_checked(req, res, next) {
    if (is.emptyObject(req.body)) {
        res.status(400).send("요청 값이 없습니다.");
        return;
    }
    next();
  }

async function userid_checked(req, res, next) {
  const userid = req.params.id;
  if (userid) {
    const user = await educationAuthService.checkUser({ userid });
    if (user.userid !== userid) {
      res.status(401).send("접근 권한이 없습니다.");
      return;
    }
  }
  next();
}
  
  
export { userid_checked, request_checked };