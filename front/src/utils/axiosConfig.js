//추후 설정할것!
import axios from "axios";

// import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
  withCredentials: true,
};

export const api = axios.create(config); // 인스턴스

// [Client] ------[ Interceptor ] -----> [Server]
api.interceptors.request.use(
  (req) => {
    //요청 data가 formData일때
    if (req.data && req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    //요청 data가 Object일 때
    else if (req.data && req.data instanceof Object) {
      req.headers["Content-Type"] = "application/json";
    }

    return req;
  },
  (err) => {
    console.log("인터셉터에서 잡은", err);
  }
);

// [Client] <------[ Interceptor ] ----- [Server]

api.interceptors.response.use(
  (res) => {
    // console.log("응답이 도착했음", res);
    // alert("요청에 성공했습니다!");
    return res;
  },
  (err) => {
    console.log("인터셉터에서 잡은", err);
    throw new Error("잘못된 요청입니다");
  }
);

export default api;
