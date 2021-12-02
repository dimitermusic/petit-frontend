<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
=======
import React, { useState } from "react";
>>>>>>> dev
import API from '../../../utils/api.js'
import "./style.css"
import avatarImg from "./../../../images/avatar.jpg"
import { Image } from 'cloudinary-react';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import './style.css'

function Profile(props) {

<<<<<<< HEAD
if(!props.username){
    <Navigate to="/logout"/>
}
const [imageIds, setImageIds] = useState();
    // const uploadPetsButton = () => {
    //     <Navigate to="/uploadpets"/>
    // }
    const loadImages = async () => {
        try {
            const res = await fetch('/api/uploadpets');
            const data = await res.json();
            console.log(data)
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadImages();
    }, []);

    return (
         <div>
            <h1 className="uk-flex uk-flex-center">My Profile</h1>

        <p className="uk-text-bold uk-text-small uk-flex uk-flex-center ">@{props.username}</p>

        <p className="uk-text-bold uk-text-small uk-flex uk-flex-center ">Votes: 33{props.votes}</p>

        <img src={avatarImg} width="200" alt="avatar" className="uk-img uk-placeholder uk-align-center">     
        </img>
                <p uk-margin="true">
            <a href="/uploadprof"><button className="uk-button uk-button-default uk-button-small uk-align-center"><span uk-icon="upload"></span>
            Upload</button></a>
            </p>

=======
    if (!props.username) {
        <Navigate to="/logout" />
    }

    // const petGalleryButton = () => {
    //     <Navigate to="/petgallery"/>
    // }

    return (
        <div>
            <h3 className="uk-text-bold uk-flex uk-flex-center welcome">Welcome @{props.username}!</h3>
>>>>>>> dev
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
