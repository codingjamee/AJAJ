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

const initialValue = {
  certificateName: "",
  certificateDetail: "",
  certificateOrganization: "",
  acquisitionDate: "2019-01-01",
};

const Certificates = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [data, onChange, reset] = useInput(initialValue);

  const {
    certificateName,
    certificateDetail,
    certificateOrganization,
    acquisitionDate,
  } = data;

  const { isEditable } = props;
  const userState = useSelector((state) => state.userLogin);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

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
    [data, onChange]
  );
  const certificateFormList = useMemo(
    () =>
      certificatesCommonFormProps.map((certificateCommon, index) => {
        return { ...certificateCommon, ...certificateState[index] };
      }),

    [certificateState]
  );

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    // portfolioOwnerId는 portfolio에서 받아옴

    // post 서버와 통신
    try {
      const res = await api.post(`user/${userState.userInfo?.id}/certificate`, {
        certificateName,
        certificateDetail,
        certificateOrganization,
        acquisitionDate,
      });

      console.log(res);
      const updatedCertId = res.data.certificateId;
      if (res.status === 201) {
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
      api.get(`user/${portfolioOwnerData.id}/certificates`).then((res) => {
        return setCertificates(res.data.certificates);
      });
    }
  }, [portfolioOwnerData.id]);

  return (
    <>
      <Card border="warning">
        <h3>자격증</h3>
        <br />
        {certificates.map((certificate, index) => (
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
                setAddForm((prev) => !prev);
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
