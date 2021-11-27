import axios from "axios";
const URL_PREFIX = "http://localhost:3000"
// TODO: upon deployment
// const URL_PREFIX = "HEROKU BACK END URL"

const API = {
    login:(usrData)=>{
        return axios.post(`${URL_PREFIX}/login`,usrData)
    },

    handleSigninSubmit: (event)=>{
        event.preventDefault();
        axios.post("https://localhost:3001/signin", {
          username: loginFormState.usernameSignIn,
          password: loginFormState.passwordSignIn})
        .then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err);
        })
      },

      handleSignupSubmit: (event) =>{
        event.preventDefault();
        axios.post("https://localhost:3001/signup", {
          email: loginFormState.emailSignUp,
          username: loginFormState.usernameSignUp,
          password: loginFormState.passwordSignUp
        })
        .then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err);
        })
      },

      handleLoginChange: (event) =>{
        if(event.target.name==="usernameSignIn"){
          setLoginFormState({
            ...loginFormState,
            usernameSignIn: event.target.value
          });
        } else if (event.target.name==="passwordSignIn"){
          setLoginFormState({
            ...loginFormState,
            passwordSignIn:event.target.value
          });
        } else if (event.target.name==="emailSignUp"){
          setLoginFormState({
            ...loginFormState,
            emailSignUp:event.target.value
          });
        } else if (event.target.name==="usernameSignUp"){
          setLoginFormState({
            ...loginFormState,
            usernameSignUp:event.target.value
          });
        } else {
          setLoginFormState({
            ...loginFormState,
            passwordSignUp: event.target.value
          });
        }
      },

      handleSearchChange: (event) =>{
        if(event.target.name === "search"){
          setSearchFormState({
            ...searchFormState,
            search: event.target.value
          })
        }
      }

};

export default API;