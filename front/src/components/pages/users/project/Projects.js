import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { projectsCommonFormProps } from "../../../../utils/formListCommonProps";
import Project from "./Project";
import api from "../../../../utils/axiosConfig";
import axios from "axios";
import { useMemo } from "react";

const Projects = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectImgFile, setProjectImgFile] = useState({});
  const [projectStartDate, setProjectStartDate] = useState("2023-01-01");
  const [projectEndDate, setProjectEndDate] = useState("2023-01-01");
  const [imgBase64, setImgBase64] = useState(null);
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { isEditable } = props;

  //form 상세설정 어레이
  const projectState = useMemo(
    () => [
      { value: projectName, changeHandler: (v) => setProjectName(v) },
      { value: projectDetail, changeHandler: (v) => setProjectDetail(v) },
      {
        value: imgBase64,
        changeHandler: (v) => handleChangeFile(v),
      },
      { value: projectStartDate, changeHandler: (v) => setProjectStartDate(v) },
      { value: projectEndDate, changeHandler: (v) => setProjectEndDate(v) },
    ],
    [
      projectName,
      setProjectName,
      projectDetail,
      setProjectDetail,
      imgBase64,
      projectStartDate,
      setProjectStartDate,
      projectEndDate,
      setProjectEndDate,
    ]
  );

  const projectFormList = useMemo(
    () =>
      projectsCommonFormProps.map((projectCommon, index) => {
        return { ...projectCommon, ...projectState[index] };
      }),
    [projectState]
  );

  const handleChangeFile = (e) => {
    // console.log(e.target.files[0]);
    console.log(e);
    if (e.target.files && e.target.files[0]) {
      setProjectImgFile(e.target.files[0]);
      console.log(e.target.files[0]);
      setImgBase64([]);
    }
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            var base64Sub = base64.toString();

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            console.log(imgBase64);
          }
        };
      }
    }
  };

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e);

    if (!projectImgFile) {
      alert("이미지를 등록해주세요");
      return;
    }

    console.log("projectImgFile", projectImgFile);

    const formData = new FormData();

    formData.append("image", projectImgFile);
    formData.append(
      "projectName",
      new Blob([JSON.stringify(projectName)], { type: "application/json" })
    );
    formData.append(
      "projectDetail",
      new Blob([JSON.stringify(projectDetail)], { type: "application/json" })
    );
    formData.append(
      "projectStartDate",
      new Blob([JSON.stringify(projectStartDate)], { type: "application/json" })
    );
    formData.append(
      "projectEndDate",
      new Blob([JSON.stringify(projectEndDate)], { type: "application/json" })
    );
    for (let key of formData) {
      console.log(`${key}`);
    }
    //post 서버와 통신
    try {
      if (userState.user.id) {
        console.log(`user/${userState.user.id}/project`, "여기로 보냅니다.");
        const res = await api.post(
          `user/${userState.user.id}/project`,
          formData
        );

        const postedNewId = res.data.projectId;
        if (res.status === 201) {
          setProjects((prev) => {
            return [
              ...prev,
              {
                projectId: postedNewId,
                projectName,
                projectDetail,
                projectImgFile,
                projectStartDate,
                projectEndDate,
              },
            ];
          });
          setProjectName("");
          setProjectDetail("");
          setProjectImgFile({});
          setProjectStartDate("2023-01-01");
          setProjectEndDate("2023-01-01");
          setAddForm(false);
        } else if (res.status !== 201) {
          throw new Error("POST 요청이 실패하였습니다.");
        }
      }
    } catch (err) {
      console.error(err);
      throw new Error("서버와 통신이 실패하였습니다.");
    }
  };

  // 모든 프로젝트 목록 가져오기 서버와 통신
  useEffect(() => {
    //portfolioOwnerData.id를 가져오고 나서 실행
    if (portfolioOwnerData.id) {
      api.get(`user/${portfolioOwnerData.id}/projects`).then((res) => {
        return setProjects(res.data.projects);
      });
    }
  }, [portfolioOwnerData.id]);

  return (
    <>
      <Card border="warning">
        <h3>프로젝트</h3>
        <br />
        {projects.map((project, index) => (
          <Project
            key={`project-${index}`}
            isEditable={isEditable}
            formList={projectFormList}
            setProjects={setProjects}
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
              variant="light"
              size="sm"
              onClickHandler={() => {
                setImgBase64("");
                setAddForm((prev) => !prev);
              }}
              text={addForm ? "-" : "+"}
            />
          </Card>
        )}
      </Card>
      <br />
    </>
  );
};

export default Projects;
