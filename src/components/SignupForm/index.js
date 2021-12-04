import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from "./style.css";
import App from "../../App"
import API from "../../utils/api";


function SignupForm(props) {

  const [loginFormState, setLoginFormState] = useState({
    usernameSignIn: "",
    passwordSignIn: "",
    emailSignUp: "",
    usernameSignUp: "",
    passwordSignUp: ""
  });

  const handleLoginChange = event => {
    if (event.target.name === "usernameSignIn") {
      setLoginFormState({
        ...loginFormState,
        usernameSignIn: event.target.value
      });
    } else if (event.target.name === "passwordSignIn") {
      setLoginFormState({
        ...loginFormState,
        passwordSignIn: event.target.value
      });
    } else if (event.target.name === "emailSignUp") {
      setLoginFormState({
        ...loginFormState,
        emailSignUp: event.target.value
      });
    } else if (event.target.name === "usernameSignUp") {
      setLoginFormState({
        ...loginFormState,
        usernameSignUp: event.target.value
      });
    } else {
      setLoginFormState({
        ...loginFormState,
        passwordSignUp: event.target.value
      });
    }
  }

  const handleSigninSubmit = event => {
    console.log(`username: ${loginFormState.usernameSignIn}`)
    console.log(`password: ${loginFormState.passwordSignIn}`)
    event.preventDefault();
    API.login({
      username: loginFormState.usernameSignIn,
      password: loginFormState.passwordSignIn
    })
      .then(res => {
        console.log(res.data)
        props.setUserState(res.data.user)
        props.setToken(res.data.token)
        localStorage.setItem("token", res.data.token)
      }).catch(err => {
        console.log(err);
        alert("Incorrect Username or Password")
      })
  }

  const handleSignupSubmit = event => {
    // event.preventDefault();
    console.log("event is triggered")
    API.signup({
      email: loginFormState.emailSignUp,
      username: loginFormState.usernameSignUp,
      password: loginFormState.passwordSignUp
    })
      .then(res => {
        console.log(res.data, "heellooooooooooo")
        API.login({
          username: loginFormState.usernameSignUp,
          password: loginFormState.passwordSignUp
        }).then(taco => {
          console.log(taco.data)
          props.setUserState(taco.data.user)
          props.setToken(taco.data.token)
          localStorage.setItem("token", taco.data.token)
        })
      }).catch(err => {
        console.log(err);
        alert(`One or more fields do not meet criteria.
        Username must be Unique
        Password must be 8-16 characters long. 
        Email must be valid`)
      })
  }



  return (
    <div>
      {/* LOGIN */}
      <h1 className="uk-flex uk-flex-center">Login</h1>
      <div className="uk-card">
        {/* Username for signin */}
        <div className="uk-inline uk-margin-auto uk-flex uk-form-width-medium">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input className="uk-input" type="text" value={loginFormState.usernameSignIn} name="usernameSignIn" onChange={handleLoginChange} />
        </div>

        {/* Password for signin */}
        <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
          <span className="uk-form-icon " uk-icon="icon: lock"></span>
          <input className="uk-input" type="password" value={loginFormState.passwordSignIn} name="passwordSignIn" onChange={handleLoginChange} />
        </div>

        {/* button for signin */}
        <button className="uk-button uk-margin-auto uk-flex uk-button-default" onClick={handleSigninSubmit}>Login</button>
      </div>

      {/* CREATE ACCOUNT */}
      <h1 className="uk-flex uk-flex-center">Create Account</h1>
      <div className="uk-card">
        {/* Username for create account */}
        <div className="uk-inline uk-margin-auto uk-flex uk-form-width-medium">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input className="uk-input" type="text" value={loginFormState.usernameSignUp} name="usernameSignUp" onChange={handleLoginChange} />
        </div>

        {/* email for create account */}
        <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
          <span className="uk-form-icon" uk-icon="icon: mail"></span>
          <input className="uk-input" type="email" value={loginFormState.emailSignUp} name="emailSignUp" onChange={handleLoginChange} />
        </div>

        {/* Password for create account */}
        <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
          <span className="uk-form-icon" uk-icon="icon: lock"></span>
          <input className="uk-input" type="password" value={loginFormState.passwordSignUp} name="passwordSignUp" onChange={handleLoginChange} />
        </div>

        {/* button for create account */}
        <button className="uk-button uk-margin-auto uk-flex uk-button-default" onClick={handleSignupSubmit}>Create Account</button>
      </div>
    </div>
  )
}

export default SignupForm;