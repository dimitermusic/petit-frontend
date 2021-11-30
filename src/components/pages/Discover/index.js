import React, { useState } from "react";
import style from "./style.css"
import API from "../../../utils/api";

function Discover(props) {
    const [places, setPlaces] = useState([])

    const randomPlaces = (e) =>{
        e.preventDefault();
        API.getAllPlaces()
        .then(data=>{
            setPlaces(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            
        </div>
    )
}

export default Discover;