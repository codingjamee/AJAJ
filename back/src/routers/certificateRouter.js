const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/requireMiddleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');

const { certificateAuthService } = require('../services/certificateService');

const certificateAuthRouter = Router();

// 자격증 추가하기_login_required
certificateAuthRouter.post("/user/:id/certificate", login_required, request_checked, async function (req, res, next) {
    try {
        const userId = req.params.id;
        const { certificateName, certificateOrganization, acquisitionDate } = req.body;
        const newCertificate = await certificateAuthService.addCertificate({
            userId, certificateName, certificateOrganization, acquisitionDate });

      if (!newCertificate) {
        throw new NotFoundError("해당 자격증이 생성되지 않았습니다.");
      }

      res.status(201).send({
        certificateId: newCertificate.certificateId,
      });
    } catch (error) {
      next(error);
    }
  });

// 자격증 전체 가져오기_login_required
certificateAuthRouter.get("/user/:id/certificates", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const certificates = await certificateAuthService.getCertificates({ userId });

    if (!certificates) {
      throw new NotFoundError("자격증을 가져올 수 없습니다.");
    }
    res.status(200).send({certificates});
  } catch (error) {
    next(error);
  }
});


// 자격증 수정하기_login_required
certificateAuthRouter.put("/user/:id/certificate/:certificateId", login_required, userId_checked, request_checked, async function (req, res, next) {
    try {
      const certificateId = req.params.certificateId;

      const { certificateName, certificateOrganization, acquisitionDate } = req.body;
      const toUpdate = { certificateName, certificateOrganization, acquisitionDate };

      const updatedCertificate = await certificateAuthService.setCertificate({ certificateId, toUpdate });

      if (!updatedCertificate) {
        throw new NotFoundError("해당 자격증이 수정되지 않았습니다.");
      }
  
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  });

// 자격증 삭제하기_login_required
certificateAuthRouter.delete("/user/:id/certificate/:certificateId", login_required, userId_checked, async function (req, res, next) {
  const certificateId = req.params.certificateId;
  try {
    const deleteCertificate = await certificateAuthService.deleteCertificate({ certificateId });

    if (!deleteCertificate) {
      throw new NotFoundError("해당 자격증이 삭제되지 않았습니다.");
    }

    res.status(200).send();

  } catch (error) {
    next(error);
  }
  
})

export { certificateAuthRouter };
