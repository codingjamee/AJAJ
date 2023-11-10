import { useState } from "react";
import api from "../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { userLoginActions } from "../store/userLogin";
import { Navigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const useApi = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [reqIdentifier, setReqIdentifier] = useState("");
  const [error, setError] = useState(false);
  const [extra, setExtra] = useState("");
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  const sendRequest = async (url, method, data, login = false, extras = "") => {
    if (method === "post") {
      try {
        setLoading(true);
        setReqIdentifier(method + "Data");
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
        setReqIdentifier(method + "Data");
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
        setReqIdentifier(method + "Data");
        const res = await api.put(url, data);
        setResult(res);
        setExtra(extras);
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    }
    if (method === "delete") {
      try {
        setLoading(true);
        setReqIdentifier(method + "Data");
        const res = await api.delete(url);
        console.log(res);
        setExtra(extras);
        setResult(res);
      } catch (err) {
        showBoundary(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return { result, loading, sendRequest, reqIdentifier, extra };
};

export default useApi;
