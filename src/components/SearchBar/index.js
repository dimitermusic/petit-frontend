import React, { useState } from "react";
import PropTypes from 'prop-types';

function SearchBar(props) {
    return (
        <>
            <div className="uk-flex uk-flex-center uk-margin">
                <form className="uk-flex-inline uk-search">
                    <input name="search" id="estName" className="uk-search-input" type="search" value={props.searchState.search} onChange={props.change} placeholder="Name" />
                    <input name="city" id="city" className="uk-search-input" type="search" value={props.searchState.city} onChange={props.change} placeholder="City" />
                    <select className="uk-select" id="form-stacked-select" value={props.searchState.type} onChange={props.change}>
                        <option>Establishment</option>
                        <option>Job</option>
                    </select>
                </form>
                    <button className="uk-button uk-button-default" onClick={props.estSearch}>Button</button>
            </div>
        </>
    )
}

export default SearchBar;