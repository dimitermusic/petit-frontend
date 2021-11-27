import React, { useState } from "react";
import PropTypes from 'prop-types';
import { getThemeProps } from "@mui/system";

function SearchBar(props) {

    return (
        <>
            <div class="uk-flex uk-flex-center uk-margin">
                <form class="uk-flex-inline uk-search">
                    <input name="search" class="uk-search-input" type="search" value={props.searchState.search} onChange placeholder="Name" />
                    <input name="search" class="uk-search-input" type="search" value={props.searchState.search} onChange placeholder="City" />
                    <select class="uk-select" id="form-stacked-select">
                        <option>Establishment</option>
                        <option>Job</option>
                    </select>
                </form>
                    <button class="uk-button uk-button-default">Button</button>
            </div>
        </>
    )
}

export default SearchBar;