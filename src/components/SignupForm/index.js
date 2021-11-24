import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from "./style.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

function SignupForm(props) {

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
                onSubmit={props.submit}
            >
        
                <TextField  
                    label="Username"
                    value={props.loginState.usernameSignIn}
                    name="usernameSignIn"
                    onChange={props.change}
                    margin="dense" 
                    variant="outlined" />

                <TextField 
                    type="password" 
                    value={props.loginState.passwordSignIn} 
                    name="passwordSignIn"
                    onChange={props.change}
                    margin="dense" 
                    label="Password" 
                    variant="outlined" />
                
                <Button 
                    variant="contained"
                    >
                    Sign In
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
                        value={props.loginState.emailSignUp}
                        name="emailSignUp"
                        onChange={props.change}
                        margin="dense" 
                        variant="outlined" />

                    <TextField  
                        label="Username"
                        value={props.loginState.usernameSignUp}
                        name="usernameSignUp"
                        onChange={props.change} 
                        margin="dense" 
                        variant="outlined" />

                    <TextField 
                        type="password"
                        value={props.loginState.passwordSignUp}
                        name="passwordSignUp"
                        onChange={props.change}  
                        margin="dense" 
                        label="Password" 
                        variant="outlined" />
                
                    <Button variant="contained">Sign Up</Button>
            </Box>

        </div>
    )
}

export default SignupForm;