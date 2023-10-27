import { useContext, useState } from "react";
import * as Api from "../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { UserStateContext } from "../../../../App";
import { awardsCommonFormProps } from "../../../utils/formListCommonProps";
import api from "../../../utils/axiosConfig";

const Award = ({ isEditable, award = {}, setAwards }) => {
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

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    try {
      const res = await api.put(
        `user/${userState.user.id}/award/${award.awardId}`,
        {
          awardName,
          awardDetail,
          awardOrganization,
          awardDate,
        }
      );

      console.log(res);
      if (res.status === 200) {
        console.log(award);
        setAwards((prev) => {
          const updatedAwards = prev.map((prevAward) => {
            if (prevAward.awardId === award.awardId) {
              return {
                ...prevAward,
                awardName,
                awardDetail,
                awardOrganization,
                awardDate,
              };
            }
            return prevAward;
          });
          return updatedAwards;
        });
        setEditMode(false);
      } else if (res.status !== 200) {
        // throw new Error("POST 요청이 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  //삭제함수

  const onClickDel = async (awardId) => {
    try {
      const res = await api.delete(
        `user/${userState.user.id}/award/${awardId}`
      );
      // console.log(res);
      if (res.status === 200) {
        setAwards((prev) => prev.filter((award) => award.awardId !== awardId));
      } else if (res.status !== 200) {
        // throw new Error("삭제를 실패하였습니다");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && (
        <>
          <Card.Title>{award.awardName}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {award.awardDetail}
            <br />
            {award.awardOrganization}
          </Card.Subtitle>
          <Card.Text>{award.awardDate}</Card.Text>

          {isEditable && (
            <Form.Group className="mb-5 text-center">
              <Col>
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
                  onClickHandler={() => onClickDel(award.awardId)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          formList={awardFormList}
          onSubmitHandler={onSubmitHandler}
          setAddForm={setEditMode}
          isEditable={isEditable}
        />
      )}
    </Card>
  );
};

export default Award;
