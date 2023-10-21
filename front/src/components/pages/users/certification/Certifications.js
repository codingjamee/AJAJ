import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import Certification from "./Certification";
//option 상세설정 어레이
const optionArr = [
  { value: "재학중", text: "재학중" },
  { value: "학사학위", text: "학사학위" },
  { value: "석사학위", text: "석사학위" },
  { value: "박사학위", text: "박사학위" },
];

//서버와 통신전 더미어레이

const certifications = [
  {
    id: "1",
    certName: "자격증 이름1",
    organization: "자격증 수여 기관",
    acquisitionDate: "2003-02-02",
  },
  {
    id: "2",
    certName: "자격증 이름2",
    organization: "자격증 수여 기관222",
    acquisitionDate: "2023-01-01",
  },
];

const Certifications = (props) => {
  const [addForm, setAddForm] = useState(false);
  // const [certification, setCertification] = useState([]);
  const [certName, setCertName] = useState("");
  const [organization, setOrganization] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("2023-01-01");
  const { portfolioOwnerId, isEditable, id } = props;
  const userState = useContext(UserStateContext);

  //form 상세설정 어레이
  const formList = [
    {
      controlId: "certSchoolName",
      customClassName: "mb-3",
      label: "자격증 명",
      placeholder: "자격증 명",
      value: certName,
      changeHandler: (v) => setCertName(v),
    },
    {
      controlId: "certOrganization",
      customClassName: "mb-3",
      label: "기관",
      placeholder: "기관",
      value: organization,
      changeHandler: (v) => setOrganization(v),
    },

    {
      controlId: "acquisitionDate",
      customClassName: "mb-3",
      value: acquisitionDate,
      label: "취득일자",
      type: "date",
      changeHandler: (v) => setAcquisitionDate(v),
    },
  ];

  //제출버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({ certName, organization, acquisitionDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    // const res = await Api.post(`user/${user.id}/certification`, {
    //   school,
    //   degree,
    //   major,
    //   startDate,
    //   endDate,
    // });

    // const updatedEdu = res.data;
    // setCertification((prev) => {
    //   return { ...prev, updatedEdu };
    // });
    // setEdit(false);
  };

  // 모든 학위 목록 가져오기 서버와 통신
  // useEffect(() => {
  //   Api.get(`user/${portfolioOwnerId}/certification`,"", "Certifications").then((res) => {
  //     console.log(res.data);
  //     return setCertification(res.data);
  //   });
  // }, [certification]);

  return (
    <>
      <h4>자격증</h4>
      {certifications.map((certification, index) => (
        <React.Fragment key={`certification-${index}`}>
          <Certification
            isEditable={isEditable}
            optionArr={optionArr}
            formList={formList}
            certification={certification}
          />
        </React.Fragment>
      ))}
      {isEditable && (
        <Card>
          {addForm && (
            <FormWrapper
              {...props}
              formList={formList}
              optionArr={optionArr}
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
    </>
  );
};

export default Certifications;
