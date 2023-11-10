import { useEffect, useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { awardsCommonFormProps } from "../../../../utils/formListCommonProps";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import useApi from "../../../../hooks/useApi";
import LoadingLayer from "../../../../UI/LoadingLayer";

const initialValue = {
  awardName: "",
  awardDetail: "",
  awardOrganization: "",
  awardDate: "2023-01-01",
};

const Award = ({ isEditable, award = {}, setAwards }) => {
  const [editMode, setEditMode] = useState(false);
  const userState = useSelector((state) => state.userLogin);
  const [data, onChange] = useInput(award || initialValue);
  const { awardName, awardDetail, awardOrganization, awardDate } = data;
  const { result, loading, sendRequest, reqIdentifier, extra } = useApi();

  //form 상세설정 어레이
  const awardState = useMemo(
    () => [
      { value: awardName, changeHandler: (e) => onChange(e) },
      { value: awardDetail, changeHandler: (e) => onChange(e) },
      {
        value: awardOrganization,
        changeHandler: (e) => onChange(e),
      },
      { value: awardDate, changeHandler: (e) => onChange(e) },
    ],
    [awardName, awardDetail, awardOrganization, awardDate, onChange]
  );

  const awardFormList = useMemo(
    () =>
      awardsCommonFormProps.map((awardCommon, index) => {
        return { ...awardCommon, ...awardState[index] };
      }),
    [awardState]
  );

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //put 서버와 통신
    await sendRequest(
      `user/${userState.userInfo?.id}/award/${award._id}`,
      "put",
      {
        awardName,
        awardDetail,
        awardOrganization,
        awardDate,
      }
    );
  };

  //삭제함수
  const onClickDel = async (awardId) => {
    await sendRequest(
      `user/${userState.userInfo?.id}/award/${awardId}`,
      "delete",
      "",
      "",
      awardId
    );
  };

  useEffect(() => {
    if (reqIdentifier === "putData") {
      setAwards((prev) => {
        const updatedAwards = prev.map((prevAward) => {
          if (prevAward._id === award._id) {
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
    } else if (reqIdentifier === "deleteData") {
      setAwards((prev) => {
        const updatedAwards = prev.filter((award) => award._id !== extra);
        return updatedAwards;
      });
    }
  }, [result, extra]);

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && loading && <LoadingLayer message="Loading....." />}
      {!editMode && !loading && (
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
                  onClickHandler={() => onClickDel(award._id)}
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
