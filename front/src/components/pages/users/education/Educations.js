import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Education from "./Education";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { educationsCommonFormProps } from "../../../utils/formListCommonProps";
import api from "../../../utils/axiosConfig";
//********************************서버와 통신 ok**************************************

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

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    try {
      const res = await api.post(`user/${userState.user.id}/education`, {
        schoolName,
        major,
        degree,
        admissionDate,
        graduationDate,
      });

      const postedNewId = res.data.eduId;

      if (res.status === 201) {
        setEducations((prev) => {
          return [
            ...prev,
            {
              eduId: postedNewId,
              schoolName,
              major,
              degree,
              admissionDate,
              graduationDate,
            },
          ];
        });
        setSchoolName("");
        setMajor("");
        setDegree("");
        setAdmissionDate("2023-01-01");
        setGraduationDate("2023-01-01");
        setAddForm(false);
      } else if (res.status !== 201) {
        // throw new Error("POST 요청이 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신이 실패하였습니다.");
    }
  };

  // 모든 학위 목록 가져오기 서버와 통신
  useEffect(() => {
    //portfolioOwnerData.id를 가져오고 나서 실행
    if (portfolioOwnerData.id) {
      api.get(`user/${portfolioOwnerData.id}/educations`).then((res) => {
        return setEducations(res.data.educations);
      });
    }
  }, [portfolioOwnerData.id]);

  return (
    <>
      <Card border="warning">
        <h3>학력</h3>
        <br />
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
              variant="light"
              size="sm"
              onClickHandler={() => setAddForm((prev) => !prev)}
              text="+"
            />
          </Card>
        )}
      </Card>
      <br />
    </>
  );
};

export default Educations;
