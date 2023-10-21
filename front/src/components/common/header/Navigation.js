import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { UserStateContext, DispatchContext } from "../../../App";

//@@@@@@@@@@@@@@@@수정필요@@@@@@@@@@@@@@@@@@@@@성혜님@@@@@@@@@@@@@@@@/
const navItems = [
  { path: "/", label: "홈페이지" },
  { path: "/users/:userId", label: "마이페이지" },
  { path: "/network", label: "네트워크" },
];

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      expand="lg"
      className="bg-body-tertiary"
      activeKey={location.pathname}
    >
      <Container>
        <Nav.Link onClick={() => navigate("/")}>
          안녕하세요, 포트폴리오 공유 서비스입니다.
        </Nav.Link>
        {navItems.map(({ path, label }, index) => (
          <Nav.Item key={`navitem-${index}`} className="me-auto, mr-1">
            <Nav.Link onClick={() => navigate(path)}> {label} </Nav.Link>
          </Nav.Item>
        ))}
        {isLogin && (
          <Nav.Item>
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
          </Nav.Item>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
