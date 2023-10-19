import React, { useContext, useEffect, useState } from "react";
import EducationForm from "./EducationForm";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../hooks/api";
import ButtonCommon from "../../../common/ButtonCommon";

const Education = (props) => {
  // const [educations, setEducations] = useState([]);
  const [edit, setEdit] = useState(false);
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  //useState로 email 상태를 생성함.
  const [degree, setDegree] = useState("");
  //useState로 description 상태를 생성함.

  const [major, setMajor] = useState("");
  const { portfolioOwnerId, isEditable, id } = props;
  const userState = useContext(UserStateContext);

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

  const onClickDel = (eduId) => {
    console.log("delete버튼이 선택됨");
    Api.delete("users", eduId);
  };

  // useEffect(() => {
  //   Api.get("educations").then((res) => setEducations(res.data));
  // }, [educations]);

  return (
    <>
      {educations.map((education) => (
        <>
          {edit && (
            <>
              <EducationForm {...props} />
              <ButtonCommon
                text="취소"
                variant="secondary"
                onClickHandler={() => setEdit((prev) => !prev)}
              />
            </>
          )}
          {!edit && (
            <Card style={{ width: "80rem" }}>
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
        </>
      ))}
      {isEditable && <EducationForm {...props} />}
    </>
  );
};

export default Education;
