import React, { useState } from "react";
import PropTypes from 'prop-types';
import { getThemeProps } from "@mui/system";

function SearchBar(props) {

    return (
        <div>
            <div class="uk-flex uk-flex-center uk-margin">
                <form class="uk-search uk-search-default">
                    <a href="" class="uk-search-icon-flip" uk-search-icon></a>
                    <input name="search" class="uk-search-input" type="search" value={props.searchState.search} onChange placeholder="Search"/>
                    <button class="uk-button uk-button-default">Button</button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;