import React, { useContext, useEffect, useState } from "react";
import EducationForm from "./EducationForm";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../hooks/api";
import ButtonCommon from "../../../common/ButtonCommon";

const Education = (props) => {
  const [edit, setEdit] = useState(false);
  const [school, setSchool] = useState("");

  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-01");
  const [degree, setDegree] = useState("");
  // const [educations, setEducations] = useState([]);

  const [major, setMajor] = useState("");
  const { portfolioOwnerId, isEditable, id } = props;
  const userState = useContext(UserStateContext);

  //option 상세설정 어레이
  const optionArr = [
    { value: "재학중", text: "재학중" },
    { value: "학사학위", text: "학사학위" },
    { value: "석사학위", text: "석사학위" },
    { value: "박사학위", text: "박사학위" },
  ];

  //form button 상세설정 어레이
  const formBtnArr = [
    {
      variant: "primary",
      type: "submit",
      className: "me-3",
      text: "추가",
    },
    {
      variant: "secondary",
      type: "button",
      className: "me-3",
      text: "취소",
      onClickHandler: () => setEdit((prev) => !prev),
    },
  ];

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

  //서버와 통신 전 더미 어레이
  const educations = [
    {
      id: "1",
      school: "스쿨1",
      major: "전공1",
      degree: "학사학위",
      startDate: "0000-01-01",
      endDate: "1111-01-01",
    },
    {
      id: "2",
      school: "스쿨2",
      major: "전공2",
      degree: "석사학위",
      startDate: "0000-01-02",
      endDate: "1111-01-01",
    },
  ];

  //제출버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({ school, degree, major, startDate, endDate });

    //서버와 통신
    // const res = await Api.post(`user/${user.id}/education`, {
    //   school,
    //   degree,
    //   major,
    //   startDate,
    //   endDate,
    // });

    // const updatedEdu = res.data;
    // setEducations((prev) => {
    //   return { ...prev, updatedEdu };
    // });
    // setEdit(false);
  };

  //삭제버튼 구현전
  const onClickDel = (eduId) => {
    console.log("delete버튼이 선택됨");
    Api.delete("users", eduId);
  };

  // 모든 학위 목록 가져오기 서버와 통신
  // useEffect(() => {
  //   Api.get(`user/${portfolioOwnerId}/educations`).then((res) => {
  //     console.log(res.data);
  //     return setEducations(res.data);
  //   });
  // }, [educations]);

  //특정 학위 목록 가져오기 서버와 통신
  useEffect(() => {}, []);

  return (
    <>
      {educations.map((education) => (
        <React.Fragment key={education.id}>
          {edit && (
            <React.Fragment key={education.id}>
              <EducationForm
                {...props}
                formList={formList}
                formBtnArr={formBtnArr}
                optionArr={optionArr}
                handleSubmit={handleSubmit}
                editState="true"
              />
              <ButtonCommon
                text="취소"
                variant="secondary"
                onClickHandler={() => setEdit((prev) => !prev)}
              />
            </React.Fragment>
          )}
          {!edit && (
            <Card style={{ width: "80rem" }} key={education.id}>
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
                        onClickHandler={() => setEdit((prev) => !prev)}
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
          )}
        </React.Fragment>
      ))}
      {isEditable && (
        <EducationForm
          {...props}
          formList={formList}
          formBtnArr={formBtnArr}
          optionArr={optionArr}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Education;
