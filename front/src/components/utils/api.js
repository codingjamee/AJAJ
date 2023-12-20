import api from "./axiosConfig";

const backendPortNumber = "5002";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint, params = "", component) {
  // console.log(
  //   `%cGET 요청 ${serverUrl + endpoint + "/" + params} - ${component}에서`,
  //   "color: #a25cd1;"
  // );

  return api.get(
    endpoint + "/" + params
    // serverUrl + endpoint + "/" + params
    // , {
    //   // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    //   // headers: {
    //   //   Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    //   // },
    //   // 쿠키를 서버에 보냄
    //   withCredentials: true,
    // }
  );
}

async function post(endpoint, data, component) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  // console.log(
  //   `%cPOST 요청: ${serverUrl + endpoint} - ${component}에서`,
  //   "color: #296aba;"
  // );
  // console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return api.post(
    endpoint,
    bodyData
    // serverUrl + endpoint, bodyData
    //   , {
    //   headers: {
    //     "Content-Type": "application/json",
    //     //   Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    //   },
    //   // 쿠키를 서버에 보냄
    //   withCredentials: true,
    // }
  );
}

async function put(endpoint, data, components) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  // console.log(
  //   `%cPUT 요청: ${serverUrl + endpoint} -${components}에서`,
  //   "color: #059c4b;"
  // );
  // console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return api.put(
    endpoint,
    bodyData
    // serverUrl + endpoint, bodyData
    // , {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    //   },
    //   withCredentials: true,
    // }
  );
}

async function patch(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  // console.log(`%cPATCH 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  // console.log(`%cPATCH 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return api.patch(
    serverUrl + endpoint
    //   , bodyData, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    //   },
    //   withCredentials: true,
    // }
  );
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "", component) {
  // console.log(
  //   `DELETE 요청 ${serverUrl + endpoint + "/" + params} -${component}에서`
  // );
  return api.delete(
    serverUrl + endpoint + "/" + params
    // , {
    //   // headers: {
    //   //   // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    //   // },
    //   // 쿠키를 서버에 보냄
    //   withCredentials: true,
    // }
  );
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, patch, del as delete };
