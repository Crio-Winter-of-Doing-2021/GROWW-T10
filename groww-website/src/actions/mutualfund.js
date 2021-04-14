import axios from 'src/utils/axios';

export const FETCH_ALL_MUTUAL_FUND = '@mutual-fund/fetch-all-mutual-fund';
export const FETCH_SINGLE_MUTUAL_FUND = '@mutual-fund/fetch-single-mutual-fund';

export function fetchAllMutualFund() {
    const request = axios.get('/api/mutual_fund/all');

    return (dispatch) => {
        request.then((response) => dispatch({
            type: FETCH_ALL_MUTUAL_FUND,
            payload: response.data
        }));
    };
}

export function fetchSingleMutualFund(id) {
    return (dispatch) => dispatch({
        type: FETCH_SINGLE_MUTUAL_FUND,
        payload: {
            id
        }
    });
}