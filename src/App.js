import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import SignupForm from "./components/SignupForm/index.js";
import SearchBar from "./components/SearchBar/index.js";
import Discover from "./pages/Discover/index.js";
import API from "./utils/api";
import Profile from "./pages/Profile/index.js";
import NavBar from "./components/NavBar/index.js";
import Results from "./components/Results/index";
require('dotenv').config();
const axios = require("axios");


function App() {

  const [userState, setUserState] = useState({
    username: "",
    id: 0
  })

  const [token, setToken] = useState("")

  const [searchFormState, setSearchFormState] = useState({
    search: "",
    city: "",
    type: ""
  })

  useEffect(() => {
    const myToken = localStorage.getItem("token")
    console.log("successfully used")
    console.log(myToken)

    if (myToken) {
      API.getProfile(myToken)
        .then(res => {
          console.log("successfully obtained token!")
          setToken(myToken)
          setUserState({
            username: res.data.username,
            id: res.data.id
          })
        }).catch(err => {
          console.log("whoops")
          console.log(err)
          localStorage.removeItem("token")
        })
    }
  }, [])

  const handleSearchChange = event => {
    console.log(event.target.value)
    if (event.target.name === "search") {
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

  const apiFetch = (e)=>{
    e.preventDefault();
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchFormState.search}%20in%20${searchFormState.city}&key=${process.env.REACT_APP_API_KEY}`)
      .then(res=>{
        console.log(res.results);
        
      })
  }

  const handleLoginChange = event=>{
    if(event.target.name==="usernameSignIn"){
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
        setUserState({
          username: res.data.username,
          id: res.data.id
        })
        setToken(res.data.token)
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
        setUserState({
          username: res.data.username,
          id: res.data.id
        })
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token)
      }).catch(err => {
        console.log(err);
      })
  }

  const logOut = () => {
    setUserState({ username: "", id: 0 })
    setToken("")
    localStorage.removeItem("token")
  }

  function LoginPage() {
     return (!userState.username ?
      <SignupForm 
        setUserState={setUserState}
        setToken={setToken}/> : <Profile />)
    
  }

  return (
    <>
      <NavBar />

      <SearchBar
        searchState={searchFormState}
        change={handleSearchChange}
        estSearch={apiFetch}
      />
      
      <Results />
  
  {!userState.username?
  // <h1>==========Login==========</h1>
      <SignupForm 
        submitSignup={handleSignupSubmit} 
        submitSignin={handleSigninSubmit} 
        change={handleLoginChange} 
        loginState={loginFormState}/>:<Profile/>}

  {/* // <h1>==========Discover==========</h1> */}
  {/* //     <Discover/> */}

  {/* // :<h1>==========Profile==========</h1> */}
 
  {/* // <h1>==========Edit Profile==========</h1> */}
      <Routes>
        {console.log(LoginPage)}
        <Route exact path={"/"} element={<LoginPage/>}/>
      </Routes>
    </>
  );
}

export default App;