import axios from 'src/utils/axios';

export const FETCH_ALL_GOLD = '@gold/fetch-all-gold';

export function fetchAllGold() {
    const request = axios.get('/api/gold/all');

    return (dispatch) => {
        request.then((response) => dispatch({
            type: FETCH_ALL_GOLD,
            payload: response.data
        }));
    };
}