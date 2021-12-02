import React, {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GOOGLE_FETCH } from "../../utils/actions";
import API from "../../utils/api";

function Results(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchForm = useSelector(state => state.searchForm);
    const googleResults = useSelector(state => state.googleResults);

    useEffect(()=>{
        if(searchForm.search!==undefined){
            API.apiFetch({
                name:searchForm.search,
                city:searchForm.city
            })
            .then(res=>{
                dispatch(({
                    type:GOOGLE_FETCH,
                    payload:res.data
                }));
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[searchForm])

    return(
        <>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Search Results</h1>
                <ul className="uk-list uk-list-large uk-list-divider uk-list-striped" id='search-results'>
                    {googleResults.map(place=>{
                        return (
                            <li 
                                key={place.reference} 
                                id={place.reference}>
                                   {place.name} at {place.formatted_address} 
                                <span>
                                    {searchForm.type}
                                </span>
                                <button id={place.reference} onClick={()=>navigate(`/place/${place.reference}`)}>Leave a review</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Results;