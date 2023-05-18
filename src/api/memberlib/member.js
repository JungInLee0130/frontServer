import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(member, success, fail) {
    await api.post(`/login`, JSON.stringify(member)).then(success).catch(fail);
  }
  
async function findById(memberId, success, fail) {
api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
await api.get(`/info/${memberId}`).then(success).catch(fail);
}

async function tokenRegeneration(member, success, fail) {
api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
await api.post(`/user/refresh`, member).then(success).catch(fail);
}

async function logout(memberId, success, fail) {
await api.get(`/user/logout/${memberId}`).then(success).catch(fail);
}


export { login, findById, tokenRegeneration, logout};