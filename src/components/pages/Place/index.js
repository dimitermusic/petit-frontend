import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import style from "./style.css"
import API from "../../../utils/api";

function Place(props) {
    const dispatch = useDispatch();
    const { ref_id } = useParams();
    const type = JSON.parse(localStorage.getItem(("type")))
    console.log(type);
    // const tkn = localStorage.getItem("token")

    

    // const petFriendly = ()=>{
    //     if (a > b){
    //         return "Yes"
    //     } else return "No"
    // }

    return (
        <div className="uk-margin-large-left uk-margin-large-right">
            <div className="uk-flex">
                <div className="uk-margin-large-right">Wendys</div>
                <div className="uk-margin-large-right">at</div>
                <div className="uk-margin-large-right">500 N 1000 W</div>
                <span className="uk-badge">{type}</span>
            </div>

            <hr />
            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Friendly:</p>
                <div>Yes</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Menu:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div>👍</div>
                <div className="uk-margin-large-right">500</div>
                
                <div className="uk-margin-small-right">No</div>
                <div>👎</div>
                <div>12</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Ok to Bring In:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div>👍</div>
                <div className="uk-margin-large-right">500</div>
                
                <div className="uk-margin-small-right">No</div>
                <div>👎</div>
                <div>12</div>
            </div>
            <a className="uk-button uk-button-default" href="#">See on Google</a>

            <hr />

            <div>
                <p>Comments:</p>
            </div>
            
            <form>
                <textarea className="uk-textarea"></textarea>
                <a className="uk-button uk-button-default">Comment</a>
            </form>

        </div>
    )
}

export default Place;