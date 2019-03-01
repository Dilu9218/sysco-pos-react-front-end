import { FETCH_POST, NEW_POST } from './types';

export const fetchPosts = () => dispatch => {
    // Fetch
    dispatch({
        type: FETCH_POST,
        payload: { 'A': 123123 }
    });
}