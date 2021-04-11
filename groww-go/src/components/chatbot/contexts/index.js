import React from 'react';
import { webchatInitialState } from '../store/reducers';

export const RequestContext = React.createContext({
    session: {},
    input: {},
    params: {}
})

export const WebchatContext = React.createContext({
    sendText: text => { },
    sendPayload: payload => { },
    sendInput: input => { },
    setReplies: replies => { },
    addMessage: message => { },
    updateReplies: replies => { },
    updateLatestInput: input => { },
    toggleWebchat: () => { },
    webchatState: webchatInitialState,
    updateUser: user => { },
})
