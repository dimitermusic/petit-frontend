import SignupForm from "./components/SignupForm/index.js"
import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [loginFormState, setLoginFormState] = useState ({
    usernameSignIn:"",
    passwordSignIn:"",
    emailSignUp:"",
    usernameSignUp:"",
    passwordSignUp:""
  })

  const handleLoginChange = event=>{
    if(event.target.name==="usernameSignIn"){
      setLoginFormState({
        ...loginFormState,
        usernameSignIn: event.target.value
      })
    } else if (event.target.name==="passwordSignIn"){
      setLoginFormState({
        ...loginFormState,
        passwordSignIn:event.target.value
      })
    } else if (event.target.name==="emailSignUp"){
      setLoginFormState({
        ...loginFormState,
        emailSignUp:event.target.value
      })
    } else if (event.target.name==="usernameSignUp"){
      setLoginFormState({
        ...loginFormState,
        usernameSignUp:event.target.value
      })
    } else {
      setLoginFormState({
        ...loginFormState,
        passwordSignUp: event.target.value
      })
    }
  }

  return (
    <>
      <SignupForm change={handleLoginChange} loginState={loginFormState}/>
    </>
  );
}

export default App;