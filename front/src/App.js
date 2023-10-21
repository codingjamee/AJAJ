import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./components/utils/api";
import { loginReducer } from "./components/hooks/reducer";

import Navigation from "./components/common/header/Navigation";
import Login from "./components/pages/login/Login";
import Network from "./components/pages/network/Network";
import RegisterForm from "./components/pages/register/RegisterForm";
import Portfolio from "./components/pages/users/Portfolio";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("user/current", "", "App");
      const currentUser = res.data.currentUserInfo.id;
      console.log("currentUser", currentUser);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log(currentUser);

      console.log("%c 로그인 인증된 쿠키 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c 로그인 인증된 쿠키 없음.", "color: #d93d1a;");
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

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
