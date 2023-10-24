import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./components/utils/api";
import { loginReducer } from "./components/hooks/loginReducer";

import Navigation from "./components/common/header/Navigation";
import Login from "./components/pages/login/Login";
import Network from "./components/pages/network/Network";
import RegisterForm from "./components/pages/register/RegisterForm";
import Portfolio from "./components/pages/users/Portfolio";
import { loadingActions } from "./store/loading";
import { useDispatch, useSelector } from "react-redux";
import LoadingLayer from "./UI/LoadingLayer";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const loadingDispatch = useDispatch();
  const loadingState = useSelector((state) => state.loading.open);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("user/current", "", "App");
      const currentUser = res.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });
      console.log("%c 로그인 인증된 쿠키 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c 로그인 인증된 쿠키 없음.", "color: #d93d1a;");
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!isFetchCompleted) {
      loadingDispatch(loadingActions.open());
    } else {
      loadingDispatch(loadingActions.close());
      console.log(loadingState);
    }

    if (loadingState) {
      return <LoadingLayer message="Loading....." />;
    } else {
      loadingDispatch(loadingActions.close());
    }
  }, [loadingState]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users/:userId" element={<Portfolio />} />
            <Route path="/network" element={<Network />} />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
