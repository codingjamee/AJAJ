import { useState } from "react";
import api from "../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { userLoginActions } from "../store/userLogin";
import { Navigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const useApi = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  const sendRequest = async (url, method, data) => {
    if (method === "post") {
      try {
        setLoading(true);
        const res = await api.post(url, data);
        console.log("로그인성공", res);
        setResult(res.data);
        const user = res.data;
        dispatch(userLoginActions.storeUser(user));
        Navigate("/", { replace: true });
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return { result, loading, sendRequest };
};

export default useApi;
