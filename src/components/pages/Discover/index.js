import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./style.css"
import API from "../../../utils/api";
import { MY_DISCOVER } from "../../../utils/actions";

function Discover() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        API.getAllPlaces()
            .then(res => {
                setPlaces(res.data)
                dispatch({
                    type: MY_DISCOVER,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Discover</h1>
                <ul className="uk-list uk-list-large uk-list-divider uk-list-striped" id='search-results'>
                    {places.map(place => {
                        const newLocation = place.location.split(",").slice(0, -2).join(",");
                        return (
                            <li
                                className="search-result"
                                key={place.ref_id}
                                id={place.ref_id}
                                onClick={() =>
                                    localStorage.token ? navigate(`/discover/${place.ref_id}`) : alert("Please Log In or Create an Account First!")}>
                                {place.name} at {newLocation}
                                <span className="uk-margin-small-left uk-margin-small-right">
                                    {place.isJob === "establishment" ?
                                        <span className="uk-button">Establishment</span>
                                        :
                                        <span className="uk-button">Job</span>}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Discover;