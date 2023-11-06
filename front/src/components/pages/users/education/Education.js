import { useContext, useEffect, useState } from "react";
import * as Api from "../../../../utils/api";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { UserStateContext } from "../../../../App";
import { educationsCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";

const Education = ({ isEditable, education = {}, setEducations }) => {
  // useState 훅을 통해 user 상태를 생성함.
  // const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [schoolName, setSchoolName] = useState(education.schoolName || "");
  const [major, setMajor] = useState(education.major || "");
  const [degree, setDegree] = useState(education.degree || "");
  const [admissionDate, setAdmissionDate] = useState(
    education.admissionDate || "2023-01-01"
  );
  const [graduationDate, setGraduationDate] = useState(
    education.graduationDate || "2023-01-01"
  );
  const userState = useContext(UserStateContext);

  //form 상세설정 어레이
  const eduState = useMemo(
    () => [
      { value: schoolName, changeHandler: (v) => setSchoolName(v) },
      { value: major, changeHandler: (v) => setMajor(v) },
      { value: degree, changeHandler: (v) => setDegree(v) },
      { value: admissionDate, changeHandler: (v) => setAdmissionDate(v) },
      { value: graduationDate, changeHandler: (v) => setGraduationDate(v) },
    ],
    [
      schoolName,
      setSchoolName,
      major,
      setMajor,
      degree,
      setDegree,
      admissionDate,
      setAdmissionDate,
      graduationDate,
      setGraduationDate,
    ]
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
    //제출버튼 클릭시
    e.preventDefault();

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    try {
      const res = await api.put(
        `user/${userState.user.id}/education/${education.eduId}`,
        {
          schoolName,
          major,
          degree,
          admissionDate,
          graduationDate,
        }
      );
      // console.log(res.data);
      if (res.status === 200) {
        setEducations((prev) => {
          const updatedEdus = prev.map((prevEdu) => {
            if (prevEdu.eduId === education.eduId) {
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
      } else if (res.status !== 200) {
        // throw new Error("POST 요청을 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신이 실패하였습니다");
    }
  };

  //삭제함수

  const onClickDel = async (eduId) => {
    try {
      const res = await api.delete(
        `user/${userState.user.id}/education/${eduId}`
      );
      // console.log(res);
      if (res.status === 200) {
        setEducations((prevObj) => {
          return prevObj.filter((edus) => edus.eduId !== eduId);
        });
      } else if (res.status !== 200) {
        // throw new Error("삭제를 실패하였습니다");
      }
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신에 실패하였습니다");
    }
  };

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && (
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
                  onClickHandler={() => onClickDel(education.eduId)}
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
