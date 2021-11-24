import SignupForm from "./components/SignupForm/index.js"
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Avatar from "@mui/material/Avatar"
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';


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

  const handleSigninSubmit = event=>{
    event.preventDefault();
    axios.post("https://localhost:3001/signin", {
      usernameSignIn: usernameSignIn,
      passwordSignIn: passwordSignIn})
    .then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleSignupSubmit = event=>{
    event.preventDefault();
    axios.post("https://localhost:3001/signup", {
      emailSignUp: emailSignUp,
      usernameSignUp: usernameSignUp,
      passwordSignUp: passwordSignUp
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

<h1>
      --------------------------------
      </h1>
<Box>
      <h1> @charlotte </h1>
<Avatar
  alt="Panda"
  src="./public/images/panda.jpg"
  sx={{ width: 150, height: 150}}
/>
<h1> 33 votes </h1>
<Chip label="Pet Badge" variant="outlined"
sx={{ width: 100, height: 30}}/>
<h1> Favorite Pet: Panda </h1>
</Box>
    </>
  );
}

export default App;