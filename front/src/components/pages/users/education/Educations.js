import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Education from "./Education";
//option 상세설정 어레이
const optionArr = [
  { value: "재학중", text: "재학중" },
  { value: "학사학위", text: "학사학위" },
  { value: "석사학위", text: "석사학위" },
  { value: "박사학위", text: "박사학위" },
];

const Educations = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [admissionDate, setAdmissionDate] = useState("2023-01-01");
  const [graduationDate, setGraduationDate] = useState("2023-01-01");
  const [educations, setEducations] = useState([]);
  const { portfolioOwnerId, isEditable } = props;
  const userState = useContext(UserStateContext);

  console.log("userState.user.id", userState.user.id);
  console.log("portfolioOwnerId", portfolioOwnerId);

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

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
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

    console.log(res);
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

  // 모든 학위 목록 가져오기 서버와 통신
  useEffect(() => {
    Api.get(`user/${portfolioOwnerId}/educations`, "", "Educations").then(
      (res) => {
        console.log(res.data.educations);
        return setEducations(res.data.educations);
      }
    );
  }, [portfolioOwnerId]);

  return (
    <>
      <h4>학력</h4>
      {educations.map((education, index) => (
        <React.Fragment key={`education-${index}`}>
          <Education
            key={`education-${index}`}
            isEditable={isEditable}
            optionArr={optionArr}
            formList={formList}
            setEducations={setEducations}
            education={education}
          />
        </React.Fragment>
      ))}
      {isEditable && (
        <Card>
          {addForm && (
            <FormWrapper
              {...props}
              formList={formList}
              optionArr={optionArr}
              onSubmitHandler={handleSubmit}
              setAddForm={setAddForm}
            />
          )}
          <ButtonCommon
            variant="outline-info"
            size="sm"
            onClickHandler={() => setAddForm((prev) => !prev)}
            text="+"
          />
        </Card>
      )}
    </>
  );
};

export default Educations;
