//추후 설정할것!
import axios from "axios";

const backendPortNumber = "5001";

// import axios from "axios";

//request사용
const config = {
  baseURL:
    process.env.REACT_APP_API_BASE_URL || process.env.REACT_APP_BUILD_BASE_URL,
  // headers: { "Content-Type": "application/json" },
  timeout: 5000,
  withCredentials: true,
};

export const api = axios.create(config); // 인스턴스

// [Client] ------[ Interceptor ] -----> [Server]
api.interceptors.request.use(
  (req) => {
    //요청 data가 formData일때
    // console.log("req", req);
    if (req.data && req.data instanceof FormData) {
      req.headers["Content-Type"] = "application/json";
    }
    //요청 data가 Object일 때
    if (req.data && req.data instanceof Object) {
      req.headers["Content-Type"] = "application/json";
      req.data = JSON.stringify(req.data);
    }
    return req;
  },
  (err) => {
    // 400(Bad Requeset), 404(NotFound)
    console.log(err.response);
    if (err.response.status >= 400 && err.response.status < 400) {
      alert(`에러가 발생하였습니다 ${err.status}`);
      // throw new Error("Error");
    }
    if (err.response.status <= 500) {
      alert(`에러가 발생하였습니다 ${err.status}`);
    }
  }
);

// [Client] <------[ Interceptor ] ----- [Server]

api.interceptors.response.use(
  (res) => {
    console.log("응답이 도착했음", res);

    return res;
  },
  (err) => {
    if (err.status >= 400 && err.status < 500) {
      alert(`요청이 실패하였습니다: error code ${err.status} `);
    } else if (err.status >= 500) {
      alert(`요청이 실패하였습니다 error code ${err.status}`);
    } else {
      console.log("응답이 도착했음");
    }
    return Promise.reject(err);
  }
);

export default api;
