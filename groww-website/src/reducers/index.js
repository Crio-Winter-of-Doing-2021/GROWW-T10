import { combineReducers } from 'redux';
import accountReducer from './account';
import fixedDepositReducer from './fixeddeposit';

const rootReducer = combineReducers({
    account: accountReducer,
    fixedDepost: fixedDepositReducer,
});

export default rootReducer;