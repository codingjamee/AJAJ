import { useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "../../../common/FormWrapper";
import ButtonCommon from "../../../common/ButtonCommon";
import { educationsCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";

const initialValue = {
  schoolName: "",
  major: "",
  degree: "",
  addmissionDate: "2019-01-01",
  graduationDate: "2023-01-01",
};

const Education = ({ isEditable, education = {}, setEducations }) => {
  const [editMode, setEditMode] = useState(false);
  const [data, onChange, onChangeSelect] = useInput(education || initialValue);
  console.log(data);
  const { schoolName, major, degree, admissionDate, graduationDate } = data;

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
    //제출버튼 클릭시
    e.preventDefault();

    //put 서버와 통신
    try {
      const res = await api.put(
        `user/${userState.userInfo?.id}/education/${education._id}`,
        {
          schoolName,
          major,
          degree,
          admissionDate,
          graduationDate,
        }
      );
      if (res.status === 200) {
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
        `user/${userState.userInfo?.id}/education/${eduId}`
      );
      // console.log(res);
      if (res.status === 200) {
        setEducations((prevObj) => {
          return prevObj.filter((edus) => edus._id !== eduId);
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
