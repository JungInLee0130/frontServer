import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(member, success, fail) {
  await api.post(`/login`, JSON.stringify(member)).then(success).catch(fail);
}
  
async function findById(memberId, success, fail) { // findbyid : 유저 dto 리턴
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/info/${memberId}`).then(success).catch(fail);
}

async function getMemberId(token,success,fail){
  console.log(3);
  let accessTokenDto = {
    accessToken: token,
  }
  console.log(accessTokenDto.accessToken);
  await api.post(`/token`, accessTokenDto).then(success).catch(fail);
}

async function tokenRegeneration(member, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/refresh`, member).then(success).catch(fail);
}

async function logout(memberId, success, fail) {
  await api.get(`/logout/${memberId}`).then(success).catch(fail);
}


export { login, findById, tokenRegeneration, logout, getMemberId};