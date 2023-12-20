import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import UserCard from "../users/user/UserCard";
import api from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";
import NetworkPage from "./NetworkPage";

function Network() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userLogin);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.userInfo.id) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    // api.get("userlist").then((res) => setUsers(res.data?.userlist));
    api.get("userlist").then((res) => {
      setPages(res.data.totalPage);
      return setUsers(res.data?.users);
    });
  }, [userState.userInfo?.id, navigate]);

  return (
    <Container fluid style={{ textAlign: "center", marginTop: "50px" }}>
      <NetworkPage users={users} setUsers={setUsers} />
      {Array.from({ length: pages }, (_, index) => (
        <Link
          to={`?page=${index + 1}`}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p>{index + 1}</p>
        </Link>
      ))}
    </Container>
  );
}

export default Network;
