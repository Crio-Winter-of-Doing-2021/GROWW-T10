import axios from 'src/utils/axios';

export const FETCH_ALL_US_STOCK = '@us-stock/fetch-all-us-stock';
export const FETCH_SINGLE_US_STOCK = '@us-stock/fetch-single-us-stock';

export function fetchAllUSStock() {
    const request = axios.get('/api/us_stock/all');

    return (dispatch) => {
        request.then((response) => dispatch({
            type: FETCH_ALL_US_STOCK,
            payload: response.data
        }));
    };
}

export function fetchSingleUSStock(id) {
    return (dispatch) => dispatch({
        type: FETCH_SINGLE_US_STOCK,
        payload: {
            id
        }
    });
}