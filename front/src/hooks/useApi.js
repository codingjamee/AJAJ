import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

const useApi = (url) => {
  const [result, setResult] = useState();
  //이렇게 사용하면 loading의 상태를 redux로 관리할 필요가 있을까?
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.get(url).then((result) => {
      if (!cancelled) {
        setResult(result.data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return [result, loading];
};

export default useApi;
