import React, { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navigation from "./components/common/header/Navigation";
import Login from "./components/pages/login/Login";
import Network from "./components/pages/network/Network";
import RegisterForm from "./components/pages/register/RegisterForm";
import Portfolio from "./components/pages/users/Portfolio";
import { loadingActions } from "./store/loading";
import { userLoginActions } from "./store/userLogin";
import { useDispatch, useSelector } from "react-redux";
import LoadingLayer from "./UI/LoadingLayer";
import api from "./utils/axiosConfig";
import Home from "./components/pages/home/Home";
import NotFound from "./components/pages/404/NotFound";

function App() {
  const reduxDispatch = useDispatch();
  const loadingState = useSelector((state) => state.loading.open);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userLogin);

  const fetchCurrentUser = useCallback(async () => {
    try {
      reduxDispatch(loadingActions.open());
      const res = await api.get("user/current");
      const currentUser = res.data.id;
      console.log(currentUser);
      if (currentUser) {
        //쿠키에 유저가 있는 경우만
        reduxDispatch(userLoginActions.storeUser(res.data));
        console.log("%c 로그인 되었습니다.", "color: #d93d1a;");
      }
    } catch {
      console.log("%c 로그인 후 사용해주세요.", "color: #d93d1a;");
    } finally {
      reduxDispatch(loadingActions.close());
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // useEffect(() => {
  //   if (!userState.user) {
  //     navigate("/login", { replace: true });
  //     return;
  //   }
  // }, [userState.user]);

  if (loadingState) {
    return <LoadingLayer message="Loading....." />;
  }

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/users/:userId" element={<Portfolio />} />
        <Route path="/network" element={<Network />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
