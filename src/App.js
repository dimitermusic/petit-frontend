import SignupForm from "./components/SignupForm/index.js";
import SearchBar from "./components/SearchBar/index.js";
import Discover from "./pages/Discover/index.js";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import API from "./utils/api";
import Profile from "./pages/Profile/index.js";
import NavBar from "./components/NavBar/index.js";
import { Routes, Route, Link } from "react-router-dom";
const axios = require("axios");


function App() {

  const checkLogin = () => {
    {
      !userState.username ?
        <SignupForm
          submitSignup={handleSignupSubmit}
          submitSignin={handleSigninSubmit}
          change={handleLoginChange}
          loginState={loginFormState} /> : <Profile />
    }
  }

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

  const [loginFormState, setLoginFormState] = useState({
    usernameSignIn: "",
    passwordSignIn: "",
    emailSignUp: "",
    usernameSignUp: "",
    passwordSignUp: ""
  });

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
        submitSignup={handleSignupSubmit}
        submitSignin={handleSigninSubmit}
        change={handleLoginChange}
        loginState={loginFormState} /> : <Profile />)
    
  }

  return (
    <>
      <NavBar />

      <SearchBar
        searchState={searchFormState}
        change={handleSearchChange}
      />
      <Routes>
        {console.log(LoginPage)}
        <Route exact path={"/"} element={<LoginPage/>}/>
      </Routes>
    </>
  );
}

export default App;