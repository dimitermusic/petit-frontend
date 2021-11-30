import React, { useState } from "react";

function Results(props){
    return(
        <>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Search Results</h1>
                <ul className="uk-list uk-list-large uk-list-divider uk-list-striped" id='search-results'>
                    {props.places.map(place=>{
                        return <li key={place.reference} id={place.reference}><a>{place.name} at {place.formatted_address}</a></li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default Results;