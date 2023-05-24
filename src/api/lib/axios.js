import axios from "axios";
import router from "../../router";

// axios 객체 생성
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});
//1. 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    // console.log(VueCookies.get("accesstoken"));
    // const token = VueCookies.get("accesstoken").token;
    // config.headers.Authorization = `${token}`;
    // return config;
    if (sessionStorage.getItem("access-token") !== null) {
      config.headers["access-token"] = sessionStorage.getItem("access-token");
      config.headers["refresh-token"] = sessionStorage.getItem("refresh-token");
      // console.log(config);
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    // 요청 에러 직전 호출
    return Promise.reject(error);
  }
);

// 2. 응답 인터셉터

instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출
        .then() 으로 이어짐
    */

    return response;
  },

  (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출
        .catch() 으로 이어짐
    */

    if (error.response.data.status === 500) {
      router.push({
        name: "error",
        params: {
          message: "Server Error",
          status: 500,
        },
      });
      return new Promise(() => {});
    }
    if (error.response.data.error.status === 500) {
      router.push({
        name: "error",
        params: {
          message: error.response.data.error.message,
          status: error.response.data.error.status,
        },
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
