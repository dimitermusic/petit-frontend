import React, {useReducer, useState} from "react";
import API from '../../utils/api'
import { SET_SEARCH } from "../../utils/actions";
import { useSelector,useDispatch } from "react-redux";

function SearchBar(props) {
    const [searchFormState, setSearchFormState] = useState({
        search: "",
        city: "",
        type: "establishment"
    })
    const dispatch = useDispatch();
    const searchForm = useSelector(state => state.searchFormState);

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
                ...searchForm,
                type: event.target.value
            });
        }
    }

    const searchDispatch = (e) => {
        e.preventDefault();
        dispatch({
            type:SET_SEARCH,
            payload:searchFormState
        })
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
                <button className="uk-button uk-button-default" onClick={searchDispatch}>Button</button>
            </div>
        </>
    )
}

export default SearchBar;