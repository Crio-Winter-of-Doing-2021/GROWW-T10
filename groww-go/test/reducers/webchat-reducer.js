import {
    SET_ERROR,
    TOGGLE_WEBCHAT,
    UPDATE_LAST_ROUTE_PATH,
    UPDATE_LATEST_INPUT,
    UPDATE_SESSION
} from 'src/actions/actions';

import { messagesReducer } from 'src/reducers/messages-reducer'

export function webchatReducer(state, action) {
    switch (action.type) {
        case UPDATE_SESSION:
            return { ...state, session: { ...action.payload } }
        case TOGGLE_WEBCHAT:
            return { ...state, isWebchatOpen: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload || {} }
        case UPDATE_LATEST_INPUT:
            return { ...state, latestInput: action.payload }
        case UPDATE_LAST_ROUTE_PATH:
            return { ...state, lastRoutePath: action.payload }
        default:
            return messagesReducer(state, action)
    }
}