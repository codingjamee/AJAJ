const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/requireMiddleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');

const { awardAuthService } = require('../services/awardService');

const awardAuthRouter = Router();

// 수상내역 추가하기
awardAuthRouter.post("/user/:id/award", login_required, request_checked, async function (req, res, next) {
    try {
        const userId = req.params.id;
        const { awardName, awardDetail, awardOrganization, awardDate } = req.body;
        const newAward = await awardAuthService.addAward({
            userId, awardName, awardDetail, awardOrganization, awardDate});

      if (!newAward) {
        throw new NotFoundError("해당 수상내역이 생성되지 않았습니다.");
      }

      res.status(201).send({
        awardId: newAward.awardId,
      });
    } catch (error) {
      next(error);
    }
  });


// 수상내역 전체 가져오기
awardAuthRouter.get("/user/:id/awards", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const awards = await awardAuthService.getAwards({ userId });

    if (!awards) {
      throw new NotFoundError("수상내역을 가져올 수 없습니다.");
    }
    res.status(200).send({awards});
  } catch (error) {
    next(error);
  }
});


// 수상내역 수정하기
awardAuthRouter.put("/user/:id/award/:awardId", login_required, userId_checked, request_checked, async function (req, res, next) {
    try {
      const awardId = req.params.awardId;

      const { awardName, awardDetail, awardOrganization, awardDate } = req.body;
      const toUpdate = { awardName, awardDetail, awardOrganization, awardDate };

      const updatedAward = await awardAuthService.setAward({ awardId, toUpdate });

      if (!updatedAward) {
        throw new NotFoundError("해당 수상내역이 수정되지 않았습니다.");
      }
  
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  });


// 수상내역 삭제하기
awardAuthRouter.delete("/user/:id/award/:awardId", login_required, userId_checked, async function (req, res, next) {
  const awardId = req.params.awardId;
  try {
    const deleteAward = await awardAuthService.deleteAward({ awardId });

    if (!deleteAward) {
      throw new NotFoundError("해당 수상내역이 삭제되지 않았습니다.");
    }

    res.status(200).send();
  } catch (error) {
    next(error);
  }
  
})

export { awardAuthRouter };
