import React, { useContext, useEffect, useState } from "react";
import EducationForm from "./EducationForm";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../hooks/api";

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

const Education = (props) => {
  // const [educations, setEducations] = useState([]);
  const { portfolioOwnerId, isEditable, id } = props;
  const userState = useContext(UserStateContext);

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
        <Card style={{ width: "18rem" }} key={id}>
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
                  <Button variant="primary" type="submit" className="me-3">
                    수정
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onClickDel(education.id)}
                  >
                    삭제
                  </Button>
                </Col>
              </Form.Group>
            )}
          </Card.Body>
        </Card>
      ))}
      {isEditable && <EducationForm {...props} />}
    </>
  );
};

export default Education;
