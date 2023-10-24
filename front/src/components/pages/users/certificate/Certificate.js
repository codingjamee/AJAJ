import { useContext, useEffect, useState } from "react";
import * as Api from "../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { certificatesCommonFormProps } from "../../../utils/formListCommonProps";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { UserStateContext } from "../../../../App";

const Certificate = ({ isEditable, certificate = {}, setCertificates }) => {
  // const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [certificateName, setCertificateName] = useState(
    certificate.certificateName || ""
  );
  const [certificateDetail, setCertificateDetail] = useState(
    certificate.certificateName || ""
  );
  const [certificateOrganization, setCertificateOrganization] = useState(
    certificate.certificateOrganization || ""
  );
  const [acquisitionDate, setAcquisitionDate] = useState(
    certificate.acquisitionDate || "2023-01-01"
  );

  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  //form 상세설정 어레이
  const certificateState = [
    { value: certificateName, changeHandler: (v) => setCertificateName(v) },
    { value: certificateDetail, changeHandler: (v) => setCertificateDetail(v) },
    {
      value: certificateOrganization,
      changeHandler: (v) => setCertificateOrganization(v),
    },
    { value: acquisitionDate, changeHandler: (v) => setAcquisitionDate(v) },
  ];

  const certificateFormList = certificatesCommonFormProps.map(
    (certificateCommon, index) => {
      return { ...certificateCommon, ...certificateState[index] };
    }
  );

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //post 서버와 통신
    try {
      const res = await Api.put(
        `user/${userState.user.id}/certificate/${certificate.certificateId}`,
        {
          certificateName,
          // certificateDetail,
          certificateOrganization,
          acquisitionDate,
        },
        "Certificate"
      );
      console.log(res.data);
      if (res.status === 200) {
        setCertificates((prev) => {
          const updatedCert = prev.map((prevCert) => {
            if (prevCert.certificateId === certificate.certificateId) {
              return {
                ...prevCert,
                certificateName,
                // certificateDetail,
                certificateOrganization,
                acquisitionDate,
              };
            }
            return prevCert;
          });
          return updatedCert;
        });
        setEditMode(false);
      } else if (res.status !== 200) {
        throw new Error("POST 요청을 실패하였습니다.");
      }
    } catch (err) {
      throw new Error("서버와 통신이 실패하였습니다");
    }
  };

  //삭제함수
  const onClickDel = async (certificateId) => {
    const res = await Api.delete(
      `user/${userState.user.id}/certificate`,
      certificateId,
      "certificate"
    );
    // console.log(res);
    if (res.status === 200) {
      setCertificates((prev) =>
        prev.filter(
          (certificates) => certificates.certificateId !== certificateId
        )
      );
    } else if (res.status !== 200) {
      throw new Error("삭제를 실패하였습니다");
    }
  };

  return (
    <Card style={{ width: "100%" }}>
      {!editMode && (
        <>
          <Card.Title>{certificate.certificateName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {certificate.certificateDetail}
            {certificate.certificateOrganization}
          </Card.Subtitle>
          <Card.Text>{certificate.acquisitionDate}</Card.Text>
          {isEditable && (
            <Form.Group className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <ButtonCommon
                  variant="primary"
                  type="submit"
                  className="me-3"
                  text="수정"
                  onClickHandler={() => setEditMode((prev) => !prev)}
                />

                <ButtonCommon
                  variant="secondary"
                  text="삭제"
                  onClickHandler={() => onClickDel(certificate.certificateId)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          onSubmitHandler={onSubmitHandler}
          isEditable={isEditable}
          formList={certificateFormList}
          setAddForm={setEditMode}
        />
      )}
    </Card>
  );
};

export default Certificate;
