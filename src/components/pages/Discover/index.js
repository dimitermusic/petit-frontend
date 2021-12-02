import React, { useEffect, useState } from "react";
import style from "./style.css"
import API from "../../../utils/api";

function Discover() {
    const [places, setPlaces] = useState([])
    
    useEffect(()=>{
        API.getAllPlaces()
        .then(res=>{
            setPlaces(res.data)
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return (
        <div>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Discover</h1>
                <ul className="uk-list uk-list-large uk-list-divider" id='search-results'>
                {places.map(place=>{
                    return (<li key={place.ref_id} id={place.ref_id}><a href={`/results/${place.ref_id}`}>{place.name} at {place.location}</a> {place.isJob==='establishment'?<span className="uk-icon-button">E</span>:<span className="uk-icon-button">J</span>}</li>)
                })}
                </ul>
            </div>
        </div>
    )
}

export default Discover;