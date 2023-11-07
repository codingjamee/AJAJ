import api from "./axiosConfig";

const backendPortNumber = "5002";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint, params = "", component) {
  return api.get(endpoint + "/" + params);
}

async function post(endpoint, data, component) {
  const bodyData = JSON.stringify(data);

  return api.post(endpoint, bodyData);
}

async function put(endpoint, data, components) {
  const bodyData = JSON.stringify(data);

  return api.put(endpoint, bodyData);
}

async function patch(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return api.patch(serverUrl + endpoint);
}

async function del(endpoint, params = "", component) {
  return api.delete(serverUrl + endpoint + "/" + params);
}

export { get, post, put, patch, del as delete };
