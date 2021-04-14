import axios from 'src/utils/axios';

export const FETCH_ALL_STOCK = '@stock/fetch-all-stock';
export const FETCH_SINGLE_STOCK = '@stock/fetch-single-stock';

export function fetchAllStock() {
    const request = axios.get('/api/stock/all');

    return (dispatch) => {
        request.then((response) => dispatch({
            type: FETCH_ALL_STOCK,
            payload: response.data
        }));
    };
}

export function fetchSingleStock(id) {
    return (dispatch) => dispatch({
        type: FETCH_SINGLE_STOCK,
        payload: {
            id
        }
    });
}