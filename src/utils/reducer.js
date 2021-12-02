import { GOOGLE_FETCH, SET_SEARCH } from "./actions";
const initialState=
{
    searchForm:[{
        search:"",
        city:"",
        type:"establishment"
    }],
    googleResults:[],
};

export default function reducer(state=initialState,action){
    switch (action.type) {
        case GOOGLE_FETCH:
            return{
                ...state,
                googleResults:action.payload
            }
        case SET_SEARCH:
            return{
                ...state,
                searchForm:action.payload
            }
        default:
            return state;
    }
}