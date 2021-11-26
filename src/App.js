import SignupForm from "./components/SignupForm/index.js";
import SearchBar from "./components/SearchBar/index.js";
import React, { useState } from "react";
import ReactDOM from "react-dom";
const axios = require("axios");

function App() {

  const [searchFormState, setSearchFormState] = useState({
    search: ""
  })

  const [loginFormState, setLoginFormState] = useState ({
    usernameSignIn:"",
    passwordSignIn:"",
    emailSignUp:"",
    usernameSignUp:"",
    passwordSignUp:""
  });

  const handleSearchChange = event =>{
    if(event.target.name === "search"){
      setSearchFormState({
        ...searchFormState,
        search: event.target.value
      })
    }
  }

  const handleLoginChange = event=>{
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
  }

  const handleSigninSubmit = event=>{
    event.preventDefault();
    axios.post("https://localhost:3001/signin", {
      usernameSignIn: loginFormState.usernameSignIn,
      passwordSignIn: loginFormState.passwordSignIn})
    .then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleSignupSubmit = event=>{
    event.preventDefault();
    axios.post("https://localhost:3001/signup", {
      emailSignUp: loginFormState.emailSignUp,
      usernameSignUp: loginFormState.usernameSignUp,
      passwordSignUp: loginFormState.passwordSignUp
    })
    .then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
      <SignupForm 
        submitSignup={handleSignupSubmit} 
        submitSignin={handleSigninSubmit} 
        change={handleLoginChange} 
        loginState={loginFormState}/>
      <h1>==========SearchBar==========</h1>
      <SearchBar
        searchState={searchFormState}
        change={handleSearchChange}/>
    </>
  );
}

export default App;