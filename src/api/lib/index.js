import axios from "axios";

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
}
  
export { apiInstance };