import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import UserCard from "../users/user/UserCard";
import api from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";

const NetworkPage = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userLogin);
  // useState 훅을 통해 users 상태를 생성함.
  // const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.userInfo.id) {
      navigate("/login");
      return;
    }

    api
      .get("/userlist" + location.search)
      .then((res) => setUsers(res.data.users));
  }, [userState.userInfo?.id, navigate, location.search]);

  return (
    <Container fluid style={{ textAlign: "center", marginTop: "50px" }}>
      <Row
        lg={4}
        className="jusify-content-center"
        style={{ justifyContent: "center" }}
      >
        {users?.map((user, index) => (
          <UserCard key={`userCard-${index}`} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
};

export default NetworkPage;
