import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./style.css"
import avatarImg from "./../../../images/avatar.jpg"
import { Routes, Route, Link, Navigate } from "react-router-dom";


function Profile(props) {

if(!props.username){
    <Navigate to="/logout"/>
}

    return (
         <div>
            <h1 className="uk-flex uk-flex-center">My Profile</h1>

        <p className="uk-text-bold uk-text-small uk-flex uk-flex-center ">@{props.username}</p>

        <img src={avatarImg} width="200" alt="avatar" className="uk-img uk-placeholder uk-align-center"></img>

                <p uk-margin="true">
            <button className="uk-button uk-button-default uk-button-small uk-align-center"><span uk-icon="upload"></span>
            Upload</button>
            </p>

            {/* Recieves badge if user submits more than 10 reviews */}
            <span className="uk-badge uk-flex uk-flex-center">PetIt Pro</span>

            {/* Profile nav */}
            <ul className="uk-subnav uk-subnav-divider uk-margin">
                    <li className="uk-active"><a href="#"><span uk-icon="file-text"></span> Comments</a></li>
                    <li><a href="#"><span uk-icon="image"></span> Pet Gallery</a></li>
                    <li><a href="#"><span uk-icon="comment"></span> Reviews</a></li>
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
