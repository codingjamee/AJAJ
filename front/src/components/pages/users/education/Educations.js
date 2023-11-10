import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Education from "./Education";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { educationsCommonFormProps } from "../../../../utils/formListCommonProps";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";

const initialValue = {
  schoolName: "",
  major: "",
  degree: "",
  admissionDate: "2019-01-01",
  graduationDate: "2023-01-01",
};

const Educations = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [data, onChange, onChangeSelect, reset] = useInput(initialValue);
  const [educations, setEducations] = useState([]);
  const { isEditable } = props;
  const userState = useSelector((state) => state.userLogin);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  const { schoolName, major, degree, admissionDate, graduationDate } = data;

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
        changeHandler: (e) => onChangeSelect(e),
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
    [data, onChangeSelect, onChange]
  );

  const eduFormList = useMemo(
    () =>
      educationsCommonFormProps.map((eduCommon, index) => {
        return { ...eduCommon, ...eduState[index] };
      }),
    [eduState]
  );

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    try {
      const res = await api.post(`user/${userState.userInfo?.id}/education`, {
        schoolName,
        major,
        degree,
        admissionDate,
        graduationDate,
      });

      const postedNewId = res.data.eduId;

      if (res.status === 201) {
        setEducations((prev) => {
          return [
            ...prev,
            {
              _id: postedNewId,
              schoolName,
              major,
              degree,
              admissionDate,
              graduationDate,
            },
          ];
        });
        reset();
        setAddForm(false);
      } else if (res.status !== 201) {
        // throw new Error("POST 요청이 실패하였습니다.");
      }
    } catch (err) {
      console.error(err);
      // throw new Error("서버와 통신이 실패하였습니다.");
    }
  };

  // 모든 학위 목록 가져오기 서버와 통신
  useEffect(() => {
    //portfolioOwnerData.id를 가져오고 나서 실행
    if (portfolioOwnerData.id) {
      api.get(`user/${portfolioOwnerData.id}/educations`).then((res) => {
        console.log(res.data);
        return setEducations(res.data.educations);
      });
    }
  }, [portfolioOwnerData.id]);

  return (
    <>
      <Card border="warning">
        <h3>학력</h3>
        <br />
        {educations.map((education, index) => (
          <Education
            key={`education-${index}`}
            isEditable={isEditable}
            formList={eduFormList}
            setEducations={setEducations}
            education={education}
          />
        ))}
        {isEditable && (
          <Card>
            {addForm && (
              <FormWrapper
                {...props}
                formList={eduFormList}
                onSubmitHandler={handleSubmit}
                setAddForm={setAddForm}
              />
            )}
            <ButtonCommon
              variant="light"
              size="sm"
              onClickHandler={() => {
                reset();
                return setAddForm((prev) => !prev);
              }}
              text={addForm ? "-" : "+"}
            />
          </Card>
        )}
      </Card>
      <br />
    </>
  );
};

export default Educations;
