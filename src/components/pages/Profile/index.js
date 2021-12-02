import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from '../../../utils/api.js'
import "./style.css"
import avatarImg from "./../../../images/avatar.jpg"
import { Image } from 'cloudinary-react';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import App from "../../../App.js"


function Profile(props) {

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

            {/* Recieves badge if user submits more than 10 reviews */}
            <span className="uk-badge uk-flex uk-flex-center">PetIt Pro</span>

            {/* Profile nav */}
            <ul className="uk-subnav uk-subnav-divider uk-margin">
                    <li className="uk-active"><a href="#"><span uk-icon="file-text"></span> Reviews</a></li>
                    <li><a href="/petgallery"><span uk-icon="image"></span> Pet Gallery</a></li>
                    <li><a href="#"><span uk-icon="comment"></span> Comments</a></li>
            </ul>
            {/* Populate user reviews */}
            <div   className="uk-child-width-expand@s uk-text-center uk-grid">
            <div>
                <div className="uk-card uk-card-default uk-card-body">Review Here</div>
            </div>
            <div>
                <div className="uk-card uk-card-default uk-card-body">Review Here</div>
            </div>
            <div>
                <div className="uk-card uk-card-default uk-card-body">Review Here</div>
                </div>
            </div>
    </div>
    )
}

export default Profile;
