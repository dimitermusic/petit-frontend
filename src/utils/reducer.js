// state for google { reference, name, formatted_address }
// state for db { ref_id, name, address, id, isJob }
import { GOOGLE_FETCH, DB_FETCH, SET_SEARCH } from "./actions";
import API from "./api";
const initialState=
{
    searchForm:[{
        search:"",
        city:"",
        type:"establishment"
    }],
    googleResults:[],
    dbResults:[]
};

export default function reducer(state=initialState,action){
    switch (action.type) {
        case GOOGLE_FETCH:
            API.apiFetch({
                name:state.searchForm.search,
                city:state.searchForm.city
            })
            .then(res=>{
                return{
                    ...state,
                    googleResults:res.data
                }
            })
            .catch(err => {
                console.log(err);
            })

        case DB_FETCH:
            return{

            }
        
        case SET_SEARCH:
            console.log(state.searchForm);
            console.log('hi');
            return{
                ...state,
                searchForm:action.payload
            }
            
        default:
            return state;
    }
}