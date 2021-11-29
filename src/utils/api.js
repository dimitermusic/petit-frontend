import axios from "axios";
import App from "../App"
const URL_PREFIX = "http://localhost:3001"
// TODO: upon deployment
// const URL_PREFIX = "HEROKU BACK END URL"

const API = {
    getProfile: (tkn)=>{
        return axios.get(`${URL_PREFIX}/profile`,{headers:{"Authorization":`Bearer ${tkn}`}})
    },
    login:(usrData)=>{
        return axios.post(`${URL_PREFIX}/api/users/login`,usrData)
    },
    signup:(usrData)=>{
        return axios.post(`${URL_PREFIX}/api/users/signup`,usrData)
    }
};

export default API;