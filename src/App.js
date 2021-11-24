import SignupForm from "./components/SignupForm/index.js"
import Profile from "./pages/Profile"
import React from "react";
import ReactDOM from "react-dom";
import Avatar from "@mui/material/Avatar"
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';



function App() {
  return (
    <>
      <SignupForm/>


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
