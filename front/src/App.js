import React, {
  useEffect,
  useReducer,
  createContext,
  useCallback,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { loginReducer } from "./reducers/loginReducer";

import Navigation from "./components/common/header/Navigation";
import Login from "./components/pages/login/Login";
import Network from "./components/pages/network/Network";
import RegisterForm from "./components/pages/register/RegisterForm";
import Portfolio from "./components/pages/users/Portfolio";
import { loadingActions } from "./store/loading";
import { useDispatch, useSelector } from "react-redux";
import LoadingLayer from "./UI/LoadingLayer";
import api from "./utils/axiosConfig";
import Home from "./components/pages/home/Home";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const loadingDispatch = useDispatch();
  const loadingState = useSelector((state) => state.loading.open);
  const navigate = useNavigate();

  const fetchCurrentUser = useCallback(async () => {
    try {
      loadingDispatch(loadingActions.open());
      const res = await api.get("user/current");
      console.log(res);
      const currentUser = res.data;
      if (currentUser) {
        //쿠키에 유저가 있는 경우만
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: currentUser,
        });
      }
      console.log("%c 로그인 인증된 쿠키 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c 로그인 인증된 쿠키 없음.", "color: #d93d1a;");
    } finally {
      loadingDispatch(loadingActions.close());
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userState.user]);

  if (loadingState) {
    return <LoadingLayer message="Loading....." />;
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/users/:userId" element={<Portfolio />} />
          <Route path="/network" element={<Network />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
