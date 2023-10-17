import is from "@sindresorhus/is";
import { Router } from "express";
// import { login_required } from "../middlewares/login_required";
import { educationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

educationAuthRouter.post("/education", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const eduId = req.body.eduId;
    const school = req.body.school;
    const major = req.body.major;
    const degree = req.body.degree;

    // 위 데이터를 유저 db에 추가하기
    const neweducation = await educationAuthService.getEducations();

    // if (neweducation.errorMessage) {
    //   throw new Error(neweducation.errorMessage);
    // }

    res.status(201).send(neweducation);
  } catch (error) {
    next(error);
  }
});

export { educationAuthRouter };
