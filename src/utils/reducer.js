import { GOOGLE_FETCH, SET_SEARCH, MY_PLACE, MY_DISCOVER, USER } from "./actions";
const initialState=
{
    searchForm:[{
        search:"",
        city:"",
        type:"establishment"
    }],
    googleResults:[],
    myPlace:{},
    discoverResults:{},
    globalUser:{},
    globalVotes:0
};

export default function reducer(state=initialState,action){
    switch (action.type) {
        case GOOGLE_FETCH:
            return{
                ...state,
                googleResults:action.payload
            }
        case MY_PLACE:
            return{
                ...state,
                myPlace:action.payload
            }
        case SET_SEARCH:
            return{
                ...state,
                searchForm:action.payload
            }
        case MY_DISCOVER:
            return{
                ...state,
                discoverResults:action.payload
            }
        case USER:
            const voteNumber = action.payload.Votes.length
            return{
                ...state,
                globalUser:action.payload,
                globalVotes:voteNumber
            }
        default:
            return state;
    }
}