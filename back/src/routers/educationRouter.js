import is from "@sindresorhus/is";
import { Router } from "express";
// import { login_required } from "../middlewares/login_required";
import { educationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

// 학력 추가하기
educationAuthRouter.post("/education", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "입력값이 없음"
            );
            }
    const school = req.body.school;
    const major = req.body.major;
    const degree = req.body.degree;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    
    const newEducation = await educationAuthService.addEducation({
        school,
        major,
        degree,
        startDate,
        endDate
      });
  
      if (newEducation.errorMessage) {
        throw new Error('Error:', newEducation.errorMessage);
      }
  
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  });

// 학력전체 가져오기
educationAuthRouter.get("/educations", async function (req, res, next) {
  try {
    
    const educations = await educationAuthService.getEducations();

    if (educations.errorMessage) {
      throw new Error('Error:', educations.errorMessage);
    }

    res.status(201).send(educations);
  } catch (error) {
    next(error);
  }
});

export { educationAuthRouter };
