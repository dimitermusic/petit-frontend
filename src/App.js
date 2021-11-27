import SignupForm from "./components/SignupForm/index.js";
import SearchBar from "./components/SearchBar/index.js";
import Discover from "./pages/Discover/index.js";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import API from "./utils/api";
const axios = require("axios");

function App() {

  const [userState,setUserState]= useState({
    username:"",
    id:0
  })
  
  const [token, setToken] = useState("")

  const [searchFormState, setSearchFormState] = useState({
    search: "",
    city:"",
    type:""
  })

  const [loginFormState, setLoginFormState] = useState ({
    usernameSignIn:"",
    passwordSignIn:"",
    emailSignUp:"",
    usernameSignUp:"",
    passwordSignUp:""
  });

  useEffect(()=>{
    const myToken = localStorage.getItem("token")
    console.log("successfully used")
    console.log(myToken)

    if(myToken){
      API.getProfile(myToken)
      .then(res=>{
        console.log("successfully obtained token!")
        setToken(myToken)
        setUserState({
          username: res.data.username,
          id: res.data.id
        })
      }).catch(err=>{
        console.log("whoops")
        console.log(err)
        localStorage.removeItem("token")
      })
    }
  },[])

  const handleSearchChange= event =>{
    console.log(event.target.value)
  if(event.target.name === "search"){
    setSearchFormState({
      ...searchFormState,
      search: event.target.value
    })
  } else if (event.target.name === "city") {
      setSearchFormState({
          ...searchFormState,
          city: event.target.value
      })
  } else {
      setSearchFormState({
          ...searchFormState,
          type: event.target.value  
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
    API.login({
      username: loginFormState.usernameSignIn,
      password: loginFormState.passwordSignIn
    })
    .then(res=>{
      console.log(res.data)
      setUserState({
        username: res.data.user.username,
        id: res.data.user.id
      })
      setToken(res.data.token)
      localStorage.setItem("token", res.data.token)
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleSignupSubmit = event=>{
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
  }

  return (
    <>      
  <h1>==========SearchBar==========</h1>
    <SearchBar
        searchState={searchFormState}
        change={handleSearchChange}
        />
        
  <h1>==========Login==========</h1>
      <SignupForm 
        submitSignup={handleSignupSubmit} 
        submitSignin={handleSigninSubmit} 
        change={handleLoginChange} 
        loginState={loginFormState}/>

  <h1>==========Discover==========</h1>
      <Discover/>

    </>
  );
}

export default App;