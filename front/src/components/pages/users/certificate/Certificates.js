import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Certificate from "./Certificate";
import { certificatesCommonFormProps } from "../../../utils/formListCommonProps";
import { PortfolioOwnerDataContext } from "../Portfolio";
import api from "../../../utils/axiosConfig";

//********************************서버와 통신전**************************************

//서버와 통신전 더미어레이

// const certificates = [
//   {
//     id: "1",
//     certificateName: "자격증 이름1",
//     certificateDetail: "자격증 내용입니다11111",
//     certificateOrganization: "자격증 수여 기관",
//     certificateDate: "2003-02-02",
//   },
//   {
//     id: "2",
// certificateName: "자격증 이름3",
// certificateDetail: "자격증 내용입니다22222",
// certificateOrganization: "자격증 수여 기관",
// certificateDate: "2003-02-02",
//   },
// ];

const Certificates = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [certificateName, setCertificateName] = useState("");
  const [certificateDetail, setCertificateDetail] = useState("");
  const [certificateOrganization, setCertificateOrganization] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("2023-01-01");
  const { isEditable } = props;
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);

  //form 상세설정 어레이
  const certificateState = [
    { value: certificateName, changeHandler: (v) => setCertificateName(v) },
    { value: certificateDetail, changeHandler: (v) => setCertificateDetail(v) },
    {
      value: certificateOrganization,
      changeHandler: (v) => setCertificateOrganization(v),
    },
    { value: acquisitionDate, changeHandler: (v) => setAcquisitionDate(v) },
  ];

  const certificateFormList = certificatesCommonFormProps.map(
    (certificateCommon, index) => {
      return { ...certificateCommon, ...certificateState[index] };
    }
  );

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    // portfolioOwnerId는 portfolio에서 받아옴

    // post 서버와 통신
    try {
      const res = await api.post(`user/${userState.user.id}/certificate`, {
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
    api.get(`user/${portfolioOwnerData.id}/certificates`).then((res) => {
      return setCertificates(res.data.certificates);
    });
  }, [portfolioOwnerData.id]);

  return (
    <>
      <Card>
        <h4>자격증</h4>
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
              variant="outline-info"
              size="sm"
              onClickHandler={() => setAddForm((prev) => !prev)}
              text="+"
            />
          </Card>
        )}
      </Card>
    </>
  );
};

export default Certificates;
