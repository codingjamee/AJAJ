import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Education from "./Project";
//option 상세설정 어레이
const optionArr = [
  { value: "재학중", text: "재학중" },
  { value: "학사학위", text: "학사학위" },
  { value: "석사학위", text: "석사학위" },
  { value: "박사학위", text: "박사학위" },
];

//서버와 통신전 더미어레이

const projectsArr = [
  {
    id: "1",
    projectName: "프로젝트1",
    projectDetail: "이것은 프로젝트1 설명입니다.",
    projectImg: "프로젝트 이미지",
    startDate: "2023-01-01",
    endDate: "2023-06-09",
  },
  {
    id: "2",
    projectName: "프로젝트2",
    projectDetail: "이것은 프로젝트2 설명입니다.",
    projectImgUrl: "프로젝트 이미지",
    projectStartDate: "2020-07-05",
    projectEndDate: "2020-08-05",
  },
];

const Projects = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectImgUrl, setProjectImgUrl] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("2023-01-01");
  const [projectEndDate, setProjectEndDate] = useState("2023-01-01");
  // const [projectArr, setProjectArr] = useState([]);
  const { portfolioOwnerId, isEditable, id } = props;
  const userState = useContext(UserStateContext);

  //form 상세설정 어레이
  const formList = [
    {
      controlId: "projectName",
      customClassName: "mb-3",
      label: "프로젝트명",
      placeholder: "프로젝트명",
      value: projectName,
      changeHandler: (v) => setProjectName(v),
    },
    {
      controlId: "projectDetail",
      customClassName: "mb-3",
      label: "프로젝트설명",
      placeholder: "프로젝트설명",
      value: projectDetail,
      changeHandler: (v) => setProjectDetail(v),
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

  //제출버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({ school, degree, major, startDate, endDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
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

  // 모든 학위 목록 가져오기 서버와 통신
  // useEffect(() => {
  //   Api.get(`user/${portfolioOwnerId}/educations`).then((res) => {
  //     console.log(res.data);
  //     return setEducations(res.data);
  //   });
  // }, [educations]);

  return (
    <>
      <h4>학력</h4>
      {educations.map((education) => (
        <React.Fragment key={education.id}>
          <Education
            isEditable={isEditable}
            optionArr={optionArr}
            formList={formList}
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

export default Projects;
