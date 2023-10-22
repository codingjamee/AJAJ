import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Project from "./Project";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { projectsCommonFormProps } from "../../../utils/formListCommonProps";

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
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  //form 상세설정 어레이
  const projectState = [
    {
      value: projectName,
      changeHandler: (v) => setProjectName(v),
    },
    {
      value: projectDetail,
      changeHandler: (v) => setProjectDetail(v),
    },
    {
      value: projectImgUrl,
      changeHandler: (v) => setDegree(v),
    },
    {
      value: projectStartDate,
      changeHandler: (v) => setStartDate(v),
    },
    {
      value: projectEndDate,
      changeHandler: (v) => setEndDate(v),
    },
  ];

  const projFormList = projectsCommonFormProps.map((projCommon, index) => {
    return { ...projCommon, ...projectState[index] };
  });
  console.log(projFormList);

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({ schoolName, major, degree, admissionDate, graduationDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 프로젝트 서버와 통신
    const res = await Api.post(`user/${userState.user.id}/project`, {
      projectName,
      projectDetail,
      projectStartDate,
      projectEndDate,
    });

    console.log(res);
    if (res.data.statusCode === 201) {
      setEducations((prev) => {
        return [
          ...prev,
          { projectName, projectDetail, projectStartDate, projectEndDate },
        ];
      });
      setProjectName("");
      setProjectDetailsetProjectName("");
      setProjectImgUrlsetProjectName("");
      setProjectStartDatesetProjectName("2023-01-01");
      setProjectEndDatesetProjectName("2023-01-01");
    } else if (res.data.statusCode !== 201) {
      throw new Error("POST 요청이 실패하였습니다.");
    }
  };

  // 모든 프로젝트 목록 가져오기 서버와 통신
  useEffect(() => {
    Api.get(`user/${portfolioOwnerData.id}/projects`, "", "Projects").then(
      (res) => {
        return setEducations(res.data.educations);
      }
    );
  }, [portfolioOwnerData.id]);

  return (
    <>
      <h4>학력</h4>
      {projectsArr.map((project, index) => (
        <React.Fragment key={`project-${index}`}>
          <Project
            key={`project-${index}`}
            isEditable={isEditable}
            formList={projFormList}
            setprojects={setProjects}
            project={project}
          />
        </React.Fragment>
      ))}
      {isEditable && (
        <Card>
          {addForm && (
            <FormWrapper
              {...props}
              formList={projFormList}
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
