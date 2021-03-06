import {
    BOOK_INITIALIZE,
    BOOK_UPDATE,
    BOOK_CREATE,
    BOOK_SAVE_SUCCESS,
    BOOKS_FETCH_SUCCESS,
    BOOK_DELETE_SUCCESS,
    CREATING_BOOK
} from '../actions/types';

const INITIAL_STATE = {
    title:'',
    author:'',
    edition:'',
    courseId:'',
    condition:'',
    price:'',
    picture:'',
    notes:'',
    email:'',
    loading:false
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case CREATING_BOOK:
            return {...state, loading:true}
        case BOOK_INITIALIZE:
            return INITIAL_STATE;
        case BOOK_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case BOOK_CREATE:
            return INITIAL_STATE;
        case BOOK_SAVE_SUCCESS:
            return INITIAL_STATE;
        case BOOK_DELETE_SUCCESS:
            return INITIAL_STATE;
        default:
         return state;
    }
};