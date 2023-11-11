import { useEffect, useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { educationsCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import useApi from "../../../../hooks/useApi";
import LoadingLayer from "../../../../UI/LoadingLayer";

const initialValue = {
  schoolName: "",
  major: "",
  degree: "",
  addmissionDate: "2019-01-01",
  graduationDate: "2023-01-01",
};

const Education = ({ isEditable, education = {}, setEducations }) => {
  const [editMode, setEditMode] = useState(false);
  const [data, onChange] = useInput(education || initialValue);
  const { schoolName, major, degree, admissionDate, graduationDate } = data;
  const { result, loading, sendRequest, reqIdentifier, extra } = useApi();

  const userState = useSelector((state) => state.userLogin);

  //form 상세설정 어레이
  const eduState = useMemo(
    () => [
      {
        value: schoolName,
        changeHandler: (e) => onChange(e),
      },
      {
        value: major,
        changeHandler: (e) => onChange(e),
      },
      {
        value: degree,
        changeHandler: (e) => onChange(e),
      },
      {
        value: admissionDate,
        changeHandler: (e) => onChange(e),
      },
      {
        value: graduationDate,
        changeHandler: (e) => onChange(e),
      },
    ],
    [schoolName, major, degree, admissionDate, graduationDate, onChange]
  );

  const eduFormList = useMemo(
    () =>
      educationsCommonFormProps.map((eduCommon, index) => {
        return { ...eduCommon, ...eduState[index] };
      }),
    [eduState]
  );

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //put 서버와 통신
    await sendRequest(
      `user/${userState.userInfo?.id}/education/${education._id}`,
      "put",
      {
        schoolName,
        major,
        degree,
        admissionDate,
        graduationDate,
      }
    );
  };

  //삭제함수

  const onClickDel = async (eduId) => {
    await sendRequest(
      `user/${userState.userInfo?.id}/education/${eduId}`,
      "delete",
      "",
      "",
      eduId
    );
  };

  useEffect(() => {
    if (reqIdentifier === "putData") {
      setEducations((prev) => {
        const updatedEdus = prev.map((prevEdu) => {
          if (prevEdu._id === education._id) {
            return {
              ...prevEdu,
              schoolName,
              major,
              degree,
              admissionDate,
              graduationDate,
            };
          }
          return prevEdu;
        });
        return updatedEdus;
      });
      setEditMode(false);
    } else if (reqIdentifier === "deleteData") {
      setEducations((prevObj) => {
        const updatedEducations = prevObj.filter((edus) => edus._id !== extra);
        return updatedEducations;
      });
    }
  }, [result, extra]);

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && loading && <LoadingLayer message="Loading....." />}
      {!editMode && !loading && (
        <>
          <Card.Title>{education.schoolName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {education.major}
            <br />
            {education.degree}
          </Card.Subtitle>
          <Card.Text>
            {education.admissionDate} ~ {education.graduationDate}
          </Card.Text>
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
                  onClickHandler={() => onClickDel(education._id)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          formList={eduFormList}
          onSubmitHandler={onSubmitHandler}
          setAddForm={setEditMode}
          isEditable={isEditable}
        />
      )}
    </Card>
  );
};

export default Education;
