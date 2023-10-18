import { useEffect, useState } from "react";
import * as Api from "../../../hooks/api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import FormCommon from "../../../common/FormCommon";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";

const EducationForm = ({ portfolioOwnerId, isEditable, setEdu }) => {
  const [edit, setEdit] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-01");
  //useState로 email 상태를 생성함.
  const [degree, setDegree] = useState("");
  //useState로 description 상태를 생성함.

  const [major, setMajor] = useState("");
  const optionArr = [
    { value: "재학중", text: "재학중" },
    { value: "학사학위", text: "학사학위" },
    { value: "석사학위", text: "석사학위" },
    { value: "박사학위", text: "박사학위" },
  ];

  const formBtnArr = [
    {
      variant: "primary",
      type: "submit",
      className: "me-3",
      text: "추가",
      onClickHandler: () => setEdit((prev) => !prev),
    },
    {
      variant: "secondary",
      type: "button",
      className: "me-3",
      text: "취소",
      onClickHandler: () => setEdit((prev) => !prev),
    },
  ];

  const handleSubmit = (e) => {
    console.log("handler clicked");
    e.preventDefault();
    console.log(school, degree, major, startDate, endDate);
    // const res = await Api.post(`user/${user.id}/education`, {
    //   school,
    //   degree,
    //   major,
    //   startDate,
    //   endDate,
    // });

    // const updatedEdu = res.data;
    // setEdu((prev) => {
    //   return { ...prev, updatedEdu };
    // });
    // setEdit(false);
  };

  //백엔드 api가 완성되면 확인해보기
  useEffect(() => {
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        {edit && (
          <FormWrapper
            onSubmitHandler={handleSubmit}
            isEditable={isEditable}
            btnSet={formBtnArr}
          >
            <FormCommon
              controlId="eduSchoolName"
              customClassName="mb-3"
              placeholder="학교이름"
              value={school}
              changeHandler={setSchool}
            />
            <FormCommon
              controlId="eduMajor"
              customClassName="mb-3"
              placeholder="전공"
              value={major}
              changeHandler={setMajor}
            />

            <FormCommon
              controlId="eduDegree"
              select="true"
              customClassName="mb-3"
              placeholder="전공"
              value={major}
              changeHandler={setDegree}
              optionValue="학위를 선택하세요"
              optionArr={optionArr}
            />

            <FormCommon
              controlId="startDate"
              customClassName="mb-3"
              value={startDate}
              changeHandler={setStartDate}
              label="입학연월일"
              type="date"
            />

            <FormCommon
              controlId="endDate"
              customClassName="mb-3"
              value={endDate}
              changeHandler={setEndDate}
              label="졸업연월일"
              type="date"
            />
          </FormWrapper>
        )}
      </Card.Body>
      <Col sm={{ span: 20 }}>
        {isEditable && (
          <ButtonCommon
            variant="outline-info"
            size="sm"
            onClickHandler={() => setEdit((prev) => !prev)}
            text="+"
          />
        )}
      </Col>
    </Card>
  );
};

export default EducationForm;
