import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

// 학력 추가하기_login_required
educationAuthRouter.post("user/:id/education", login_required, async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "학력추가에 입력값이 없습니다."
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

// 학력 전체 가져오기_login_required
educationAuthRouter.get("user/:id/educations", login_required, async function (req, res, next) {
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


// 특정 학력 가져오기_login_required
educationAuthRouter.get("user/:id/education/:eduId", login_required, async function (req, res, next) {
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



// 학력 수정하기_login_required
educationAuthRouter.patch("user/:id/education/:eduId", login_required, async function (req, res, next) {
    try {
      const edu_id = req.params.eduId;

      // body data 로부터 업데이트할 사용자 정보를 추출
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const degree = req.body.degree ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = { school, major, degree, startDate, endDate };

      const updatedEducation = await educationAuthService.setEducation({ edu_id, toUpdate });
  
      if (updatedEducation.errorMessage) {
        throw new Error('Error:', updatedEducation.errorMessage);
      }
  
      res.status(201).send(updatedEducation);
    } catch (error) {
      next(error);
    }
  });

// 학력 삭제하기_login_required
educationAuthRouter.delete("user/:id/education/:eduId", login_required, async function (req, res, next) {
  const edu_id = req.params.eduId;
  const id = req.params.id;
  try {
    const deletedEducation = await educationAuthService.deleteEducation({ edu_id });

    if (deletedEducation.errorMessage) {
      throw new Error('Error:', deletedEducation.errorMessage);
    }

    res.status(200).json({
      redirect: `/user/${id}/educations`
    })
  } catch (error) {
    next(error);
  }
})

export { educationAuthRouter };
