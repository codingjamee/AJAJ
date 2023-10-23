import { useContext, useEffect, useState } from "react";
import * as Api from "../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { certificatesCommonFormProps } from "../../../utils/formListCommonProps";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { UserStateContext } from "../../../../App";

const Certificate = ({
  isEditable,
  setAddForm,
  certificate = [],
  setCertificates,
}) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [certificateName, setCertificateName] = useState(
    certificate.certificateName || ""
  );
  const [certificateDetail, setCertificateDetail] = useState(
    certificate.certificateName || ""
  );
  const [certificateOrganization, setCertificateOrganization] = useState("");
  const [certificateDate, setCertificateDate] = useState("2023-01-01");

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
    { value: certificateDate, changeHandler: (v) => setCertificateDate(v) },
  ];

  const certificateFormList = certificatesCommonFormProps.map(
    (certificateCommon, index) => {
      return { ...certificateCommon, ...certificateState[index] };
    }
  );

  // //서버와 통신 특정 학위 목록 가져와서 상태변경!
  // useEffect(() => {}, []);

  //수정해서 onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({
      certificateName,
      certificateDetail,
      certificateOrganization,
      certificateDate,
    });
  };

  //삭제함수
  const onClickDel = async (certificateId) => {
    console.log(certificate);
    console.log("delete버튼이 선택됨");
    console.log(certificateId);

    const res = await Api.delete(
      `user/${userState.user.id}/certificate`,
      certificateId,
      "certificate"
    );
    console.log(res);
    // if (res.data.ok) {
    setCertificates((prev) =>
      prev.filter(
        (certificates) => certificates.certificateId !== certificateId
      )
    );
    // } else if (!res.data.ok) {
    // throw new Error("삭제를 실패하였습니다");
    // }
  };

  return (
    <Card>
      <Card.Body>
        {!editMode && (
          <>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{certificate.certificateName}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {certificate.certificateDetail}
                  {certificate.certificateOrganization}
                </Card.Subtitle>
                <Card.Text>{certificate.certificateDate}</Card.Text>

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
                        onClickHandler={() => onClickDel(certificate.id)}
                      />
                    </Col>
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
          </>
        )}
        {editMode && (
          <FormWrapper
            onSubmitHandler={onSubmitHandler}
            isEditable={isEditable}
            onClickHandler={setAddForm}
            formList={certificateFormList}
            setAddForm={setEditMode}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Certificate;
