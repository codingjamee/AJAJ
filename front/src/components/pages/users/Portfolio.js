import React, { useContext, useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../../../App";
import * as Api from "../../utils/api";
import User from "./user/User";
import Educations from "./education/Educations";
import Certifications from "./certificate/Certificates";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import LoadingLayer from "../../../UI/LoadingLayer";
import { loadingActions } from "../../../store/loading";

export const PortfolioOwnerDataContext = createContext({});

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwnerData, setPortfolioOwnerData] = useState({});
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const dispatch = useDispatch();
  const loadingState = useSelector((state) => state.loading.open);

  const fetchPortfolioOwner = async (ownerId) => {
    console.log("포트폴리오 오너 아이디" + ownerId);
    const res = await Api.get("users", ownerId, "portfolio");
    const ownerData = res.data;
    console.log("ownerData", ownerData);
    setPortfolioOwnerData(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    // 현재 URL "/users/:userId"
    if (params.userId) {
      const ownerId = params.userId;
      fetchPortfolioOwner(ownerId);
    } else {
      // URL "/"
      console.log("fetchPortfolioOwner전 userState확인", userState.user.id);
      const ownerId = userState.user.id;
      fetchPortfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  //리덕스 사용 고민해보기
  if (!isFetchCompleted) {
    dispatch(loadingActions.open());
    console.log(loadingState);
  }

  if (loadingState) {
    return <LoadingLayer message="Loading....." />;
  } else {
    // dispatch(loadingActions.close());
  }

  return (
    <PortfolioOwnerDataContext.Provider value={portfolioOwnerData}>
      <Container fluid style={{ overflow: "auto", marginTop: "50px" }}>
        <Row>
          <Col lg={2} style={{ textAlign: "center" }}>
            <User isEditable={portfolioOwnerData?.id === userState.user?.id} />
          </Col>
          <Col lg={10}>
            <div
              style={{
                textAlign: "center",
                marginRight: "50px",
                marginLeft: "30px",
              }}
            >
              <Educations
                isEditable={portfolioOwnerData?.id === userState.user?.id}
              />
              <Certifications
                isEditable={portfolioOwnerData?.id === userState.user?.id}
              />
              <Awards
                isEditable={portfolioOwnerData?.id === userState.user?.id}
              />
              <Projects
                isEditable={portfolioOwnerData?.id === userState.user?.id}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </PortfolioOwnerDataContext.Provider>
  );
}

export default Portfolio;
