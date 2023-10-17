import is from "@sindresorhus/is";
import { Router } from "express";
// import { login_required } from "../middlewares/login_required";
import { educationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

educationAuthRouter.get("/education", async function (req, res, next) {
    // console.log('body:', req.body);
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "정보없음"
      );
    }

    // // req (request) 에서 데이터 가져오기
    // const eduId = req.body.eduId;
    // const school = req.body.school;
    // const major = req.body.major;
    // const degree = req.body.degree;

    // 데이터를 가져오기
    const neweducation = await educationAuthService.getEducations();

    if (neweducation.errorMessage) {
      throw new Error('Error:',neweducation.errorMessage);
    }

    res.status(201).send(neweducation);
  } catch (error) {
    next(error);
  }
});

export { educationAuthRouter };
