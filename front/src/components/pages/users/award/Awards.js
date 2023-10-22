import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import * as Api from "../../../utils/api";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { awardsCommonFormProps } from "../../../utils/formListCommonProps";
import Award from "./Award";

//********************************서버와 통신전 설정됨**************************************

const awards = [
  {
    awardName: "좋은 상",
    awardDetail: "좋은 상입니다",
    awardOrganization: "좋은기관에서 줌",
    awardDate: "2023-01-01",
  },
];
const Awards = (props) => {
  const [addForm, setAddForm] = useState(false);
  // const [awards, setAwards] = useState([]);
  const [awardName, setAwardName] = useState("");
  const [awardDetail, setAwardDetail] = useState("");
  const [awardOrganization, setAwardOrganization] = useState("");
  const [awardDate, setAwardDate] = useState("2023-01-01");
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { isEditable } = props;

  //form 상세설정 어레이
  const awardState = [
    { value: awardName, changeHandler: (v) => setAwardName(v) },
    { value: awardDetail, changeHandler: (v) => setAwardDetail(v) },
    { value: awardOrganization, changeHandler: (v) => setAwardOrganization(v) },
    { value: awardDate, changeHandler: (v) => setAwardDate(v) },
  ];

  const awardFormList = awardsCommonFormProps.map((awardCommon, index) => {
    return { ...awardCommon, ...awardState[index] };
  });
  console.log(awardFormList);

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handler clicked");
    console.log({ awardName, awardDetail, awardOrganization, awardDate });

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    // const res = await Api.post(`user/${userState.user.id}/education`, {
    //   awardName,
    //   awardDetail,
    //   awardOrganization,
    //   awardDate,
    // });

    // console.log(res);
    // if (res.data.statusCode === 201) {
    //   setAwards((prev) => {
    //     return [
    //       ...prev,
    //       { awardName, awardDetail, awardOrganization, awardDate },
    //     ];
    //   });
    //   setAwardName("");
    //   setAwardDetail("");
    //   setAwardOrganization("");
    //   setAwardDate("2023-01-01");
    //   setAddForm(false);
    // } else if (!res.data.ok) {
    //   throw new Error("POST 요청이 실패하였습니다.");
    // }
  };

  // 모든 수상 목록 가져오기 서버와 통신
  // useEffect(() => {
  //   Api.get(`user/${portfolioOwnerData.id}/awards`, "", "Awards").then(
  //     (res) => {
  //       return setAwards(res.data.awards);
  //     }
  //   );
  // }, [portfolioOwnerData.id]);

  return (
    <>
      <h4>상</h4>
      {awards.map((award, index) => (
        <Award
          key={`award-${index}`}
          isEditable={isEditable}
          formList={awardFormList}
          // setAwards={setAwards}
          award={award}
        />
      ))}
      {isEditable && (
        <Card>
          {addForm && (
            <FormWrapper
              {...props}
              formList={awardFormList}
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

export default Awards;
