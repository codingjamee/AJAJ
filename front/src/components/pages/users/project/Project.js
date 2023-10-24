import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { projectsCommonFormProps } from "../../../utils/formListCommonProps";

//********************************서버와 통신전**************************************
//*******************프로젝트 이미지 첨부***************/

const Project = ({ isEditable, setAddForm, project = [], setProjects }) => {
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

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

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
    //   setProjects((prev) => {
    //     return [
    //       ...prev,
    //       {
    //         projectName,
    //         projectDetail,
    //         projectImgUrl,
    //         projectStartDate,
    //         projectEndDate,
    //       },
    //     ];
    //   });
    //   setProjectName = useState("");
    //   setProjectDetail = useState("");
    //   setProjectImgUrl = useState("");
    //   setProjectStartDate = useState("2023-01-01");
    //   setProjectEndDate = useState("2023-01-01");
    //   setAddForm(false);
    // } else if (!res.data.ok) {
    //   throw new Error("POST 요청이 실패하였습니다.");
    // }
  };

  //삭제함수

  const onClickDel = async (projectId) => {
    console.log(project);
    console.log("delete버튼이 선택됨");
    console.log(projectId);

    const res = await Api.delete(
      `user/${userState.user.id}/project`,
      projectId,
      "project"
    );
    console.log(res);
    // if (res.data.ok) {
    setProjects((prev) =>
      prev.filter(
        (projects) => Number(projects.projectId) !== Number(projectId)
      )
    );
    // } else if (!res.data.ok) {
    // throw new Error("삭제를 실패하였습니다");
    // }
  };

  return (
    <Card>
      <Card.Body>
        {!editMode && (
          <>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{project.projectName}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {project.projectDetail}
                  <img src={project.projectImgUrl} />
                </Card.Subtitle>
                <Card.Text>
                  {project.projectStartDate} ~ {project.projectEndDate}
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
                        onClickHandler={() => onClickDel(project.id)}
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
            formList={projectFormList}
            setAddForm={setEditMode}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Project;
