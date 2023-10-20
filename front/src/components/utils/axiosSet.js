//추후 설정할것!

// import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL; // https://localhost:3030
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 5000;

axios.post("/users");

export const api = axios.create(); // 인스턴스
export const api2 = axios.create({ baseURL: "http://localhost:3031" });
export const api3 = axios.create({ baseURL: "http://localhost:3032" });

// [Client] ------[ Interceptor ] -----> [Server]
api.interceptors.request.use(
  (req) => {
    if (req.data && req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    return req;
  },
  (err) => {
    // 400(Bad Requeset), 404(NotFound)
    if (err.statusCode === HttpStatusCode.BadRequest) {
      throw new Error("404 Error");
    }
  }
);

api.interceptors.response.use(
  (req) => {},
  (err) => {}
);
