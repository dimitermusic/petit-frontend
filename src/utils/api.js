import axios from "axios";
import App from "../App"
const URL_PREFIX = "http://localhost:3001"
// TODO: upon deployment
// const URL_PREFIX = "HEROKU BACK END URL"

const API = {
    login:(usrData)=>{
        return axios.post(`${URL_PREFIX}/api/login`,usrData)
    },
    signup:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/api/signup`,usrData)
    },

};

export default API;