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

const Certificates = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [certificateName, setCertificateName] = useState("");
  const [certificateDetail, setCertificateDetail] = useState("");
  const [certificateOrganization, setCertificateOrganization] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("2023-01-01");
  const { isEditable } = props;
  const userState = useSelector((state) => state.userInfo);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  //form 상세설정 어레이
  const certificateState = useMemo(
    () => [
      { value: certificateName, changeHandler: (v) => setCertificateName(v) },
      {
        value: certificateDetail,
        changeHandler: (v) => setCertificateDetail(v),
      },
      {
        value: certificateOrganization,
        changeHandler: (v) => setCertificateOrganization(v),
      },
      { value: acquisitionDate, changeHandler: (v) => setAcquisitionDate(v) },
    ],
    [
      certificateName,
      setCertificateName,
      certificateDetail,
      setCertificateDetail,
      certificateOrganization,
      setCertificateOrganization,
      acquisitionDate,
      setAcquisitionDate,
    ]
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
              certificateId: updatedCertId,
              certificateName,
              // certificateDetail,
              certificateOrganization,
              acquisitionDate,
            },
          ];
        });
        setCertificateName("");
        setCertificateDetail("");
        setCertificateOrganization("");
        setAcquisitionDate("2023-01-01");
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
              onClickHandler={() => setAddForm((prev) => !prev)}
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
