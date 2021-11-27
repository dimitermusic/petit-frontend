import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from "./style.css"


function Profile(props) {

    return (
         <div>
            <h1 className="uk-flex uk-flex-center">My Profile</h1>

        <p class="uk-text-bold uk-text-small uk-flex uk-flex-center ">@username</p>

        <img data-src="images/avatar.jpg" width="1800" height="1200" alt="" uk-img></img>

        {/* Recieves badge if user submits more than 10 reviews */}
        <span class="uk-badge  uk-margin-auto uk-margin-auto">PetIt Pro</span>

        {/* Profile nav */}
         <ul class="uk-subnav uk-subnav-divider" uk-margin>
                <li class="uk-active"><a href="#"><span uk-icon="file-text"></span> Reviews</a></li>
                <li><a href="#"><span uk-icon="image"></span> Pet Gallery</a></li>
                <li><a href="#"><span uk-icon="comment"></span> Comments</a></li>
        </ul>
        {/* Populate user reviews */}
        <div   class="uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
            <div class="uk-card uk-card-default uk-card-body">Review Here</div>
        </div>
        <div>
            <div class="uk-card uk-card-default uk-card-body">Review Here</div>
        </div>
        <div>
            <div class="uk-card uk-card-default uk-card-body">Review Here</div>
            </div>
        </div>
    </div>
    )
}

export default Profile;
