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
      />
      <Routes>
        {console.log(LoginPage)}
        <Route exact path={"/"} element={<LoginPage/>}/>
        <Route exact path={"/logout"} element={<LoginPage/>}/>
      </Routes>
    </>
  );
}

export default App;