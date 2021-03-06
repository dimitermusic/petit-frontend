import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GOOGLE_FETCH } from "../../utils/actions";
import API from "../../utils/api";
import './style.css'

function Results() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchForm = useSelector(state => state.searchForm);
    const googleResults = useSelector(state => state.googleResults);

    useEffect(() => {
        console.log("api");
        if (searchForm.search !== undefined) {
            console.log('this is after the seearch');
            API.apiFetch({
                name: searchForm.search,
                city: searchForm.city
            })
                .then(res => {
                    console.log(res);
                    dispatch({
                        type: GOOGLE_FETCH,
                        payload: res.data
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [searchForm])

    return (
        <>
            <div className="uk-container uk-width-4-5 results">
                <h1 className="uk-heading-divider uk-text-center">Search Results</h1>
                <ul className="uk-list uk-list-large uk-list-divider uk-list-striped" id='search-results'>
                    {googleResults.map(place => {
                        const newLocation = place.formatted_address.split(",").slice(0, -2).join(",");
                        return (
                            <li
                                className="search-result"
                                key={place.reference}
                                id={place.reference}
                                onClick={() => localStorage.token ? navigate(`/place/${place.reference}`) : alert("Please Login or Create an Account First!")}>
                                {place.name} at {newLocation}
                                <span className="uk-margin-small-left uk-margin-small-right">
                                    {searchForm.type === "establishment" ?
                                        <span>as Establishment</span>
                                        :
                                        <span>as Job</span>}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Results;