import { useContext, useEffect, useState } from "react";
import * as Api from "../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { UserStateContext } from "../../../../App";

const Education = ({
  isEditable,
  optionArr,
  submitHandler,
  setAddForm,
  education = [],
  setEducations,
}) => {
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [admissionDate, setAdmissionDate] = useState("2023-01-01");
  const [graduationDate, setGraduationDate] = useState("2023-01-01");
  // const [educations, setEducations] = useState([]);
  const userState = useContext(UserStateContext);

  //form 상세설정 어레이
  const formList = [
    {
      controlId: "eduSchoolName",
      customClassName: "mb-3",
      label: "학교이름",
      placeholder: "학교이름",
      value: schoolName,
      changeHandler: (v) => setSchoolName(v),
    },
    {
      controlId: "eduMajor",
      customClassName: "mb-3",
      label: "전공",
      placeholder: "전공",
      value: major,
      changeHandler: (v) => setMajor(v),
    },
    {
      controlId: "eduDegree",
      select: "true",
      customClassName: "mb-3",
      label: "학위",
      placeholder: "학위",
      value: degree,
      changeHandler: (v) => setDegree(v),
      optionValue: "학위를 선택하세요",
      optionArr: optionArr,
    },
    {
      controlId: "startDate",
      customClassName: "mb-3",
      value: admissionDate,
      changeHandler: (v) => setAdmissionDate(v),
      label: "입학연월일",
      type: "date",
    },
    {
      controlId: "endDate",
      customClassName: "mb-3",
      value: graduationDate,
      changeHandler: (v) => setGraduationDate(v),
      label: "졸업연월일",
      type: "date",
    },
  ];

  // //서버와 통신 특정 학위 목록 가져와서 상태변경!
  // useEffect(() => {}, []);

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    //제출버튼 클릭시
    e.preventDefault();
    console.log("handler clicked");

    console.log({ schoolName, major, degree, admissionDate, graduationDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    const res = await Api.post(`user/${userState.user.id}/education`, {
      schoolName,
      major,
      degree,
      admissionDate,
      graduationDate,
    });
    console.log(res.ok);
    if (res.data.ok) {
      setEducations((prev) => {
        return [
          ...prev,
          { schoolName, major, degree, admissionDate, graduationDate },
        ];
      });
      setSchoolName("");
      setMajor("");
      setDegree("");
      setAdmissionDate("2023-01-01");
      setGraduationDate("2023-01-01");
      setAddForm(false);
    } else if (!res.data.ok) {
      throw new Error("POST 요청이 실패하였습니다.");
    }
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
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{education.schoolName}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {education.major}
                </Card.Subtitle>
                <Card.Text>
                  {education.admissionDate} ~ {education.graduationDate}
                </Card.Text>

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
                        onClickHandler={() => onClickDel(education.id)}
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

export default Education;
