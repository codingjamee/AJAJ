import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { projectsCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";

//********************************서버와 통신전**************************************
//*******************프로젝트 이미지 첨부***************/

const Project = ({ isEditable, project = {}, setProjects }) => {
  // const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [projectName, setProjectName] = useState(project.projectName || "");
  const [projectDetail, setProjectDetail] = useState(
    project.projectDetail || ""
  );
  const [projectImgUrl, setProjectImgUrl] = useState(
    project.projectImgUrl || ""
  );
  const [projectStartDate, setProjectStartDate] = useState(
    project.projectStartDate || "2023-10-01"
  );
  const [projectEndDate, setProjectEndDate] = useState(
    project.projectEndDate || "2023-01-01"
  );
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  //form 상세설정 어레이
  const projectState = useMemo(
    () => [
      { value: projectName, changeHandler: (v) => setProjectName(v) },
      { value: projectDetail, changeHandler: (v) => setProjectDetail(v) },
      {
        value: projectImgUrl,
        changeHandler: (v) => setProjectImgUrl(v),
      },
      { value: projectStartDate, changeHandler: (v) => setProjectStartDate(v) },
      { value: projectEndDate, changeHandler: (v) => setProjectEndDate(v) },
    ],
    [
      projectName,
      setProjectName,
      projectDetail,
      setProjectDetail,
      projectImgUrl,
      setProjectImgUrl,
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

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    try {
      const res = await api.put(
        `user/${userState.user.id}/project/${project.projectId}`,
        {
          projectName,
          projectDetail,
          projectImgUrl,
          projectStartDate,
          projectEndDate,
        }
      );
      if (res.status === 200) {
        setProjects((prev) => {
          const updatedProjects = prev.map((prevProject) => {
            if (prevProject.projectId === project.projectId) {
              return {
                ...prevProject,
                projectName,
                projectDetail,
                projectImgUrl,
                projectStartDate,
                projectEndDate,
              };
            }
            return prevProject;
          });
          return updatedProjects;
        });
        setEditMode(false);
      } else if (res.status !== 200) {
        // throw new Error("PUT 요청이 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신이 실패하였습니다");
    }
  };

  //삭제함수

  const onClickDel = async (projectId) => {
    try {
      const res = await api.delete(
        `user/${userState.user.id}/project/${projectId}`
      );
      if (res.status === 200) {
        setProjects((prevObj) => {
          return prevObj.filter((projects) => projects.projectId !== projectId);
        });
      } else if (res.status !== 200) {
        // throw new Error("삭제를 실패하였습니다");
      }
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신에 실패하였습니다");
    }
  };

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && (
        <>
          <Card.Title>{project.projectName}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {project.projectDetail}
            <img src={project.projectImgUrl} />
          </Card.Subtitle>
          <Card.Text>
            {project.projectStartDate} ~ {project.projectEndDate}
          </Card.Text>

          {isEditable && (
            <Form.Group className="mb-5 text-center">
              <Col sm={{ span: 20 }}>
                <ButtonCommon
                  variant="outline-primary"
                  type="submit"
                  className="me-3"
                  text="Edit"
                  onClickHandler={() => setEditMode((prev) => !prev)}
                />

                <ButtonCommon
                  variant="outline-secondary"
                  text="Delete"
                  onClickHandler={() => onClickDel(project.projectId)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          onSubmitHandler={onSubmitHandler}
          isEditable={isEditable}
          formList={projectFormList}
          setAddForm={setEditMode}
        />
      )}
    </Card>
  );
};

export default Project;
