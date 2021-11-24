import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from "./style.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

function SignupForm() {

    const [usernameSignIn, setUsernameSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [PasswordSignUp, setPasswordSignUp] = useState('');

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        console.log(name)
        if (name === "usernameSignIn"){
            return setUsernameSignIn(e.target.value)
        }
        if (name === "passwordSignIn"){
            return setPasswordSignIn(value)
        }
        if (name === "usernameSignUp"){
            return setUsernameSignUp(value)
        }
        if (name === "emailSignUp"){
            return setEmailSignUp(value)
        }
        return setPasswordSignUp(value)
    }

    return (
        <div >
            <h1>Sign In</h1>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
        
                <TextField  
                    label="Username"
                    value={usernameSignIn}
                    name="usernameSignIn"
                    onChange={handleInputChange}
                    margin="dense" 
                    variant="outlined" />

                <TextField 
                    type="password" 
                    value={passwordSignIn} 
                    name="passwordSignIn"
                    onChange={handleInputChange}
                    margin="dense" 
                    label="Password" 
                    variant="outlined" />
                
                <Button 
                    variant="contained"
                    >
                    Sign Up
                </Button>

            </Box>

            <h1>Sign Up</h1>

            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex-box",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >

                    <TextField  
                        label="Email" 
                        value={emailSignUp}
                        name="emailSignUp"
                        onChange={handleInputChange}
                        margin="dense" 
                        variant="outlined" />

                    <TextField  
                        label="Username"
                        value={usernameSignUp}
                        name="usernameSignUp"
                        onChange={handleInputChange} 
                        margin="dense" 
                        variant="outlined" />

                    <TextField 
                        type="password"
                        value={PasswordSignUp}
                        name="passwordSignUp"
                        onChange={handleInputChange}  
                        margin="dense" 
                        label="Password" 
                        variant="outlined" />
                
                    <Button variant="contained">Sign In</Button>
            </Box>

        </div>
    )
}

export default SignupForm;