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
        event.preventDefault();
        API.login({
          username: loginFormState.usernameSignIn,
          password: loginFormState.passwordSignIn
        })
          .then(res => {
            console.log(res.data)
            props.setUserState({
              username: res.data.user.username,
              id: res.data.user.id
            })
            props.setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
          }).catch(err => {
            console.log(err);
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
            console.log("response is received")
            API.login({
              username: loginFormState.usernameSignUp,
              password: loginFormState.passwordSignUp
            })
            console.log(res.data)
            props.setUserState({
              username: res.data.username,
              id: res.data.id
            })
            props.setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
          }).catch(err => {
            console.log(err);
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
                    <input className="uk-input" type="text" value={loginFormState.usernameSignIn} name="usernameSignIn" onChange={handleLoginChange}/>
                </div>

                {/* Password for signin */}
                <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
                    <span className="uk-form-icon " uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" value={loginFormState.passwordSignIn} name="passwordSignIn" onChange={handleLoginChange}/>
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
                    <input className="uk-input" type="text" value={loginFormState.usernameSignUp} name="usernameSignUp" onChange={handleLoginChange}/>
                </div>

                {/* email for create account */}
                <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
                    <span className="uk-form-icon" uk-icon="icon: mail"></span>
                    <input className="uk-input" type="email" value={loginFormState.emailSignUp} name="emailSignUp" onChange={handleLoginChange}/>
                </div>
                
                {/* Password for create account */}
                <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" value={loginFormState.passwordSignUp} name="passwordSignUp" onChange={handleLoginChange}/>
                </div>

                {/* button for create account */}
                <button className="uk-button uk-margin-auto uk-flex uk-button-default" onClick={handleSignupSubmit}>Create Account</button>
            </div>
        </div>
    )
}

export default SignupForm;