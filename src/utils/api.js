import axios from "axios";
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
    },
    userSettings:(usrData, id, tkn)=>{
        return axios.put(`${URL_PREFIX}/api/users/${id}`,usrData,{
            headers:{
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    userDelete:(id, tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/users/${id}`,{
            headers:{
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    userProf:(tkn)=>{
        return axios.get(`${URL_PREFIX}/users/profile`,{
            headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getAllPlaces:()=>{
        return axios.get(`${URL_PREFIX}/api/places`)
    },
    getOnePlace:(placeData,tkn, ref_id)=>{
        return axios.get(`${URL_PREFIX}/api/places/${ref_id}`,placeData,{
            headers:{
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    postComment:(commentData, tkn, placeId)=>{
        return axios.post(`${URL_PREFIX}/api/comments/place/${placeId}`,commentData,{
            headers:{
                "Authorization":`Bearer ${tkn}`
            }
        })
    },
    editComment:(commentData, tkn, id) =>{
        return axios.put(`${URL_PREFIX}/api/comments/${id}`,commentData,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    },
    delComment:(tkn, id)=>{
        return axios.delete(`${URL_PREFIX}/api/comments/${id}`,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    },
    postReact:(reactData, tkn, commentId)=>{
        return axios.post(`${URL_PREFIX}/api/reactions/${commentId}`,reactData,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    },
    editReact:(reactData, tkn, id)=>{
        return axios.put(`${URL_PREFIX}/api/reactions/${id}`,reactData,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    },
    delReact:(tkn, id)=>{
        return axios.delete(`${URL_PREFIX}/api/reactions/${id}`,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    },
    vote:(voteData, tkn, id)=>{
        return axios.put(`${URL_PREFIX}/api/votes/${id}`,voteData,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    },
    apiFetch:(fetchData,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/google`,fetchData,{
            headers:{
                "Authorization":`Bearer: ${tkn}`
            }
        })
    }
};

export default API;