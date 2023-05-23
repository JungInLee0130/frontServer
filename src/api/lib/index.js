import axios from "axios";

<<<<<<< HEAD
function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "access-token": sessionStorage.getItem("access-token"),
    },
  });
  return instance;
=======
function apiInstance(){
    //const token = 
    const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "access-token": sessionStorage.getItem("access-token"),
        },
    });
    return instance;
>>>>>>> 48cc44ec22fb5e0a4ed67e1e368f5609492e6209
}

export { apiInstance };
