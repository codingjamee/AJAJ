//********************************상세 커스텀 수정필요**************************************
import { useContext, useEffect, useState } from "react";
import * as Api from "../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { UserStateContext } from "../../../../App";
import { awardsCommonFormProps } from "../../../utils/formListCommonProps";

const Award = ({ setAddForm, isEditable, award = [], setAwards }) => {
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [awardName, setAwardName] = useState(award.awardName || "");
  const [awardDetail, setAwardDetail] = useState(award.awardDetail || "");
  const [awardOrganization, setAwardOrganization] = useState(
    award.awardOrganization || ""
  );
  const [awardDate, setAwardDate] = useState(award.awardDate || "2023-01-01");
  const userState = useContext(UserStateContext);

  //form 상세설정 어레이
  const awardState = [
    { value: awardName, changeHandler: (v) => setAwardName(v) },
    { value: awardDetail, changeHandler: (v) => setAwardDetail(v) },
    { value: awardOrganization, changeHandler: (v) => setAwardOrganization(v) },
    { value: awardDate, changeHandler: (v) => setAwardDate(v) },
  ];

  const awardFormList = awardsCommonFormProps.map((awardCommon, index) => {
    return { ...awardCommon, ...awardState[index] };
  });

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({ awardName, awardDetail, awardOrganization, awardDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    const res = await Api.post(`user/${userState.user.id}/award`, {
      awardName,
      awardDetail,
      awardOrganization,
      awardDate,
    });

    console.log(res);
    if (res.data.statusCode === 201) {
      setAwards((prev) => {
        return [
          ...prev,
          { awardName, awardDetail, awardOrganization, awardDate },
        ];
      });
      setAwardName("");
      setAwardDetail("");
      setAwardOrganization("");
      setAwardDate("2023-01-01");
      setAddForm(false);
    } else if (!res.data.ok) {
      throw new Error("POST 요청이 실패하였습니다.");
    }
  };

  //삭제함수

  const onClickDel = async (awardId) => {
    console.log(award);
    console.log("delete버튼이 선택됨");
    console.log(awardId);

    const res = await Api.delete(
      `user/${userState.user.id}/award`,
      awardId,
      "award"
    );
    console.log(res);
    // if (res.data.ok) {
    setAwards((prev) =>
      prev.filter((awards) => Number(awards.awardId) !== Number(awardId))
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
                <Card.Title>{award.awardName}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {award.awardDetail}
                  <br />
                  {award.awardOrganization}
                </Card.Subtitle>
                <Card.Text>{award.awardDate}</Card.Text>

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
                        onClickHandler={() => onClickDel(award.awardId)}
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
            formList={awardFormList}
            onSubmitHandler={onSubmitHandler}
            setAddForm={setEditMode}
            isEditable={isEditable}
            onClickHandler={setAddForm}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Award;
