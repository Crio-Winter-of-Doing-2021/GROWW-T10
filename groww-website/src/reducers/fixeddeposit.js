/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
    FETCH_ALL_FIXED_DEPOSIT,
    FETCH_SINGLE_FIXED_DEPOSIT
} from 'src/actions/fixeddeposit';

const initialState = {
    fixed_deposits: [],
    selectFixedDeposit: {}
};

const fixedDepositReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_SINGLE_FIXED_DEPOSIT: {
            const { id } = action.payload;
            const [response] = state.fixed_deposits.filter((e) => e.id === id);
            return produce(state, (draft) => {
                draft.selectFixedDeposit = response;
            });
        }

        case FETCH_ALL_FIXED_DEPOSIT: {
            const { fixed_deposits } = action.payload;
            return produce(state, (draft) => {
                draft.fixed_deposits = fixed_deposits;
            });
        }

        default: {
            return state;
        }
    }
};

export default fixedDepositReducer;
