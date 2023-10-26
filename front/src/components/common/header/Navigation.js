import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../../../App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../UI/design.css";
import * as Api from "../../utils/api";
import logo from "./logo0.png";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // console.log(userState);

  const navItems = [
    { path: "/", label: "홈페이지" },
    { path: `/users/${userState?.user?.id}`, label: "마이페이지" },
    { path: "/network", label: "네트워크" },
  ];

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  //api 작성되면 추후에 구현
  const logout = async () => {
    await Api.get("logout", "", "Navigation");
    dispatch({ type: "LOGOUT" });
    //   // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Navbar variant="dark">
      <Nav.Link onClick={() => navigate("/")}>
        <img src={logo} alt="logo" width={"130px"} height={"100%"} />
        AJAJ : My first portfolio
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" />
      <Nav className="mr-auto" activeKey={location.pathname}>
        {navItems.map(({ path, label }, index) => (
          <Nav.Link key={`navitem-${index}`} onClick={() => navigate(path)}>
            {" "}
            {label}{" "}
          </Nav.Link>
        ))}
        {isLogin && <Nav.Link onClick={logout}>로그아웃</Nav.Link>}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
