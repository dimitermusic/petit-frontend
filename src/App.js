import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ReactDOM from "react-dom";
import SignupForm from "./components/SignupForm/index.js";
import SearchBar from "./components/SearchBar/index.js";
import Discover from "./pages/Discover/index.js";
import API from "./utils/api";
import Profile from "./pages/Profile/index.js";
import NavBar from "./components/NavBar/index.js";
import Results from "./components/Results/index";
const axios = require("axios");

function App() {

  const [userState, setUserState] = useState({
    username: "",
    id: 0
  })

  const [token, setToken] = useState("");

  useEffect(() => {
    const myToken = localStorage.getItem("token")
    console.log("successfully used")
    console.log(myToken)

    if (myToken) {
      console.log("oh hi there")
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

  const Logout = () => {
    setUserState({ username: "", id: 0 })
    setToken("")
    localStorage.removeItem("token")
    window.location="http://localhost:3000/login"
  }

  function LoginPage() {
     return (userState.username ?
      <Navigate to="/profile"/>:<SignupForm 
        setUserState={setUserState}
        setToken={setToken}/>)
  }

  return (
    <>
      <NavBar 
        id={userState.id}/>

      <SearchBar />
      
      <Results />
  
      <Routes>
        {console.log(LoginPage)}

        <Route exact path={"/search"} element={<Results/>}/>
        <Route exact path={"/discover"} element={<Discover/>}/>
        <Route exact path={"/login"} element={<LoginPage/>}/>
        <Route exact path={`/profile`} element={<Profile 
          username={userState.username}/>}/>
        <Route exact path={"/"} element={<LoginPage/>}/>
        <Route exact path={"/logout"} element={<Logout/>}/>
      </Routes>
    </>
  );
}

export default App;