import React, { Suspense, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { awardsCommonFormProps } from "../../../../utils/formListCommonProps";
import Award from "./Award";
import api from "../../../../utils/axiosConfig";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LoadingLayer from "../../../../UI/LoadingLayer";
import useInput from "../../../../hooks/useInput";

const initialValue = {
  awardName: "",
  awardDetail: "",
  awardOrganization: "",
  awardDate: "2023-01-01",
};

const Awards = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [awards, setAwards] = useState([]);
  const [data, onChange, reset] = useInput(initialValue);
  const { awardName, awardDetail, awardOrganization, awardDate } = data;

  const userState = useSelector((state) => state.userLogin);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { isEditable } = props;

  //form 상세설정 어레이
  const awardState = useMemo(
    () => [
      { value: awardName, changeHandler: (e) => onChange(e) },
      { value: awardDetail, changeHandler: (e) => onChange(e) },
      {
        value: awardOrganization,
        changeHandler: (e) => onChange(e),
      },
      { value: awardDate, changeHandler: (e) => onChange(e) },
    ],
    [awardName, awardDetail, awardOrganization, awardDate, onChange]
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
    //post 서버와 통신
    try {
      const res = await api.post(`user/${userState.userInfo?.id}/award`, {
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
              _id: postedNewId,
              awardName,
              awardDetail,
              awardOrganization,
              awardDate,
            },
          ];
        });
        reset();
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
          <Suspense fallback={<LoadingLayer />} key={`awards-${index}`}>
            <Award
              key={`award-${index}`}
              isEditable={isEditable}
              formList={awardFormList}
              setAwards={setAwards}
              award={award}
            />
          </Suspense>
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

export default Awards;
