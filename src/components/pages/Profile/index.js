import React, { useState } from "react";
import API from '../../../utils/api.js'
import style from "./style.css"
import avatarImg from "./../../../images/avatar.jpg"
import { Routes, Route, Link, Navigate } from "react-router-dom";
import './style.css'

function Profile(props) {

    if (!props.username) {
        <Navigate to="/logout" />
    }

    // const petGalleryButton = () => {
    //     <Navigate to="/petgallery"/>
    // }

    return (
        <div>
            <h3 className="uk-text-bold uk-flex uk-flex-center welcome">Welcome @{props.username}!</h3>
            {/* Recieves badge if user submits more than 10 reviews */}
            <span className="uk-badge uk-flex uk-flex-center badge">PetIt Puppy</span>
            <img src={avatarImg} width="200" alt="avatar" className="uk-img uk-placeholder uk-align-center"></img>
            <p uk-margin="true">
                <button className="uk-button uk-button-default uk-button-small uk-align-center"><span uk-icon="upload"></span>
                    Upload</button>
            </p>
            <p className="uk-text-bold uk-text-small uk-flex uk-flex-center ">Votes:{props.votes}</p>
        </div>
    )
}

export default Profile;
