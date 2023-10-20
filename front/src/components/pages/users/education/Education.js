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
}) => {
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-01");
  const [degree, setDegree] = useState("");
  const [educations, setEducations] = useState([]);
  const [major, setMajor] = useState("");
  const userState = useContext(UserStateContext);

  //form 상세설정 어레이
  const formList = [
    {
      controlId: "eduSchoolName",
      customClassName: "mb-3",
      label: "학교이름",
      placeholder: "학교이름",
      value: school,
      changeHandler: (v) => setSchool(v),
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
      value: major,
      changeHandler: (v) => setDegree(v),
      optionValue: "학위를 선택하세요",
      optionArr: optionArr,
    },
    {
      controlId: "startDate",
      customClassName: "mb-3",
      value: startDate,
      changeHandler: (v) => setStartDate(v),
      label: "입학연월일",
      type: "date",
    },
    {
      controlId: "endDate",
      customClassName: "mb-3",
      value: endDate,
      changeHandler: (v) => setEndDate(v),
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
    console.log({ school, degree, major, startDate, endDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    const res = await Api.post(`user/${userState.user.id}/education`, {
      school,
      degree,
      major,
      startDate,
      endDate,
    });
    // if (res.ok) {
    setEducations((prev) => {
      return [...prev, { school, degree, major, startDate, endDate }];
    });
    setSchool("");
    setStartDate("2023-01-01");
    setEndDate("2023-01-01");
    setDegree("");
    setAddForm(false);
    // } else if (!res.ok) {
    //   throw new Error("POST 요청이 실패하였습니다.");
    // }
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
                <Card.Title>{education.school}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {education.major}
                </Card.Subtitle>
                <Card.Text>
                  {education.startDate} ~ {education.endDate}
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
