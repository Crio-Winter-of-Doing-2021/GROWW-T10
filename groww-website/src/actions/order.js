import axios from 'src/utils/axios';

export const FETCH_ALL_ORDER = '@order/fetch-all-order';
export const FETCH_QUERY_ORDER = '@order/fetch-query-order';

export function fetchAllOrder() {
    const request = axios.get('/api/order/all');

    return (dispatch) => {
        request.then((response) => dispatch({
            type: FETCH_ALL_ORDER,
            payload: response.data
        }));
    };
}

export function fetchQueryOrder(type) {
    return (dispatch) => dispatch({
        type: FETCH_QUERY_ORDER,
        payload: {
            type
        }
    });
}