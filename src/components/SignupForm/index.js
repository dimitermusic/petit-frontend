import React, { useState } from "react";
import { useDispatch } from "react-redux";
import API from "../../utils/api";
import { USER } from "../../utils/actions";
import "./style.css"


function SignupForm(props) {
  const dispatch = useDispatch()
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
    event.preventDefault();
    API.login({
      username: loginFormState.usernameSignIn,
      password: loginFormState.passwordSignIn
    })
      .then(res => {
        props.setUserState(res.data.user)
        props.setToken(res.data.token)
        localStorage.setItem("token", res.data.token)
        dispatch({
          type: USER,
          payload: res.data.user
        })
      }).catch(err => {
        console.log(err);
        alert("Incorrect Username or Password")
      })
  }

  const handleSignupSubmit = event => {
    event.preventDefault();
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
          props.setUserState(taco.data.user)
          props.setToken(taco.data.token)
          localStorage.setItem("token", taco.data.token)
          dispatch({
            type: USER,
            payload: taco.data.user
          })
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
    <div className="splash">
      <div className="col-one">
        <h1>Pet-friendly Places.</h1>
        <h2>Join the conversation today!</h2>
      </div>
      {/* LOGIN */}
      <div className="col-two">
        <h1 className="uk-flex uk-flex-center">Login</h1>
        <div className="uk-card">
          {/* Username for signin */}
          <div className="uk-inline uk-margin-auto uk-flex uk-form-width-medium">
            <span className="uk-form-icon" uk-icon="icon: user"></span>
            <input className="uk-input" type="text" placeholder="username" value={loginFormState.usernameSignIn} name="usernameSignIn" onChange={handleLoginChange} />
          </div>

          {/* Password for signin */}
          <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
            <span className="uk-form-icon " uk-icon="icon: lock"></span>
            <input className="uk-input" type="password" placeholder="password" value={loginFormState.passwordSignIn} name="passwordSignIn" onChange={handleLoginChange} />
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
            <input className="uk-input" type="text" placeholder="username" value={loginFormState.usernameSignUp} name="usernameSignUp" onChange={handleLoginChange} />
          </div>

          {/* email for create account */}
          <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" type="email" placeholder="email" value={loginFormState.emailSignUp} name="emailSignUp" onChange={handleLoginChange} />
          </div>

          {/* Password for create account */}
          <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
            <span className="uk-form-icon" uk-icon="icon: lock"></span>
            <input className="uk-input" type="password" placeholder="password" value={loginFormState.passwordSignUp} name="passwordSignUp" onChange={handleLoginChange} />
          </div>

          {/* button for create account */}
          <button className="uk-button uk-margin-auto uk-flex uk-button-default" onClick={handleSignupSubmit}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;