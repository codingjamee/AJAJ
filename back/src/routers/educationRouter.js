import is from "@sindresorhus/is";
import { Router } from "express";
// import { login_required } from "../middlewares/login_required"; 나중에 한꺼번에 추가
import { educationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

// 학력 추가하기
educationAuthRouter.post("user/:id/education", async function (req, res, next) {
    res.status(201).json("newEducation");
    // try {
    //     if (is.emptyObject(req.body)) {
    //         throw new Error(
    //             "입력값이 없습니다."
    //         );
    //     }
    // const school = req.body.school;
    // const major = req.body.major;
    // const degree = req.body.degree;
    // const startDate = req.body.startDate;
    // const endDate = req.body.endDate;
    
    // const newEducation = await educationAuthService.addEducation({
    //     school,
    //     major,
    //     degree,
    //     startDate,
    //     endDate
    //   });
  
    //   if (newEducation.errorMessage) {
    //     throw new Error('Error:', newEducation.errorMessage);
    //   }
  
    //   res.status(201).json(newEducation);
    // } catch (error) {
    //   next(error);
    // }
  });

// 추가하기
educationAuthRouter.put("user/:id/education", async function (req, res, next) {
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


// 특정 학력 가져오기
// param 된 eduId 받아와서 조회
educationAuthRouter.get("user/:id/education/:eduId", async function (req, res, next) {
    const { eduId } = req.params;
    console.log(eduId);
    try {
      
      const educations = await educationAuthService.getEducation({eduId});
  
      if (educations.errorMessage) {
        throw new Error('Error:', educations.errorMessage);
      }
  
      res.status(201).send(educations);
    } catch (error) {
      next(error);
    }
  });

export { educationAuthRouter };
