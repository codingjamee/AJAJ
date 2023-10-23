import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { projectsCommonFormProps } from "../../../utils/formListCommonProps";
import Project from "./Project";

//********************************서버와 통신전 **************************************

const projects = [
  {
    id: "1",
    projectName: "프로젝트 제목",
    projectDetail: "프로젝트 설명입니다 하하하",
    projectImgUrl: "https://picsum.photos/200/200",
    projectStartDate: "2111-06-01",
    projectEndDate: "2023-01-01",
  },
  {
    id: "2",
    projectName: "프로젝트 제목22",
    projectDetail: "프로젝트 설명222입니다 하하하",
    projectImgUrl: "https://picsum.photos/200/200",
    projectStartDate: "2023-01-01",
    projectEndDate: "2023-01-01",
  },
];
const Projects = (props) => {
  const [addForm, setAddForm] = useState(false);
  // const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectImgUrl, setProjectImgUrl] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("2023-01-01");
  const [projectEndDate, setProjectEndDate] = useState("2023-01-01");
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { isEditable } = props;

  console.log("projects", projects);

  //form 상세설정 어레이
  const projectState = [
    { value: projectName, changeHandler: (v) => setProjectName(v) },
    { value: projectDetail, changeHandler: (v) => setProjectDetail(v) },
    {
      value: projectImgUrl,
      projectImgUrl: (v) => setProjectImgUrl(v),
    },
    { value: projectStartDate, changeHandler: (v) => setProjectStartDate(v) },
    { value: projectEndDate, changeHandler: (v) => setProjectEndDate(v) },
  ];

  const projectFormList = projectsCommonFormProps.map(
    (projectCommon, index) => {
      return { ...projectCommon, ...projectState[index] };
    }
  );
  console.log(projectFormList);

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({
      projectName,
      projectDetail,
      projectImgUrl,
      projectStartDate,
      projectEndDate,
    });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    // const res = await Api.post(`user/${userState.user.id}/project`, {
    // projectName,
    // projectDetail,
    // projectImgUrl,
    // projectStartDate,
    // projectEndDate,
    // });

    // console.log(res);
    // if (res.data.statusCode === 201) {
    //   setProject((prev) => {
    //     return [
    //       ...prev,
    //       { projectName, projectDetail, projectOrganization, projectDate },
    //     ];
    //   });
    // setProjectName = useState("");
    // setProjectDetail = useState("");
    // setProjectImgUrl = useState("");
    // setProjectStartDate = useState("2023-01-01");
    // setProjectEndDate = useState("2023-01-01");
    //   setAddForm(false);
    // } else if (!res.data.ok) {
    //   throw new Error("POST 요청이 실패하였습니다.");
    // }
  };

  // 모든 수상 목록 가져오기 서버와 통신
  // useEffect(() => {
  //   Api.get(`user/${portfolioOwnerData.id}/projects`, "", "project").then(
  //     (res) => {
  //       return setProject(res.data.project);
  //     }
  //   );
  // }, [portfolioOwnerData.id]);

  return (
    <>
      <h4>프로젝트</h4>
      {projects.map((project, index) => (
        <Project
          key={`project-${index}`}
          isEditable={isEditable}
          formList={projectFormList}
          // setProject={setProject}
          project={project}
        />
      ))}
      {isEditable && (
        <Card>
          {addForm && (
            <FormWrapper
              {...props}
              formList={projectFormList}
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
