import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import style from "./style.css"
import API from "../../../utils/api";

function Place(props) {
    // useEffect(()=>{
    //     API.getOnePlace
    // })

    return (
        <div>
            <div class="uk-card uk-card-body uk-flex uk-flex-center uk-margin">
                <div class="uk-card-badge uk-label"></div>
            </div>
        </div>
    )
}

export default Place;