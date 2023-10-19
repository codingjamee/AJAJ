import { useEffect, useState } from "react";
import * as Api from "../../../hooks/api";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import FormCommon from "../../../common/FormCommon";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";

const EducationForm = ({
  portfolioOwnerId,
  isEditable,
  setEdu,
  formList,
  formBtnArr,
  optionArr,
  handleSubmit,
}) => {
  const [edit, setEdit] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);

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
            {formList.map((form) => (
              <FormCommon {...form} />
            ))}
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
