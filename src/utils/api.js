import axios from "axios";
import App from "../App"
const URL_PREFIX = "http://localhost:3000"
// TODO: upon deployment
// const URL_PREFIX = "HEROKU BACK END URL"

const API = {
    login:(usrData)=>{
        return axios.post(`${URL_PREFIX}/login`,usrData)
    },

};

export default API;