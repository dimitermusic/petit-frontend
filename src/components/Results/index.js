import React, { useState } from "react";
import PropTypes from 'prop-types';

function Results(props){
    return(
        <>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Search Results</h1>
                <ul className="uk-list uk-list-large uk-list-divider uk-list-striped" id='search-results'>
                </ul>
            </div>
        </>
    )
}

export default Results;