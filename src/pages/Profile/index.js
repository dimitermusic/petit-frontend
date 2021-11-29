import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./style.css"
import avatarImg from "../../images/avatar.jpg"
import App from "../../App"

function Profile(props) {

if(!props.username){
    return <App/>
}

    return (
         <div>
            <h1 className="uk-flex uk-flex-center">My Profile</h1>

        <p className="uk-text-bold uk-text-small uk-flex uk-flex-center ">@{props.username}</p>

        <img src={avatarImg} width="200" alt="I feel pretty, oh so pretty. I feel pretty and witty and GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY" className="uk-img"></img>

        {/* Recieves badge if user submits more than 10 reviews */}
        <span className="uk-badge uk-margin-auto uk-margin-auto">PetIt Pro</span>

        {/* Profile nav */}
         <ul className="uk-subnav uk-subnav-divider uk-margin">
                <li className="uk-active"><a href="#"><span uk-icon="file-text"></span> Reviews</a></li>
                <li><a href="#"><span uk-icon="image"></span> Pet Gallery</a></li>
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
