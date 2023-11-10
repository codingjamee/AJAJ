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
import useApi from "../../../../hooks/useApi";
import LoadingLayer from "../../../../UI/LoadingLayer";

const initialValue = {
  schoolName: "",
  major: "",
  degree: "",
  admissionDate: "2019-01-01",
  graduationDate: "2023-01-01",
};

const Educations = (props) => {
  const { isEditable } = props;
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const userState = useSelector((state) => state.userLogin);
  const [addForm, setAddForm] = useState(false);
  const [educations, setEducations] = useState([]);
  const [data, onChange, onChangeSelect, reset] = useInput(initialValue);
  const { schoolName, major, degree, admissionDate, graduationDate } = data;
  const { result, loading, sendRequest, reqIdentifier } = useApi();

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
    [
      schoolName,
      major,
      degree,
      admissionDate,
      graduationDate,
      onChangeSelect,
      onChange,
    ]
  );

  const eduFormList = useMemo(
    () =>
      educationsCommonFormProps.map((eduCommon, index) => {
        return { ...eduCommon, ...eduState[index] };
      }),
    [eduState]
  );

  useEffect(() => {
    if (portfolioOwnerData.id) {
      sendRequest(`user/${portfolioOwnerData.id}/educations`, "get");
    }
  }, [portfolioOwnerData.id]);

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    //post 서버와 통신
    await sendRequest(`user/${userState.userInfo?.id}/education`, "post", {
      schoolName,
      major,
      degree,
      admissionDate,
      graduationDate,
    });
  };

  //요청성공시 재렌더링
  useEffect(() => {
    if (reqIdentifier === "postData") {
      const postedNewId = result.data?.eduId;
      if (result.status === 201) {
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
      }
    } else if (reqIdentifier === "getData") {
      setEducations(result.data?.educations || []);
    }
  }, [result, reqIdentifier]);

  return (
    <>
      <Card border="warning">
        <h3>학력</h3>
        <br />
        {loading && <LoadingLayer message="Loading....." />}
        {!loading &&
          educations &&
          educations.map((education, index) => (
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
