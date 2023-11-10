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

  const sendRequest = async (url, method, data, login = false) => {
    if (method === "post") {
      try {
        setLoading(true);
        const res = await api.post(url, data);
        setResult(res);

        if (!login) return;
        const user = res.data;
        dispatch(userLoginActions.storeUser(user));
        Navigate("/", { replace: true });
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    }

    if (method === "get") {
      try {
        setLoading(true);
        const res = await api.get(url, data);
        setResult(res);
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    }
    if (method === "put") {
      try {
        setLoading(true);
        const res = await api.put(url, data);
        setResult(res);
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    }
    if (method === "delete") {
      try {
        setLoading(true);
        const res = await api.delete(url, data);
        setResult(res);
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
