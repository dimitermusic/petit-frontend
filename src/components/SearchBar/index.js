import React from "react";
import API from '../../utils/api'
import Results from "../Results";
import {useSelector,useDispatch} from "react-redux";

function SearchBar(props) {
    // const [searchFormState, setSearchFormState] = useState({
    //     search: "",
    //     city: "",
    //     type: "establishment"
    // })
    // const [result, setResult] = useState([]);
    const dispatch = useDispatch();
    const searchForm = useSelector(state => state.searchForm)

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

    const apiFetch = (e) => {
        e.preventDefault();
        API.apiFetch({
            name: searchFormState.search,
            city: searchFormState.city
        })
            .then(res => {
                setResult(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="uk-flex uk-flex-center uk-margin">
                <form className="uk-flex-inline uk-search">
                    <input name="search" id="estName" className="uk-search-input" type="search" value={searchForm.search} onChange={handleSearchChange} placeholder="Name" />
                    <input name="city" id="city" className="uk-search-input" type="search" value={searchForm.city} onChange={handleSearchChange} placeholder="City" />
                    <select className="uk-select" id="form-stacked-select" name="type" value={searchForm.type} onChange={handleSearchChange}>
                        <option value='establishment'>Establishment</option>
                        <option value='job'>Job</option>
                    </select>
                </form>
                <button className="uk-button uk-button-default" onClick={apiFetch}>Button</button>
            </div>
            {/* <Results places={result} type={searchFormState.type} /> */}
        </>
    )
}

export default SearchBar;