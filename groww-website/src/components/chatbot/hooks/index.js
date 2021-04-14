import React from 'react';
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
} from '../store/actions';
import { webchatInitialState, webchatReducer } from '../store/reducers';

export function useWebChat() {
    const [webchatState, webchatDispatch] = React.useReducer(
        webchatReducer,
        webchatInitialState
    );
    const addMessage = message =>
        webchatDispatch({ type: ADD_MESSAGE, payload: message })
    const addMessageComponent = message =>
        webchatDispatch({ type: ADD_MESSAGE_COMPONENT, payload: message })
    const updateReplies = replies =>
        webchatDispatch({ type: UPDATE_REPLIES, payload: replies })
    const updateLatestInput = input =>
        webchatDispatch({ type: UPDATE_LATEST_INPUT, payload: input })
    const updateSession = session => {
        webchatDispatch({
            type: UPDATE_SESSION,
            payload: session,
        })
    }
    const updateLastRoutePath = path =>
        webchatDispatch({
            type: UPDATE_LAST_ROUTE_PATH,
            payload: path,
        })
    const toggleWebchat = toggle =>
        webchatDispatch({
            type: TOGGLE_WEBCHAT,
            payload: toggle,
        })
    const setError = error =>
        webchatDispatch({
            type: SET_ERROR,
            payload: error,
        })

    const clearMessages = () => {
        webchatDispatch({
            type: CLEAR_MESSAGES,
        })
    }
    const updateLastMessageDate = date => {
        webchatDispatch({
            type: UPDATE_LAST_MESSAGE_DATE,
            payload: date,
        })
    }
    return {
        webchatState,
        webchatDispatch,
        addMessage,
        addMessageComponent,
        updateReplies,
        updateLatestInput,
        updateSession,
        updateLastRoutePath,
        toggleWebchat,
        setError,
        clearMessages,
        updateLastMessageDate,
    }
}

export function usePrevious(value) {
    const ref = React.useRef()
    React.useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export function useComponentVisible(initialIsVisible, onClickOutside) {
    const [isComponentVisible, setIsComponentVisible] = React.useState(initialIsVisible)
    const ref = React.useRef(null)
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
            onClickOutside()
        }
    }
    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, false)
        return () => {
            document.removeEventListener('click', handleClickOutside, false)
        }
    })
    return { ref, isComponentVisible, setIsComponentVisible }
}

export const useComponentWillMount = func => {
    React.useMemo(func, [func])
}