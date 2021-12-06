import axios from "axios";
// const URL_PREFIX = "http://localhost:3001"
const URL_PREFIX = "https://petit-backend.herokuapp.com"

const API = {
    getProfile: (tkn) => {
        return axios.get(`${URL_PREFIX}/api/users/profile`, { headers: { "Authorization": `Bearer ${tkn}` } })
    },
    login: (usrData) => {
        return axios.post(`${URL_PREFIX}/api/users/login`, usrData)
    },
    signup: (usrData) => {
        return axios.post(`${URL_PREFIX}/api/users/signup`, usrData)
    },
    userSettings: (usrData, tkn) => {
        return axios.put(`${URL_PREFIX}/api/users`, usrData, {
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    userDelete: (tkn) => {
        return axios.delete(`${URL_PREFIX}/api/users`, {
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    getAllPlaces: () => {
        return axios.get(`${URL_PREFIX}/api/places`)
    },
    getOnePlace: (placeData, tkn, ref_id) => {
        return axios.post(`${URL_PREFIX}/api/places/${ref_id}`, placeData, {
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    getAllComments: (tkn, placeId) => {
        return axios.get(`${URL_PREFIX}/api/comments/${placeId}`, {
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    postComment: (commentData, tkn,) => {
        return axios.post(`${URL_PREFIX}/api/comments/`, commentData, {
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    editComment: (commentData, tkn, id) => {
        return axios.put(`${URL_PREFIX}/api/comments/${id}`, commentData, {
            headers: {
                "Authorization": `Bearer: ${tkn}`
            }
        })
    },
    delComment: (tkn, id) => {
        return axios.delete(`${URL_PREFIX}/api/comments/${id}`, {
            headers: {
                "Authorization": `Bearer: ${tkn}`
            }
        })
    },
    postReact: (reactData, tkn, commentId) => {
        return axios.post(`${URL_PREFIX}/api/reactions/${commentId}`, reactData, {
            headers: {
                "Authorization": `Bearer: ${tkn}`
            }
        })
    },
    editReact: (reactData, tkn, id) => {
        return axios.put(`${URL_PREFIX}/api/reactions/${id}`, reactData, {
            headers: {
                "Authorization": `Bearer: ${tkn}`
            }
        })
    },
    vote: (voteData, tkn) => {
        return axios.put(`${URL_PREFIX}/api/votes`, voteData, {
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    apiFetch: (fetchData) => {
        return axios.post(`${URL_PREFIX}/api/google`, fetchData)
    }
};

export default API;