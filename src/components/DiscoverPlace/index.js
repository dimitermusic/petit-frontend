import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import API from "../../utils/api";

function DiscoverPlace() {
    const { ref_id } = useParams();
    const discoverResults = useSelector(state => state.discoverResults)
    const tkn = localStorage.getItem("token");
    const [review, setReview] = useState({});

    useEffect(()=>{
        const discover = discoverResults.filter(result => result.ref_id===ref_id)
        console.log(discover);
        API.getOnePlace({
            name:discover[0].name,
            isJob:discover[0].isJob,
            location:discover[0].location
        },tkn,ref_id)
        .then(res=>{
            setReview(res.data);
            console.log(review);
        })
    },[]);

    return(
        <>
            <h1>hellooooooo</h1>
        </>
    )
}

export default DiscoverPlace;