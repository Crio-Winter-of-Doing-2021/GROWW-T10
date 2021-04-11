import { webchatInitialState } from 'src/hooks/hooks';

export const RequestContext = React.createContext({
  getString: () => '',
  setLocale: () => '',
  params: {},
  input: {},
  defaultDelay: 0,
})

export const WebchatContext = React.createContext({
  sendText: text => { },
  sendPayload: payload => { },
  sendInput: input => { },
  setReplies: replies => { },
  addMessage: message => { },
  updateMessage: message => { },
  updateReplies: replies => { },
  updateLatestInput: input => { },
  toggleWebchat: () => { },
  webchatState: webchatInitialState,
})
