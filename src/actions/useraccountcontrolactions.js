import {
    SAVE_PASS_KEY,
    CLEAR_PASS_KEY,
    SET_LOGGED_IN_STATUS
} from './types';

export const fetchPosts = () => dispatch => {
    // Fetch
    dispatch({
        type: FETCH_POST,
        payload: { 'A': 123123 }
    });
}