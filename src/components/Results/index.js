import React, {useState, useReducer, useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { GOOGLE_FETCH } from "../../utils/actions";
import API from "../../utils/api";

function Results(props){
    const dispatch = useDispatch();
    const googleResults = useSelector(state => state.googleResults);

    useEffect(()=>{
        const mySearch = localStorage.getItem("search")
        const apiSearch = JSON.parse(mySearch);
        API.apiFetch({
            name:apiSearch.search,
            city:apiSearch.city
        })
        .then(res=>{
            dispatch(({
                type:GOOGLE_FETCH,
                payload:res.data
            }))
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return(
        <>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Search Results</h1>
                <ul className="uk-list uk-list-large uk-list-divider uk-list-striped" id='search-results'>
                    {googleResults.map(place=>{
                        return (<li key={place.reference} id={place.reference}><a href={`/place`}>{place.name} at {place.formatted_address}</a> <span>{props.type}</span></li>)
                    })}
                </ul>
            </div>
        </>
    )
}

export default Results;