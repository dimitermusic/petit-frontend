import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignupForm from "./components/SignupForm/index.js";
import SearchBar from "./components/SearchBar/index.js";
import Discover from "./components/pages/Discover/index.js";
import API from "./utils/api";
import Profile from "./components/pages/Profile/index.js";
import NavBar from "./components/NavBar/index.js";
import Results from "./components/Results/index.js";
import PetGallery from "./pages/PetGallery/index.js";
import UploadPets from "./pages/UploadPets/index.js";
import Place from "./components/pages/Place/index.js";
import DiscoverPlace from "./components/DiscoverPlace/index.js"
import { USER } from "./utils/actions.js";
import "./style.css"

function App() {
  const [userState, setUserState] = useState({ username: "", id: 0 })
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const myToken = localStorage.getItem("token")
    console.log("successfully used")
    if (myToken) {
      console.log("oh hi there")
      API.getProfile(myToken)
        .then(res => {
          console.log("successfully obtained token!")
          setToken(myToken)
          setUserState(res.data)
          dispatch({
            type: USER,
            payload: res.data
          })
        }).catch(err => {
          console.log("whoops")
          console.log(err)
        })
    }
  }, [])

  const Logout = () => {
    setUserState({ username: "", id: 0 });
    setToken("");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  function LoginPage() {
    return (userState.username ?
      <Navigate to="/profile" /> :
      <SignupForm
        setUserState={setUserState}
        setToken={setToken} />
    )
  }

  return (
    <div className="page">
      <NavBar
        userState={userState} />
      <SearchBar />
      <Routes>
        <Route exact path={"/results"} element={<Results />} />
        <Route exact path={"/discover"} element={<Discover />} />
        <Route exact path={"/discover/:ref_id"} element={<DiscoverPlace />} />
        <Route exact path={"/login"} element={<LoginPage />} />
        <Route exact path={`/profile`} element={<Profile
          user={userState} token={token} setUserState={setUserState} />} />
        <Route exact path={"/"} element={<LoginPage />} />
        <Route exact path={"/logout"} element={<Logout />} />
        <Route exact path={`/place/:ref_id`} element={<Place />} />
        <Route exact path={"/petgallery"} element={<PetGallery />} />
        <Route exact path={"/uploadpets"} element={<UploadPets />} />
      </Routes>
    </div>
  );
}

export default App;