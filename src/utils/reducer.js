// state for google { reference, name, formatted_address }
// state for db { ref_id, name, address, id, isJob }
import { GOOGLE_FETCH, DB_FETCH, SET_SEARCH } from "./actions";
const initialState=
{
    searchForm:[
        {
            search:"",
            city:"",
            type:"establishment"
        }        
    ],
    googleResults:[],
    dbResults:[]
};

export default function reducer(state=initialState,action){
    switch (action.type) {
        case GOOGLE_FETCH:
            return{

            }

        case DB_FETCH:
            return{

            }
        
        case SET_SEARCH:
            return{

            }
            
        default:
            return state;
    }
}