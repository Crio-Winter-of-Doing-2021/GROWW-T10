import axios from 'src/utils/axios';

export const FETCH_ALL_FIXED_DEPOSIT = '@fixed-deposit/fetch-all-fixed-deposit';
export const FETCH_SINGLE_FIXED_DEPOSIT = '@fixed-deposit/fetch-single-fixed-deposit';

export function fetchAllFixedDeposit() {
    const request = axios.get('/api/fixed_deposit/all');

    return (dispatch) => {
        request.then((response) => dispatch({
            type: FETCH_ALL_FIXED_DEPOSIT,
            payload: response.data
        }));
    };
}

export function fetchSingleFixedDeposit(id) {
    return (dispatch) => dispatch({
        type: FETCH_SINGLE_FIXED_DEPOSIT,
        payload: {
            id
        }
    });
}