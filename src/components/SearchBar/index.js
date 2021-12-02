import React, { useState} from "react";
import { SET_SEARCH } from "../../utils/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const navigate = useNavigate();
    const [searchFormState, setSearchFormState] = useState({
        search: "",
        city: "",
        type: "establishment"
    })
    const dispatch = useDispatch();

    const handleSearchChange = event => {
        if (event.target.name === "search") {
            setSearchFormState({
                ...searchFormState,
                search: event.target.value
            })
        } else if (event.target.name === "city") {
            setSearchFormState({
                ...searchFormState,
                city: event.target.value
            })
        } else {
            setSearchFormState({
                ...searchFormState,
                type: event.target.value
            });
        }
    }

    const searchDispatch = (e) => {
        e.stopPropagation();
        dispatch({
            type:SET_SEARCH,
            payload:searchFormState
        });
        navigate('/results');
    }

    return (
        <>
            <div className="uk-flex uk-flex-center uk-margin">
                <form className="uk-flex-inline uk-search">
                    <input name="search" id="estName" className="uk-search-input" type="search" value={searchFormState.search} onChange={handleSearchChange} placeholder="Name" />
                    <input name="city" id="city" className="uk-search-input" type="search" value={searchFormState.city} onChange={handleSearchChange} placeholder="City" />
                    <select className="uk-select" id="form-stacked-select" name="type" value={searchFormState.type} onChange={handleSearchChange}>
                        <option value='establishment'>Establishment</option>
                        <option value='job'>Job</option>
                    </select>
                </form>
                <button className="uk-button uk-button-default" onClick={searchDispatch}>Search</button>
            </div>
        </>
    )
}

export default SearchBar;