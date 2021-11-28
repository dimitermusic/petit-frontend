import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from "./style.css";
import App from "../../App"

function SignupForm(props) {

    return (
        <div>
{/* LOGIN */}
            <h1 className="uk-flex uk-flex-center">Login</h1>
            <div className="uk-card">
                {/* Username for signin */}
                <div className="uk-inline uk-margin-auto uk-flex uk-form-width-medium">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" value={props.loginState.usernameSignIn} name="usernameSignIn" onChange={props.change}/>
                </div>

                {/* Password for signin */}
                <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
                    <span className="uk-form-icon " uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" value={props.loginState.passwordSignIn} name="passwordSignIn" onChange={props.change}/>
                </div>

                {/* button for signin */}
                <button className="uk-button uk-margin-auto uk-flex uk-button-default" onClick={props.submitSignin}>Login</button>
            </div>

{/* CREATE ACCOUNT */}
            <h1 className="uk-flex uk-flex-center">Create Account</h1>
            <div className="uk-card">
                {/* Username for create account */}
                <div className="uk-inline uk-margin-auto uk-flex uk-form-width-medium">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" value={props.loginState.usernameSignUp} name="usernameSignUp" onChange={props.change}/>
                </div>

                {/* email for create account */}
                <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
                    <span className="uk-form-icon" uk-icon="icon: mail"></span>
                    <input className="uk-input" type="email" value={props.loginState.emailSignUp} name="emailSignUp" onChange={props.change}/>
                </div>
                
                {/* Password for create account */}
                <div className="uk-inline uk-margin-auto uk-form-width-medium uk-flex">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" value={props.loginState.passwordSignUp} name="passwordSignUp" onChange={props.change}/>
                </div>

                {/* button for create account */}
                <button className="uk-button uk-margin-auto uk-flex uk-button-default" onClick={props.submitSignup}>Create Account</button>
            </div>
        </div>
    )
}

export default SignupForm;