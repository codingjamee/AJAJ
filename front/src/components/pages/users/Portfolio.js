import React, { useContext, useState, useEffect, createContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../../../App";
import User from "./user/User";
import Educations from "./education/Educations";
import Certifications from "./certificate/Certificates";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import api from "../../../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { locationActions } from "../../../store/location";

export const PortfolioOwnerDataContext = createContext({});

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwnerData, setPortfolioOwnerData] = useState({});
  const userState = useContext(UserStateContext);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchPortfolioOwner = async (ownerId) => {
    // console.log("포트폴리오 오너 아이디" + ownerId);
    try {
      const res = await api.get(`users/${ownerId}`);
      const ownerData = res.data;
      setPortfolioOwnerData(ownerData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    //userState가 없는 경우
    if (!userState.user) {
      return navigate("/login", { replace: true });
    }

    // 현재 URL "/users/:userId"
    if (params.userId) {
      const ownerId = params.userId;
      fetchPortfolioOwner(ownerId);
    } else {
      // URL "/"
      const ownerId = userState.user.id;
      fetchPortfolioOwner(ownerId);
    }
  }, []);

  return (
    <PortfolioOwnerDataContext.Provider value={portfolioOwnerData}>
      <Container fluid style={{ margin: "50px 20px 20px" }}>
        <Row>
          <Col
            md={4}
            lg={3}
            xl={2}
            xxl={2}
            style={{ textAlign: "center", overFlow: "hidden" }}
          >
            <User isEditable={portfolioOwnerData?.id === userState.user?.id} />
          </Col>
          <Col md={8} lg={9} xl={10} xxl={10}>
            <div
              style={{
                textAlign: "center",
                marginRight: "50px",
                marginLeft: "40px",
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
