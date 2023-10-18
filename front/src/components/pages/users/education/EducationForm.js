import { useEffect, useState } from "react";
import * as Api from "../../../hooks/api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";

const EducationForm = ({ portfolioOwnerId, isEditable, setEdu }) => {
  const [edit, setEdit] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  //useState로 email 상태를 생성함.
  const [degree, setDegree] = useState("");
  //useState로 description 상태를 생성함.

  const [major, setMajor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ school, degree, major, startDate, endDate });
    const res = await Api.post(`user/${user.id}/education`, {
      school,
      degree,
      major,
      startDate,
      endDate,
    });

    const updatedEdu = res.data;
    setEdu((prev) => {
      return { ...prev, updatedEdu };
    });
    setEdit(false);
  };

  useEffect(() => {
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card className="">
      <Card.Body>
        {edit && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="eduSchoolName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="학교이름"
                onChange={(e) => setSchool(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="eduMajor" className="mb-3">
              <Form.Control
                type="text"
                placeholder="전공"
                onChange={(e) => setMajor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="eduDegree">
              <Form.Select
                onChange={(e) => {
                  setDegree(e.target.value);
                }}
              >
                <option>학위를 선택하세요</option>
                <option value="재학중">재학중</option>
                <option value="학사학위">학사학위</option>
                <option value="석사학위">석사학위</option>
                <option value="박사학위">박사학위</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label>입학연월일</Form.Label>
              <Form.Control
                type="Date"
                placeholder=""
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label>졸업연월일</Form.Label>

              <Form.Control
                type="Date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>

            {isEditable && (
              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="primary" type="submit" className="me-3">
                    추가
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEdit((prev) => !prev)}
                  >
                    취소
                  </Button>
                </Col>
              </Form.Group>
            )}
          </Form>
        )}
      </Card.Body>
      <Col sm={{ span: 20 }}>
        {isEditable && (
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => {
              setEdit((prev) => !prev);
            }}
          >
            +
          </Button>
        )}
      </Col>
    </Card>
  );
};

export default EducationForm;
