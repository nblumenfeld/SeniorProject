import {
    BOOK_UPDATE,
    BOOK_CREATE,
    BOOKS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    title:'',
    author:'',
    edition:'',
    condition:'',
    price:'',
    picture:'',
    notes:''
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case BOOK_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case BOOK_CREATE:
            return INITIAL_STATE;
        default:
         return state;
    }
};