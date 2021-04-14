import {
    ADD_MESSAGE,
    ADD_MESSAGE_COMPONENT,
    CLEAR_MESSAGES,
    SET_ERROR,
    TOGGLE_WEBCHAT,
    UPDATE_LAST_MESSAGE_DATE,
    UPDATE_LAST_ROUTE_PATH,
    UPDATE_LATEST_INPUT,
    UPDATE_REPLIES,
    UPDATE_SESSION
} from '../actions';

export const webchatInitialState = {
    messagesJSON: [],
    messagesComponents: [],
    replies: [],
    latestInput: {},
    session: { user: null },
    lastRoutePath: null,
    error: {},
    isWebchatOpen: false,
    lastMessageUpdate: undefined,
}

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
        case ADD_MESSAGE:
            return addMessageReducer(state, action)
        case ADD_MESSAGE_COMPONENT:
            return {
                ...state,
                messagesComponents: [
                    ...(state.messagesComponents || []),
                    action.payload,
                ],
            }
        case UPDATE_REPLIES:
            return { ...state, replies: action.payload }
        case CLEAR_MESSAGES:
            return {
                ...state,
                messagesJSON: [],
                messagesComponents: [],
            }
        case UPDATE_LAST_MESSAGE_DATE:
            return {
                ...state,
                lastMessageUpdate: action.payload,
            }
        default:
            throw new Error()
    }
}

function addMessageReducer(state, action) {
    if (
        state.messagesJSON &&
        state.messagesJSON.find(m => m.id === action.payload.id)
    )
        return state
    return {
        ...state,
        messagesJSON: [...(state.messagesJSON || []), action.payload],
    }
}

