import is from "@sindresorhus/is";

function request_checked(req, res, next) {
    if (is.emptyObject(req.body)) {
        res.status(400).send("요청값이 없습니다.");
        return;
    }
    next();
  }
  
export { request_checked };