import { useEffect, useState } from "react";
import * as Api from "../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";

const Certification = ({
  isEditable,
  optionArr,
  submitHandler,
  setAddForm,
  certification = [],
}) => {
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // const [certification, setCertification] = useState([]);
  const [certName, setCertName] = useState("");
  const [organization, setOrganization] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("2023-01-01");

  //form 상세설정 어레이
  const formList = [
    {
      controlId: "certSchoolName",
      customClassName: "mb-3",
      label: "자격증 명",
      placeholder: "자격증 명",
      value: certName,
      changeHandler: (v) => setCertName(v),
    },
    {
      controlId: "certOrganization",
      customClassName: "mb-3",
      label: "기관",
      placeholder: "기관",
      value: organization,
      changeHandler: (v) => setOrganization(v),
    },

    {
      controlId: "acquisitionDate",
      customClassName: "mb-3",
      value: acquisitionDate,
      label: "취득일자",
      type: "date",
      changeHandler: (v) => setAcquisitionDate(v),
    },
  ];

  // //서버와 통신 특정 학위 목록 가져와서 상태변경!
  // useEffect(() => {}, []);

  //수정해서 onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ certName, organization, acquisitionDate });
  };

  //삭제버튼 구현전

  const onClickDel = (eduId) => {
    console.log("delete버튼이 선택됨");
    Api.delete("users", eduId);
  };

  return (
    <Card>
      <Card.Body>
        {!editMode && (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{certification.certName}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {certification.organization}
                </Card.Subtitle>
                <Card.Text>{certification.acquisitionDate}</Card.Text>

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
                        onClickHandler={() => onClickDel(certification.id)}
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
            formList={formList}
            setAddForm={setEditMode}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Certification;
