import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Certificate from "./Certificate";
import { certificatesCommonFormProps } from "../../../../utils/formListCommonProps";
import { PortfolioOwnerDataContext } from "../Portfolio";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "../../../../hooks/useInput";
import useApi from "../../../../hooks/useApi";
import LoadingLayer from "../../../../UI/LoadingLayer";

const initialValue = {
  certificateName: "",
  certificateDetail: "",
  certificateOrganization: "",
  acquisitionDate: "2019-01-01",
};

const Certificates = (props) => {
  const { isEditable } = props;
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const userState = useSelector((state) => state.userLogin);
  const [addForm, setAddForm] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [data, onChange, _, reset] = useInput(initialValue);
  const {
    certificateName,
    certificateDetail,
    certificateOrganization,
    acquisitionDate,
  } = data;
  const { result, loading, sendRequest, reqIdentifier } = useApi();

  //form 상세설정 어레이
  const certificateState = useMemo(
    () => [
      { value: certificateName, changeHandler: (e) => onChange(e) },
      {
        value: certificateDetail,
        changeHandler: (e) => onChange(e),
      },
      {
        value: certificateOrganization,
        changeHandler: (e) => onChange(e),
      },
      { value: acquisitionDate, changeHandler: (e) => onChange(e) },
    ],
    [
      certificateName,
      certificateDetail,
      certificateOrganization,
      acquisitionDate,
      onChange,
    ]
  );
  const certificateFormList = useMemo(
    () =>
      certificatesCommonFormProps.map((certificateCommon, index) => {
        return { ...certificateCommon, ...certificateState[index] };
      }),

    [certificateState]
  );

  // 모든 학위 목록 가져오기 서버와 통신
  useEffect(() => {
    //portfolioOwnerData.id를 가져오고 나서 실행
    if (portfolioOwnerData.id) {
      sendRequest(`user/${portfolioOwnerData.id}/certificates`, "get");
    }
  }, [portfolioOwnerData.id]);

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    // post 서버와 통신
    await sendRequest(`user/${userState.userInfo?.id}/certificate`, "post", {
      certificateName,
      certificateDetail,
      certificateOrganization,
      acquisitionDate,
    });
  };

  //요청성공시 재렌더링
  useEffect(() => {
    if (reqIdentifier === "postData") {
      const updatedCertId = result.data?.certificateId;
      if (result.status === 201) {
        setCertificates((prev) => {
          return [
            ...prev,
            {
              _id: updatedCertId,
              certificateName,
              certificateDetail,
              certificateOrganization,
              acquisitionDate,
            },
          ];
        });
        reset();
        setAddForm(false);
      }
    } else if (reqIdentifier === "getData") {
      setCertificates(result.data?.certificates || []);
    }
  }, [result, reqIdentifier]);

  return (
    <>
      <Card border="warning">
        <h3>자격증</h3>
        <br />
        {loading && <LoadingLayer message="Loading....." />}
        {!loading &&
          certificates &&
          certificates.map((certificate, index) => (
            <Certificate
              key={`certificate-${index}`}
              isEditable={isEditable}
              formList={certificateFormList}
              setCertificates={setCertificates}
              certificate={certificate}
            />
          ))}
        {isEditable && (
          <Card>
            {addForm && (
              <FormWrapper
                {...props}
                formList={certificateFormList}
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

export default Certificates;
