import axios from "axios";

function apiInstance(){
    const token = sessionStorage.getItem("access-token");
    console.log(token);
    const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "access-token": token
        },
    });
    return instance;
}
  
export { apiInstance };