import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { UserStateContext } from "../../../../App";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { awardsCommonFormProps } from "../../../../utils/formListCommonProps";
import Award from "./Award";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";

const Awards = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [awards, setAwards] = useState([]);
  const [awardName, setAwardName] = useState("");
  const [awardDetail, setAwardDetail] = useState("");
  const [awardOrganization, setAwardOrganization] = useState("");
  const [awardDate, setAwardDate] = useState("2023-01-01");
  const userState = useContext(UserStateContext);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { isEditable } = props;

  //form 상세설정 어레이
  const awardState = useMemo(
    () => [
      { value: awardName, changeHandler: (v) => setAwardName(v) },
      { value: awardDetail, changeHandler: (v) => setAwardDetail(v) },
      {
        value: awardOrganization,
        changeHandler: (v) => setAwardOrganization(v),
      },
      { value: awardDate, changeHandler: (v) => setAwardDate(v) },
    ],
    [
      awardName,
      awardDetail,
      awardOrganization,
      awardDate,
      setAwardName,
      setAwardDetail,
      setAwardOrganization,
      setAwardDate,
    ]
  );

  const awardFormList = useMemo(
    () =>
      awardsCommonFormProps.map((awardCommon, index) => {
        return { ...awardCommon, ...awardState[index] };
      }),
    [awardState]
  );
  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    //portfolioOwnerId는 portfolio에서 받아옴

    //post 서버와 통신
    try {
      const res = await api.post(`user/${userState.user.id}/award`, {
        awardName,
        awardDetail,
        awardOrganization,
        awardDate,
      });

      console.log(res.data.awardId);
      const postedNewId = res.data.awardId;
      console.log(postedNewId);

      if (res.status === 201) {
        setAwards((prev) => {
          return [
            ...prev,
            {
              awardId: postedNewId,
              awardName,
              awardDetail,
              awardOrganization,
              awardDate,
            },
          ];
        });
        setAwardName("");
        setAwardDetail("");
        setAwardOrganization("");
        setAwardDate("2023-01-01");
        setAddForm(false);
      } else if (res.status !== 201) {
        // throw new Error("POST 요청이 실패하였습니다.");
      }
    } catch (err) {
      throw new Error("POST요청 실패");
    }
  };

  // 모든 수상 목록 가져오기 서버와 통신
  useEffect(() => {
    //portfolioOwnerData.id를 가져오고 나서 실행
    if (portfolioOwnerData.id) {
      api
        .get(`user/${portfolioOwnerData.id}/awards`, "", "Awards")
        .then((res) => {
          return setAwards(res.data.awards);
        });
    }
  }, [portfolioOwnerData.id]);

  return (
    <>
      <Card border="warning">
        <h3>수상 내역</h3>
        <br />
        {awards.map((award, index) => (
          <Award
            key={`award-${index}`}
            isEditable={isEditable}
            formList={awardFormList}
            setAwards={setAwards}
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

export default Awards;
