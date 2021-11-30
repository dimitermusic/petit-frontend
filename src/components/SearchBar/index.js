import React, { useState } from "react";
import API from '../../utils/api'
import Results from "../Results";

function SearchBar(props) {
    const [searchFormState, setSearchFormState] = useState({
        search: "",
        city: "",
        type: ""
    })
    const [result, setResult] = useState([]);

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
            })
        }
    }

    const apiFetch = (e)=>{
        e.preventDefault();
        API.apiFetch({
          name:searchFormState.search, 
          city:searchFormState.city
        })
          .then(res=>{
            setResult(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
    }
    
    return (
        <>
            <div className="uk-flex uk-flex-center uk-margin">
                <form className="uk-flex-inline uk-search">
                    <input name="search" id="estName" className="uk-search-input" type="search" value={searchFormState.search} onChange={handleSearchChange} placeholder="Name" />
                    <input name="city" id="city" className="uk-search-input" type="search" value={searchFormState.city} onChange={handleSearchChange} placeholder="City" />
                    <select className="uk-select" id="form-stacked-select" value={searchFormState.type} onChange={handleSearchChange}>
                        <option>Establishment</option>
                        <option>Job</option>
                    </select>
                </form>
                    <button className="uk-button uk-button-default" onClick={apiFetch}>Button</button>
            </div>
            <Results places={result}/>
        </>
    )
}

export default SearchBar;