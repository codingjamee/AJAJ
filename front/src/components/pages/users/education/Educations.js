import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Education from "./Education";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { educationsCommonFormProps } from "../../../utils/formListCommonProps";

const Educations = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");
  const [admissionDate, setAdmissionDate] = useState("2023-01-01");
  const [graduationDate, setGraduationDate] = useState("2023-01-01");
  const [educations, setEducations] = useState([]);
  const { isEditable } = props;
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  //form 상세설정 어레이
  const eduState = [
    { value: schoolName, changeHandler: (v) => setSchoolName(v) },
    { value: major, changeHandler: (v) => setMajor(v) },
    { value: degree, changeHandler: (v) => setDegree(v) },
    { value: admissionDate, changeHandler: (v) => setAdmissionDate(v) },
    { value: graduationDate, changeHandler: (v) => setGraduationDate(v) },
  ];

  const eduFormList = educationsCommonFormProps.map((eduCommon, index) => {
    return { ...eduCommon, ...eduState[index] };
  });
  console.log(eduFormList);

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
    if (res.data.statusCode === 201) {
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
    Api.get(`user/${portfolioOwnerData.id}/educations`, "", "Educations").then(
      (res) => {
        return setEducations(res.data.educations);
      }
    );
  }, [portfolioOwnerData.id]);

  return (
    <>
      <h4>학력</h4>
      {educations.map((education, index) => (
        <Education
          key={`education-${index}`}
          isEditable={isEditable}
          formList={eduFormList}
          setEducations={setEducations}
          education={education}
        />
      ))}
      {isEditable && (
        <Card>
          {addForm && (
            <FormWrapper
              {...props}
              formList={eduFormList}
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
