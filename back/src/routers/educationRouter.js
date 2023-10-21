const { Router } = require('express');
const { login_required } = require('../middlewares/login_required');
const { userId_checked, request_checked } = require('../middlewares/middleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');

const { educationAuthService } = require('../services/educationService');

const educationAuthRouter = Router();

// 학력 추가하기_login_required
educationAuthRouter.post("/user/:id/education", login_required, request_checked, async function (req, res, next) {
    try {
        const userId = req.params.id;
        const { schoolName, major, degree, admissionDate, graduationDate } = req.body;
        const newEducation = await educationAuthService.addEducation({
            userId, schoolName, major, degree, admissionDate, graduationDate});

      if (!newEducation) {
        throw new NotFoundError("해당 학력이 생성되지 않았습니다.");
      }

      res.status(200).json({
        statusCode: 200,
        message: '성공 메시지', 
      });
    } catch (error) {
      next(error);
    }
  });

// 학력 전체 가져오기_login_required
educationAuthRouter.get("/user/:id/educations", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const educations = await educationAuthService.getEducations({userId});

    if (!educations) {
      throw new NotFoundError("학력을 가져올 수 없습니다.");
    }
    res.status(200).json({educations});
  } catch (error) {
    next(error);
  }
});


// 특정 학력 가져오기_login_required
// educationAuthRouter.get("/user/:id/education/:eduId", login_required, async function (req, res, next) {
//   try {
//     const eduId = req.params.eduId;
//     const userId = req.params.id;
//     // userId가 동일한지 확인
//     if (userId) {
//       const user = await educationAuthService.checkUser({ userId });
//       if (user.id !== userId) {
//         throw new AuthorityError("접근 권한이 없습니다");
//       }
//     }

//     const educations = await educationAuthService.getEducation({ eduId });

//     if (!educations) {
//       throw new NotFoundError("특정 학력을 가져올 수 없습니다.");
//     }
//     res.status(201).send(educations);
//   } catch (error) {
//     next(error);
//   }
// });


// 학력 수정하기_login_required
educationAuthRouter.put("/user/:id/education/:eduId", login_required, userId_checked, request_checked, async function (req, res, next) {
    try {
      const eduId = req.params.eduId;

      const { schoolName, major, degree, admissionDate, graduationDate } = req.body;
      const toUpdate = { schoolName, major, degree, admissionDate, graduationDate };

      const updatedEducation = await educationAuthService.setEducation({ eduId, toUpdate });

      if (!updatedEducation) {
        throw new NotFoundError("해당 학력이 수정되지 않았습니다.");
      }
  
      res.status(200).json({
        statusCode: 200,
        message: '성공 메시지', 
      });
    } catch (error) {
      next(error);
    }
  });

// 학력 삭제하기_login_required
educationAuthRouter.delete("/user/:id/education/:eduId", login_required, userId_checked, async function (req, res, next) {
  const eduId = req.params.eduId;
  try {
    const deleteEducation = await educationAuthService.deleteEducation({ eduId });

    if (!deleteEducation) {
      throw new NotFoundError("해당 학력이 삭제되지 않았습니다.");
    }

    res.status(200).json({
      statusCode: 200,
      message: '성공 메시지', 
    });

  } catch (error) {
    next(error);
  }
  
})

export { educationAuthRouter };
