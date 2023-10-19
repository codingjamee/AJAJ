import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationAuthService } from "../services/educationService";

const { ValidationError, EmptyValueError, AuthorityError } = require('../middlewares/errorHandlingMiddleware')

const educationAuthRouter = Router();


// 학력 추가하기_login_required
educationAuthRouter.post("/user/:id/education", login_required, async function (req, res, next) {
    
    console.log(req.body);
    try {
        if (is.emptyObject(req.body)) {
            throw new EmptyValueError("학력 추가에 입력값이 없습니다.");
        }
        const userid = req.params.id;
        const school = req.body.school;
        const major = req.body.major;
        const degree = req.body.degree;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const newEducation = await educationAuthService.addEducation({
            userid,
            school,
            major,
            degree,
            startDate,
            endDate
          });

      if (!newEducation) {
        throw new ValidationError("해당 학력이 생성되지 않았습니다.");
      }
  
      res.status(201).send(educations);
    } catch (error) {
      next(error);
    }
  });

// 학력 전체 가져오기_login_required
educationAuthRouter.get("/user/:id/educations", login_required, async function (req, res, next) {
  const userid = req.params.id;
  
  try {
    // userid가 동일한지 확인
    if (userid) {
      const user = await educationAuthService.checkUser({ userid });
      console.log(user);
      if (user.id !== userid) {
        throw new AuthorityError("접근 권한이 없습니다");
      }
    }
    // 쿠키 확인
    


    const educations = await educationAuthService.getEducations({ userid });
    if (!educations) {
      throw new ValidationError("학력을 가져올 수 없습니다.");
    }

    res.status(201).send(educations);
  } catch (error) {
    next(error);
  }
});


// 특정 학력 가져오기_login_required
educationAuthRouter.get("/user/:id/education/:eduId", login_required, async function (req, res, next) {
  const eduid = req.params.eduId;
  const userid = req.params.id;
  try {
    // userid가 동일한지 확인
    if (userid) {
      const user = await educationAuthService.checkUser({ userid });
      if (user.id !== userid) {
        throw new AuthorityError("접근 권한이 없습니다");
      }
    }

    const educations = await educationAuthService.getEducation({ eduid });

    if (!educations) {
      throw new ValidationError("특정 학력을 가져올 수 없습니다.");
    }
    res.status(201).send(educations);
  } catch (error) {
    next(error);
  }
});



// 학력 수정하기_login_required
educationAuthRouter.patch("/user/:id/education/:eduId", login_required, async function (req, res, next) {
    try {
      const eduid = req.params.eduId;
      const userid = req.params.id;

      // userid가 동일한지 확인
      if (userid) {
        const user = await educationAuthService.checkUser({ userid });
        if (user.id !== userid) {
          throw new AuthorityError("접근 권한이 없습니다");
        }
      }
      // body data 로부터 업데이트할 사용자 정보를 추출
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const degree = req.body.degree ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = { school, major, degree, startDate, endDate };

      const updatedEducation = await educationAuthService.setEducation({ eduid, toUpdate });

      if (!updatedEducation) {
        throw new ValidationError("해당 학력이 수정되지 않았습니다.");
      }
  
      res.status(201).send(updatedEducation);
    } catch (error) {
      next(error);
    }
  });

// 학력 삭제하기_login_required
educationAuthRouter.delete("/user/:id/education/:eduId", login_required, async function (req, res, next) {
  const eduid = req.params.eduId;
  const userid = req.params.id;
  try {
    // userid가 동일한지 확인
    if (userid) {
      const user = await educationAuthService.checkUser({ userid });
      if (user.id !== userid) {
        throw new AuthorityError("접근 권한이 없습니다");
      }
    }
    await educationAuthService.deleteEducation({ eduid });

    // if (deletedEducation) {
    //   console.log('Error Fail');
    // }

    // res.status(200).send(
    //   console.log('삭제 완료')
    // )
  } catch (error) {
    next(error);
  }
})

export { educationAuthRouter };